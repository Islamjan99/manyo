import { observer } from 'mobx-react-lite'
import React, { useContext, useState, useEffect } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Context } from '../../index'
import avatars from '../../imgContainer/img/userAvatars.jpg'
import style from "./Cabinet.module.css"
import CreateAvatar from './CreateAvatar';
import { HISTORY_ROUTER } from '../../Utils/Consts'
import { useHistory } from 'react-router'

const Cabinet = observer(() => {
    const history = useHistory()
    const { user } = useContext(Context)
    const [ lgShow, setLgShow ] = useState(false);
    const [ check, setCheck ] = useState(false)
    const [ userName, setUserName] = useState(null)
    const [ userImg, setUserImg] = useState(user.users.img)
    const [ email, setEmail] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            checking()
        }, 200);
        ava()
    }, [])

    const log = () => {
        console.log(user.users);
        ava()
    }
    const checking = () => {
        if (localStorage.getItem('token') !== null) {
            setEmail(user.users.email)
            setUserName(user.users.name)
        } 
        if (localStorage.getItem('image') !== null) {
            setUserImg(localStorage.getItem('image'))
        } else {
            localStorage.setItem('image', user.users.img)
        }
        
    }
    const ava = () => { 
        if (localStorage.getItem('image') !== null) {
            setUserImg(localStorage.getItem('image'))
        }
        if (localStorage.getItem('image') !== 'empty') {
            setCheck(true) 
        }
    }
    const restart = () => { 
        document.location.reload()
    }
    const his = () => {
        history.push(HISTORY_ROUTER)
    }
    
    return (
        <Container>
            <div>
                <center><h2>Личный кабинет</h2></center>
                <button onClick={() => log()}>log</button>
                <div className={style.block__avatar} >
                    <Image
                        className={style.avatar}
                        width={300} height={300} 
                        onClick={() => setLgShow(true)}
                        src={check ? process.env.REACT_APP_API_URL + userImg : avatars}
                    />
                </div>
            </div>
            <div>
                <button onClick={() => his()}>История заказов</button>
            </div>
            <CreateAvatar  
                lgShow={lgShow}
                setLgShow={setLgShow}
                userImg={userImg}
                setUserImg={setUserImg}
                restart={restart}
                ava={ava}
            />  
        </Container>
    )
})


export default Cabinet

