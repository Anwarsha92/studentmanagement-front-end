import React, {useContext, useEffect, useState } from 'react'
import {Alert, Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select'
import LoadingSpinner from '../Components/LoadingSpinner'
import '../App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { studRegister, updateUser, viewProfile } from "../services/allApis";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from '../services/base_url'
import { updateContext } from '../Components/ContextShare'

function Edit() {

  //update context
  const {updateData, setUpdateData}=useContext(updateContext)

  //to get params from url
  const {id}=useParams()
  // console.log(id);

// state to hold existing img
const [existingImg,setExistingImg]=useState("")


  //get details of given id from server
  const getProfile=async()=>{
    const {data}=await viewProfile(id)
    console.log(data);
    setUserdata(data)
    setDepartment(data.department)
    setExistingImg(data.profile)
  }

  //error message
  const[errorMsg,setErrorMsg]=useState("")
  const navigate=useNavigate()
  const [showSpinner, setShowspinner] = useState(true);

  const options = [
    { value: "Civil", label: "Civil" },
    { value: "Mechanical", label: "Mechanical" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Electrical", label: "Electrical" },
    { value: "Electronics", label: "Electronics" }
  ];

  //create states for user inputs
  const [userdata, setUserdata] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const userDetails = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };
  // console.log(userdata);

  //state for department
  const [department, setDepartment] = useState("");

  const updateDepartment = (e) => {
    setDepartment(e.value);
  };
  // console.log(status);

  //state for image
  const [image, setImage] = useState("");

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  // console.log(image);

  //state to hold profile picture
  const [priview, setPreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = userdata;

    if (fname === "") {
      toast.error("Fname required");
    } else if (lname === "") {
      toast.error("lname required");
    } else if (email === "") {
      toast.error("email required");
    } else if (mobile === "") {
      toast.error("mobile required");
    } else if (gender === "") {
      toast.error("gender required");
    } else if (image === "") {
      toast.error("image required");
    } else if (location === "") {
      toast.error("location required");
    } else {
      //header
      const headerConfig = {
        "Content-Type": "multipart/form-data",
      };

      //body - Formdata, create object for Formdata
      const data = new FormData();
      data.append("user_profile", image);
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("department", department);
      data.append("location", location);
      const response = await updateUser(id,data, headerConfig);
      if (response.status === 200) {

        //share response data to other components via context
        setUpdateData(response.data)
        navigate('/')
      }
      else if(response.response.status===406){
        setErrorMsg(response.response.data)
        window.scrollTo(0, 0)

      }
      else{
        setErrorMsg(response.code)  
        window.scrollTo(0, 0)
      }
    }
  };

useEffect(()=>{
  getProfile()
},[id])

  useEffect(() => {
    if (image) {
      // image choose image file
      setPreview(URL.createObjectURL(image));
    }

    setTimeout(() => {
      setShowspinner(false);
    }, 1500);
  }, [image]);
  return (
    <div>
      {
        errorMsg?<Alert className="text-center mt-2 w-50 container" variant="danger" onClose={()=>setErrorMsg("")} dismissible>{errorMsg}</Alert>:""
      }
      <div className="container mt-5">
        <h2 className="text-center mt-3">Edit Student</h2>
        {showSpinner ? (
          <LoadingSpinner />
        ) : (
          <Card className="shadow mt-3 p-3">
            <div className="text-center mb-3">
              <img
                className="border rounded-circle p-1"
                style={{ width: "70px" }}
                src={
                  priview ? priview : `${BASE_URL}/uploads/${existingImg}`
                }
                alt="Profile"
              />
            </div>

            <div>
              <Form>
                <Row>
                  <Form.Group className="col-lg-6 mb-4">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      name="fname"
                      value={userdata.fname}
                      onChange={userDetails}
                    />
                  </Form.Group>

                  <Form.Group className="col-lg-6 mb-4">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      name="lname"
                      value={userdata.lname}
                      onChange={userDetails}
                    />
                  </Form.Group>

                  <Form.Group className="col-lg-6 mb-4">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="E-mail"
                      name="email"
                      value={userdata.email}
                      onChange={userDetails}
                    />
                  </Form.Group>

                  <Form.Group className="col-lg-6 mb-4">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Mobile"
                      name="mobile"
                      value={userdata.mobile}
                      onChange={userDetails}
                    />
                  </Form.Group>

                  <Form.Group className="col-lg-6 mb-4">
                    <Form.Label>Gender</Form.Label>
                    <Form.Check
                      type={"radio"}
                      label={"Male"}
                      name="gender"
                      value={"Male"}
                      checked={userdata.gender==="Male"?true:false}
                      onChange={userDetails}
                    />

                    <Form.Check
                      type={"radio"}
                      label={"Female"}
                      name="gender"
                      value={"Female"}
                      checked={userdata.gender==="Female"?true:false}
                      onChange={userDetails}
                    />
                  </Form.Group>

                  <Form.Group className="col-lg-6 mb-4">
                    <Form.Label>Department</Form.Label>
                    <Select
                      options={options}
                      defaultInputValue={department}
                      onChange={updateDepartment}
                    />
                  </Form.Group>

                  <Form.Group className="col-lg-6 mb-4">
                    <Form.Label>Choose Profile Picture</Form.Label>
                    <Form.Control
                      required
                      type="file"
                      name="user_profile"
                      onChange={setProfile}
                    />
                  </Form.Group>

                  <Form.Group className="col-lg-6 mb-4">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Location"
                      name="location"
                      value={userdata.location}
                      onChange={userDetails}
                    />
                  </Form.Group>
                  <Button
                    onClick={handleSubmit}
                    className="btn btn-success mt-4"
                  >
                    Update
                  </Button>
                </Row>
              </Form>
            </div>
          </Card>
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Edit