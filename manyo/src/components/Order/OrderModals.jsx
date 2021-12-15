import React from 'react'
import { Modal} from "react-bootstrap";

export default function OrderModals({ smShow, setSmShow, }) {    
  const good = `Ваш заказа оформлен! менеджер согласует с вами заказ в течение суток!`
  
  const rest = () => {
    setSmShow(false)
    document.location.reload()
  }



    return (
        <>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => rest()}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Заказ
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    {good}
                </Modal.Body>
            </Modal>
        </>
    )
}
