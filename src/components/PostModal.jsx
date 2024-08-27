import "../css/AddPost.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { PostModalSchema } from "./PostModalSchema";
import { toast } from "react-toastify";
import { useContext } from "react";
import Context from "../context/context";

function PostModal(props) {
  const { postCard, setPostCard} = useContext(Context);
  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      company: "",
      category: "",
      position: "",
      location: "",
      salary: "",
      workExperience: "",
      deadline: "",
      jobTime: "",
      requirement: "",
      jobInformation: "",
    },
    validationSchema: PostModalSchema,
    onSubmit: async (values, actions) => {
      try {
        const checkData = await axios.get(
          "http://localhost:3000/advertisement"
        );
        const getData = checkData.data;
        const sameVacancy = getData.find(
          (vacancy) =>
            vacancy.company == values.company &&
            vacancy.position == values.position
        );
        if (sameVacancy) {
          toast.error("Şirkət adından bu vakansiya artıq paylaşılıb");
          return;
        } else {
          const user = JSON.parse(localStorage.getItem("user"));
          const newAd = {...values, userId : user.id}

          const response = await axios.post(
            "http://localhost:3000/advertisement",
            newAd
          );

          toast.success("Əlavə olundu!");
          // setPostCard((prevAds) => [response.data, ...prevAds]);
          actions.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

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
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="company">Şirkət:</Form.Label>
            <Form.Control
              id="company"
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

          <Form.Group>
            <Form.Label htmlFor="category">Kateqoriya:</Form.Label>
            <Form.Control
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              type="text"
              placeholder="Məsələn: IT, Satış"
            />
            {errors.category && (
              <div className="error-message">{errors.category}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="position">Vəzifə :</Form.Label>
            <Form.Control
              id="position"
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

          <Form.Group>
            <Form.Label htmlFor="location">Şəhər:</Form.Label>
            <Form.Control
              id="location"
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

          <Form.Group>
            <Form.Label htmlFor="jobTime">İş vaxtı:</Form.Label>
            <Form.Control
              id="jobTime"
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

          <Form.Group>
            <Form.Label htmlFor="salary">Əmək haqqı:</Form.Label>
            <Form.Control
              id="salary"
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

          <Form.Group>
            <Form.Label htmlFor="deadline">Son tarix:</Form.Label>
            <Form.Control
              id="deadline"
              name="deadline"
              value={values.deadline}
              onChange={handleChange}
              type="text"
              placeholder="Məsələn: 25.09.2024"
            />
            {errors.deadline && (
              <div className="error-message">{errors.deadline}</div>
            )}
            {values.deadline && (
              <div className="formatted-date">
                <strong>Selected Date:</strong> {formatDate(values.deadline)}
              </div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="workExperience">İş təcrübəsi:</Form.Label>
            <Form.Control
              id="workExperience"
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

          <Form.Group>
            <Form.Label htmlFor="requirement">Namizəd tələbləri:</Form.Label>
            <Form.Control
              id="requirement"
              name="requirement"
              value={values.requirement}
              onChange={handleChange}
              as="textarea"
              rows="10"
              cols="50"
              placeholder="Namizədə olan tələbləri daxil edin"
            />
            {errors.requirement && (
              <div className="error-message">{errors.requirement}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="jobInformation">
              İş haqqında məlumat:
            </Form.Label>
            <Form.Control
              id="jobInformation"
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
        <form onSubmit={handleSubmit}>
          <Button variant="secondary" onClick={props.onHide}>
            Bağla
          </Button>
          <Button type="submit" variant="primary">
            Elan yerləşdir
          </Button>
        </form>
      </Modal.Footer>
    </Modal>
  );
}

export default PostModal;
