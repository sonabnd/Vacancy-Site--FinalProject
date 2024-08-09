import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function PostModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Elan yerləşdir
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategory">
            <Form.Label>Kateqoriya</Form.Label>
            <Form.Control type="text" placeholder="Məsələn: IT, Satış" />
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
            <Form.Control type="text" placeholder="Məsələn: Bakı" />
          </Form.Group>

          <Form.Group controlId="formSalary">
            <Form.Label>Əmək haqqı</Form.Label>
            <Form.Control type="text" placeholder="Məsələn: 1000 AZN" />
          </Form.Group>

          <Form.Group controlId="formAgeRange">
            <Form.Label>Yaş aralığı</Form.Label>
            <Form.Control type="text" placeholder="Məsələn: 25-35" />
          </Form.Group>

          <Form.Group controlId="formEducation">
            <Form.Label>Təhsil</Form.Label>
            <Form.Control type="text" placeholder="Məsələn: Ali təhsil" />
          </Form.Group>

          <Form.Group controlId="formWorkExperience">
            <Form.Label>İş təcrübəsi</Form.Label>
            <Form.Control type="text" placeholder="Məsələn: 3 il" />
          </Form.Group>

          <Form.Group controlId="formCandidateRequirements">
            <Form.Label>Namizəd tələbləri</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Namizədə olan tələbləri daxil edin"
            />
          </Form.Group>

          <Form.Group controlId="formJobInformation">
            <Form.Label>İş haqqında məlumat</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="İş haqqında məlumat daxil edin"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Bağla
        </Button>
        <Button variant="primary" onClick={props.onHide}>
          Elan yerləşdir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostModal;
