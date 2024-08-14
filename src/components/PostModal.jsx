import '../css/AddPost.css'
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { PostModalSchema } from "./PostModalSchema";

function PostModal(props) {

  function test() {
    console.log("btn kliklendi");
  }

  const {values, handleChange, errors, handleSubmit} = useFormik({
    initialValues:{
      company : "",
      category : "",
      position : "",
      location : "",
      salary : "",
      workExperience :"",
      deadline : "",
      jobTime : "",
      requirement : "",
      jobInformation : ""
    },

    validationSchema: PostModalSchema,

    onSubmit : async (values, actions) =>{
      
      try{
        const checkData = await axios.get('http://localhost:3001/advertisement')
        const getData=checkData.data;
        console.log(getData);
        const sameVacancy= getData.find(vacancy=> vacancy.company == values.company && vacancy.position == values.position);

        if(sameVacancy){
          alert("Şirkət adından bu vakansiya artıq paylaşılıb");
          return;
        }

        const response = await axios.post('http://localhost:3001/advertisement', values);
        console.log(response.data); 
        actions.resetForm();
      }
      catch(error){
        console.log(error);
      }
    }

  })

  return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Elan yerləşdir
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit = {handleSubmit}>
            <Form.Group controlId="formCompany">
              <Form.Label>Şirkət:</Form.Label>
              <Form.Control
                name="company"
                value={values.company}
                onChange={handleChange}
                type="text"
                placeholder="Məsələn: Agile Solutions"
              />
              {errors.company && (
              <div className="error-message">{errors.company}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Kateqoriya:</Form.Label>
              <Form.Control
                name="category"
                value={values.category}
                onChange={handleChange}
                type="text"
                placeholder="Məsələn: IT, Satış"
              />
              {errors.category&& (
              <div className="error-message">{errors.category}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formPosition">
              <Form.Label>Vəzifə :</Form.Label>
              <Form.Control
                name="position"
                value={values.position}
                onChange={handleChange}
                type="text"
                placeholder="Məsələn: Software Engineer"
              />
              {errors.position && (
              <div className="error-message">{errors.position}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>Şəhər:</Form.Label>
              <Form.Control
                name="location"
                value={values.location}
                onChange={handleChange}
                type="text"
                placeholder="Məsələn: Bakı"
              />
              {errors.location && (
              <div className="error-message">{errors.location}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formJobTime">
              <Form.Label>Job :</Form.Label>
              <Form.Control
                name="jobTime"
                value={values.jobTime}
                onChange={handleChange}
                type="text"
                placeholder="Məsələn: full time"
              />
              {errors.jobTime && (
              <div className="error-message">{errors.jobTime}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formSalary">
              <Form.Label>Əmək haqqı:</Form.Label>
              <Form.Control
                name="salary"
                value={values.salary}
                onChange={handleChange}
                type="text"
                placeholder="Məsələn: 1000 AZN"
              />
              {errors.salary && (
              <div className="error-message">{errors.salary}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formDeadline">
              <Form.Label>Son tarix:</Form.Label>
              <Form.Control
                name="deadline"
                value={values.deadline}
                onChange={handleChange}
                type="text"
                placeholder="Məsələn: 25.09.2024"
              />
              {errors.deadline && (
              <div className="error-message">{errors.deadline}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formWorkExperience">
              <Form.Label>İş təcrübəsi:</Form.Label>
              <Form.Control
                name="workExperience"
                value={values.workExperience}
                onChange={handleChange}
                type="text"
                placeholder="Məsələn: 3 il"
              />
              {errors.workExperience && (
              <div className="error-message">{errors.workExperience}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formCandidateRequirements">
              <Form.Label>Namizəd tələbləri:</Form.Label>
              <Form.Control
                name="requirement"
                value={values.requirement}
                onChange={handleChange}
                as="textarea"
                rows={3}
                placeholder="Namizədə olan tələbləri daxil edin"
              />
              {errors.requirement && (
              <div className="error-message">{errors.requirement}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formJobInformation">
              <Form.Label>İş haqqında məlumat:</Form.Label>
              <Form.Control
                name="jobInformation"
                value={values.jobInformation}
                onChange={handleChange}
                as="textarea"
                rows={5}
                placeholder="İş haqqında məlumat daxil edin"
              />
              {errors.jobInformation && (
              <div className="error-message">{errors.jobInformation}</div>
              )}
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Bağla
          </Button>
          <Button type="submit" variant="primary" onClick={test}>
            Elan yerləşdir
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default PostModal;
