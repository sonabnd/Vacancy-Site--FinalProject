import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import axios from "axios";

function UpdatePost(props) {
  const { updateVacancy, editInputVal, setEditInputVal, setPostCard } = useContext(Context);

  useEffect(() => {
    if (updateVacancy) {
      setEditInputVal(updateVacancy);
    }
  }, [updateVacancy, setEditInputVal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInputVal((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (editInputVal && editInputVal.id) {
        const response = await axios.put(
          `http://localhost:3000/advertisement/${editInputVal.id}`,
          editInputVal
        );
        if (response.status === 200) {
          setPostCard((prevPosts) =>
            prevPosts.map((post) =>
              post.id === editInputVal.id ? editInputVal : post
            )
          );
          props.onHide(); 
        }
      }
    } catch (error) {
      console.error("Failed to update the post:", error);
    }
  };

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
          <Form.Group controlId="formCompany">
            <Form.Label>Şirkət</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={editInputVal?.company || ""}
              onChange={handleChange}
              name="company"
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Kateqoriya</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={editInputVal?.category || ""}
              onChange={handleChange}
              name="category"
            />
          </Form.Group>

          <Form.Group controlId="formPosition">
            <Form.Label>Vəzifə</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={editInputVal?.position || ""}
              onChange={handleChange}
              name="position"
            />
          </Form.Group>

          <Form.Group controlId="formCity">
            <Form.Label>Şəhər</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={editInputVal?.location || ""}
              onChange={handleChange}
              name="location"
            />
          </Form.Group>

          <Form.Group controlId="formJobTime">
            <Form.Label>İş vaxtı</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={editInputVal?.jobTime || ""}
              onChange={handleChange}
              name="jobTime"
            />
          </Form.Group>

          <Form.Group controlId="formSalary">
            <Form.Label>Əmək haqqı</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={editInputVal?.salary || ""}
              onChange={handleChange}
              name="salary"
            />
          </Form.Group>

          <Form.Group controlId="formDeadline">
            <Form.Label>Son tarix</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={editInputVal?.deadline || ""}
              onChange={handleChange}
              name="deadline"
            />
          </Form.Group>

          <Form.Group controlId="formCandidateRequirements">
            <Form.Label>Namizədə tələbləri</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder=""
              value={editInputVal?.requirement || ""}
              onChange={handleChange}
              name="requirement"
            />
          </Form.Group>

          <Form.Group controlId="formJobInformation">
            <Form.Label>İş haqqında məlumat</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder=""
              value={editInputVal?.jobInformation || ""}
              onChange={handleChange}
              name="jobInformation"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Bağla
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Redaktə et
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdatePost;
