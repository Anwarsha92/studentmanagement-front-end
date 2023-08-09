import React from "react";
import { Card, Row, Table, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/base_url";

function HomeTable({ allstudents,deleteUser}) {
  return (
    <div>
      <div className="container mt-2">
        <Row>
          <div className="col">
            <Card className="shadow">
              <Table className="align-items-center" responsive>
                <thead>
                  <tr className="table-dark">
                    <th>No</th>
                    <th>Full Name</th>
                    <th>E-mail</th>
                    <th>Mobile</th>
                    <th>Department</th>
                    <th>Profile</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allstudents?.length>0? allstudents.map((students, index) => (
                    <tr key={students._id} style={{verticalAlign:"middle"}}>
                      <td>{index + 1}</td>
                      <td>{students.fname}</td>
                      <td>{students.email}</td>
                      <td>{students.mobile}</td>
                      <td>
                        {/* <Dropdown> */}
                          <Button variant={"primary"} id="dropdown-status">
                            {students.department}
                          </Button>
                        {/* </Dropdown> */}
                      </td>
                      <td>
                        <img
                        className="rounded-circle"
                          style={{ width: "40px"}}
                          src={`${BASE_URL}/uploads/${students.profile}`}
                          alt="Profile"
                        />
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="info" id="dropdown-action">
                            Select
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Link
                                to={`/profile/${students._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <i className="las la-user-tie"></i>
                                <span className="fs-6 ms-2">View</span>
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link
                                to={`/edit/${students._id}`}
                                style={{ textDecoration: "none" }}
                                className="text-success"
                              >
                                <i className="las la-user-edit"></i>
                                <span className="fs-6 ms-2">Edit</span>
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={()=>deleteUser(students._id)}>
                              <i className="las la-user-minus text-danger"></i>
                              <span className="fs-6 ms-2 text-danger">
                                Delete
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  )):
                  <p  className="text-danger text-end w-100">Nothing to display</p>
                  }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default HomeTable;
