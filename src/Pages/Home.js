import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import HomeTable from "../Components/HomeTable";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import { deleteContext, registerContext, updateContext } from "../Components/ContextShare";
import { getStudents, removeUser } from "../services/allApis";
import "../App.css";

function Home() {

  //  get updateContext using useContext
     const { updateData, setUpdateData } = useContext(updateContext);

  //get deleteContext using useContext
  // const { deleteData, setDeleteData } = useContext(deleteContext);

  const [deleteData, setDeleteData] = useState("");

  //state to hold search data
  const [searchKey, setSearchKey] = useState("");

  console.log(searchKey);

  //state to holds all students
  const [allstudents, setAllstudents] = useState([]);

  //define functon to call get all students api
  const getStudentsDetails = async () => {
    const response = await getStudents(searchKey);
    // console.log(response);
    setAllstudents(response.data);
  };

  // console.log(allstudents);
  //get register context using useContext
  const { registerData, setRegisterData } = useContext(registerContext);

  const [showSpinner, setShowspinner] = useState(true);

  const navigate = useNavigate();

  const addNewStudent = () => {
    navigate("/register");
  };

  const deleteUser = async (id) => {
    console.log("inside delete function" + id);
    const response = await removeUser(id);

    if (response.status === 200) {
      //pass response data to context
      setDeleteData(response.data);
      getStudentsDetails();
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getStudentsDetails();
    setTimeout(() => {
      setShowspinner(false);
    }, 1000);
  }, [searchKey]);
  return (
    <>
    {updateData ? (
        <Alert
          className="text-center mt-2 w-50 container"
          variant="success"
          onClose={() => setUpdateData("")}
          dismissible
        >
          {updateData.fname.toUpperCase()} Successfully Updated
        </Alert>
      ) : (
        ""
      )}
      {registerData ? (
        <Alert
          className="text-center mt-2 w-50 container"
          variant="success"
          onClose={() => setRegisterData("")}
          dismissible
        >
          {registerData.fname.toUpperCase()} Successfully Registered
        </Alert>
      ) : (
        ""
      )}
      {deleteData ? (
        <Alert
          className="text-center mt-2 w-50 container"
          variant="success"
          onClose={() => setDeleteData("")}
          dismissible
        >
          Successfully Deleted {deleteData.fname.toUpperCase()} 
        </Alert>
      ) : (
        ""
      )}
      <div className="container mt-5 pt-5">
        <div className="first-div">
          <div className="search_add d-flex flex-wrap justify-content-between gap-4">
            <div className="search">
              <Form className="d-flex gap-3 flex-wrap">
                <Form.Control
                  style={{ width: "300px" }}
                  required
                  id="search"
                  value={searchKey}
                  type="text"
                  placeholder="Search Student"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <Button variant="danger" onClick={() => setSearchKey("")}>
                  X
                </Button>
              </Form>
            </div>
            <div className="add">
              <button onClick={addNewStudent} className="btn btn-success">
                {" "}
                <i className="fa-solid fa-user-plus fa-fade me-2"></i> Add
              </button>
            </div>
          </div>
        </div>
        <div className="sec_div mt-3 mb-3 text-center">
          {showSpinner ? (
            <LoadingSpinner />
          ) : (
            <>
              <h2>Students List</h2>
              <HomeTable allstudents={allstudents} deleteUser={deleteUser} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
