import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Context from "../context/context";
import axios from "axios";

function DeletePost(props) {
    const {deleteVacancy} = useContext(Context);

    const deletePostFunc= async (id)=>{
        try{
            const response= await axios.delete(`http://localhost:3000/advertisement/${id}`)
            console.log('Resource deleted:', response.data);
            props.onHide();
            window.location.reload();
        }
        catch (error) {
            console.error('Error deleting the resource:', error);
        }
    }

    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Sil
                </Modal.Title>
            </Modal.Header>
                {
                    <div key={deleteVacancy.id}>
                        <Modal.Body>
                            <h4>{deleteVacancy.company}</h4>
                            <p>
                                {deleteVacancy.position} vakansiyasını silmək istədiyinizə əminsiz?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.onHide}>Bağla</Button>
                            <Button onClick={() => deletePostFunc(deleteVacancy.id)}  >Bəli</Button>
                        </Modal.Footer>
                    </div>
                }
        </Modal>
    );
}

export default DeletePost;