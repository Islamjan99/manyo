import React from 'react'
import { Modal} from "react-bootstrap";

export default function CabinetModals({ yes, setYes }) {   
    const good = 'Операция прошла успешно!'

    const close = () => {
        setYes(false)
        document.location.reload()
    }

    return (
        <>
            <Modal
                size="sm"
                show={yes}
                onHide={() => close()}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Оповещение
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    {good}
                </Modal.Body>
            </Modal>
            </>
    )
}
