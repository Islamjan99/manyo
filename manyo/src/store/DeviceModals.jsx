import React from 'react'
import { Modal} from "react-bootstrap";

export default function DeviceModals({ smShow, setSmShow, addGood }) {    
  const good = 'Продукт добавлен в корзину!'
  const notGood = 'Продукт уже добавлен в корзину!'

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
                    Корзина
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body> 
                    { addGood ? good : notGood }
                  </Modal.Body>
                </Modal>
              </>
    )
}
