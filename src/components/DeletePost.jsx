import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeletePost(props) {
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
        <Modal.Body>
            <h4>Software Engineer</h4>
            <p>
            Software Engineer vakansiyasını silmək istədiyinizə əminsiz?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Bağla</Button>
            <Button onClick={props.onHide} >Bəli</Button>
        </Modal.Footer>
        </Modal>
  );
}

export default DeletePost;
