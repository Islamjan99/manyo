import React, { useContext, useEffect, useState } from 'react'
import { Modal} from "react-bootstrap";
import { Context } from '../..';
import CabinetAgreement from './CabinetAgreement';
import style from "./Cabinet.module.css"
import CabinetModals from './CabinetModals';
import { addImg, deleteImg } from '../../Http/UserAPI';

export default function CreateAvatar({ lgShow, setLgShow, userImg, setUserImg, restart, ava }) {   
    const { user } = useContext(Context) 
    const [smShow, setSmShow] = useState(false);
    const [ addGood, setAddGood ] = useState(false)
    const [file, setFile] = useState(null)
    const [ userName, setUserName] = useState(null)
    const [ email, setEmail] = useState(null)
    const [ check, setCheck] = useState(false)
    const [ yes, setYes ] = useState(false)

    useEffect(() => {
        setUserName(user.users.name)
        setEmail(user.users.email)

        if (localStorage.getItem('image') !== null) {
            setUserImg(localStorage.getItem('image'))
        } else {
            setUserImg('empty')
            setCheck(false)
        }
        if (localStorage.getItem('image') !== 'empty') {
            setCheck(true)
        }
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const createImg = () => {
        if (localStorage.getItem('image') !== 'empty') {
            rewritingImg()
        }
        const formData = new FormData()
        formData.append('img', file)
        formData.append('email', email)
        addImg(formData)
        setAddGood(true)
        modalPanel()
        close()
    }

    const modalPanel = () => {
        setTimeout(() => {
            setYes(true)
        }, 200);
    }
    const agreement = () => {
        setTimeout(() => {
            setSmShow(true)
        }, 200);
    }
    const removeImg = () => {
        agreement()
    }
    const close = () => {
        setLgShow(false)
        setFile(null)
        // setTimeout(() => {
        //     restart()
        // }, 1000);
        setTimeout(() => {
            ava()
        }, 100);
    }

    const rewritingImg = () => {
        const formData = new FormData()
        formData.append('imgName', userImg)
        formData.append('email', email)
        deleteImg (formData)
        setYes(false)
        setSmShow(false)
        modalPanel() 
        delete localStorage.image;
        
      }

    return (
        <>
            <CabinetAgreement
                smShow={smShow}
                setSmShow={setSmShow}
                userImg={userImg}
                setUserImg={setUserImg}
                restart={restart}
            />
            <CabinetModals
                yes={yes}
                setYes={setYes}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => close()}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Фотография профиля
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <div className={style.container}>
                        <div className={style.block__create}> 
                            <span>
                                Добавить фотографию
                            </span>
                            <input 
                                className={style.img__inp}
                                type="file"
                                onChange={selectFile}
                            />
                            { 
                                file !== null ?
                                <button className={style.createImg__btn}
                                    onClick={() => createImg()}
                                >Добавить фотографию</button>
                                : ''
                            }
                        </div>
                        {
                            check
                            ? 
                                <div className={style.block__img}>
                                    <span className={style.remove__info}>
                                    удалить фотографию
                                    </span>
                                <button className={style.remove__btn} onClick={() => removeImg()}>
                                    Удалить
                                </button>
                                </div>
                            : ''
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
