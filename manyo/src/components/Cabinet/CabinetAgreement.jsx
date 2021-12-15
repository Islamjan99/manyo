import React, { useContext, useEffect, useState } from 'react'
import { Modal} from "react-bootstrap";
import { Context } from '../..';
import { deleteImg } from '../../Http/UserAPI';
import CabinetModals from './CabinetModals';
import style from "./Cabinet.module.css"

export default function CabinetAgreement({ smShow, setSmShow, restart }) {   
  const { user } = useContext(Context)
  const [ yes, setYes ] = useState(false)
  const [ userName, setUserName] = useState(null)
  const [ userImg, setUserImg] = useState(null)
  const [ email, setEmail] = useState(null)

  useEffect(() => {
    setUserName(user.users.name)
    setUserImg(localStorage.getItem('image'))
    setEmail(user.users.email)
    
  }, [])

  const removeImg = () => {
    const formData = new FormData()
    formData.append('imgName', userImg)
    formData.append('email', email)
    deleteImg (formData)
    setYes(false)
    setSmShow(false)
    modalPanel() 
    delete localStorage.image;
    
  }
  const modalPanel = () => {
    setTimeout(() => {
      setYes(true)
    }, 200);
  } 

  const click = async () => {

  }

    return (
      <>
        <CabinetModals
            yes={yes}
            setYes={setYes}
        />
        <Modal
          size="sm"
          show={smShow}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              подтверждение
            </Modal.Title>
          </Modal.Header>
          <Modal.Body> 
              <div>
               {`${userName} вы действительно хотите удалить фотографию?`}
              </div>
              <div className={style.block__btn}>
                <button className={style.btn} onClick={() => removeImg()}>Удалить</button>
                <button className={style.btn} onClick={() => setSmShow(false)}>Закрыть</button>
              </div>
          </Modal.Body>
        </Modal>
      </>
    )
}
