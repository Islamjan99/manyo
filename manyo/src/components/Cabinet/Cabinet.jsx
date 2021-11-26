import { observer } from 'mobx-react-lite'
import React, { useContext, useState, useEffect } from 'react'
import { Container, Image } from 'react-bootstrap'
import { addImg, authuser } from '../../Http/UserAPI'
import { Context } from '../../index'
import avatars from '../../imgContainer/img/userAvatars.jpg'
import style from "./Cabinet.module.css"
import CabinetModals from './History/CabinetModals'

const Cabinet = observer(() => {
    const { user } = useContext(Context)
    const [ smShow, setSmShow] = useState(false);
    const [ addGood, setAddGood ] = useState(false)
    const [ check, setCheck ] = useState(false)
    const [ userName, setUserName] = useState(null)
    const [ userImg, setUserImg] = useState(null)
    const [ email, setEmail] = useState(null)

    const [file, setFile] = useState(null)
    


    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            checking()
            setUserName(user.userId.name)
            setUserImg(user.userId.img)
            setEmail(user.userId.email)
        }
    }, [user])

    const log = () => {
        console.log(email);
    }
    const checking = () => {
        user.userId.img !== null ? setCheck(true) : setCheck(false)
    }
    const createImg = () => {
        try {
            // const formData = new FormData()
            // formData.append('img', file)
            // formData.append('email', email)
            // addImg(formData)
            setAddGood(true)
            modalPanel()
        } catch {
            setAddGood(false)
            modalPanel()
        }
        
        

    }
    const modalPanel = () => {
        setTimeout(() => {
            setSmShow(true)
        }, 200);
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    return (
        <Container>
            <CabinetModals
                smShow={smShow}
                setSmShow={setSmShow}
                addGood={addGood}
            />
            <center><h2>Личный кабинет</h2></center>
            <button onClick={() => user.getUsersId()}>log</button>
            <button onClick={() => log()}>log2</button>
            <div>
                <Image
                    className={style.item_img} 
                    style={{cursor: "pointer"}}
                    width={250} height={250} 
                    src={check ? process.env.REACT_APP_API_URL + userImg : avatars}
                />
                <input 
                    className={style.add__img}
                    type="file"
                    onChange={selectFile}
                 />
                 <button onClick={() => createImg()}>createImg</button>
            </div>
        </Container>
    )
})


export default Cabinet

