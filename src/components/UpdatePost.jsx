import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function UpdatePost(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Redaktə et</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategory">
            <Form.Label>Kateqoriya</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formPosition">
            <Form.Label>Vəzifə</Form.Label>
            <Form.Control
              type="text"
              placeholder="Məsələn: Software Engineer"
            />
          </Form.Group>

          <Form.Group controlId="formCity">
            <Form.Label>Şəhər</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formSalary">
            <Form.Label>Əmək haqqı</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formAgeRange">
            <Form.Label>Yaş aralığı</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formEducation">
            <Form.Label>Təhsil</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formWorkExperience">
            <Form.Label>İş təcrübəsi</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formCandidateRequirements">
            <Form.Label>Namizədə tələbləri</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="" />
          </Form.Group>

          <Form.Group controlId="formJobInformation">
            <Form.Label>İş haqqında məlumat</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Bağla
        </Button>
        <Button variant="primary" onClick={props.onHide}>
          Redaktə et
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdatePost;
