import React from 'react'
import { Modal} from "react-bootstrap";

export default function CabinetModals({ smShow, setSmShow, addGood }) {    
  const good = 'Операция прошла успешно!'
  const notGood = 'Что-то пошло не так пожалуйста попробуйте ещё раз! /n Если проблема повторится обратитесь в тех поддержку'

            return (
              <>
                <Modal
                  size="sm"
                  show={smShow}
                  onHide={() => setSmShow(false)}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                     Личный кабинет
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body> 
                    { addGood ? good : notGood }
                  </Modal.Body>
                </Modal>
              </>
    )
}
