const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path');
const {User, Basket} = require('../models/models');
const fs = require("fs");

const generateJwt = ( id, email, role, phone, name, lastName, img, percent ) => {
    return jwt.sign(
        { id, email, role, phone, name, lastName, img, percent },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role, phone, name, lastName, img, percent} = req.body
        if ( !email || !password || !phone || !name || !lastName) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, lastName, email, role: 'USER', phone, img: 'empty', percent, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role, user.phone, user.name,  user.lastName, user.img, user.percent )
        return res.json({token, user})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.phone, user.name,  user.lastName, user.img, user.percent)
        return res.json({token, user})
    }
    async addImg(req, res, next) {
        try {
            const {email} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'avatar', fileName))
            const personaImg = await User.update(
                {
                    img: fileName,
                },
                {
                    where: {
                        email: email,
                    },
                }
                )
                const user = await User.findOne(
                    {
                        where: {
                            email: email,
                        },
                    },
                )
            return res.json(fileName)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }
    async deleteImg(req, res, next) {
        try {
            const {email} = req.body
            const {imgName} = req.body
            fs.unlink(`avatar/${imgName}`, function(err) {
                if (err) {
                    return console.error(err);
                }
             });
            let fileName = 'empty'
            const removeImg = await User.update(
                {
                    img: fileName,
                },
                {
                    where: {
                        email: email,
                },
                }
            )

            return res.json(fileName)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async percent(req, res) {
        const {percent} = req.body
        const perc = await User.create({percent})
        return res.json(perc)
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async authuser(req, res, next) {
        try {
            const {id} = req.params
            const user = await User.findOne(
                {
                    where: {id},
                },
            )
        return res.json(user)
        } catch {
            return next(ApiError.badRequest(e.message))
        }       
    }
}

module.exports = new UserController()
