import React, { useEffect, useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import LoadingSpinner from '../Components/LoadingSpinner';
import { Link, useParams } from 'react-router-dom';
import { viewProfile } from '../services/allApis';
import { BASE_URL } from '../services/base_url';

function Profile() {

  const[userData,setUserdata]=useState({})

  const {id}=useParams()
  console.log(id);
  const [showSpinner,setShowspinner]=useState(true)

//define function  to view profile

const getProfile=async()=>{
const {data}=await viewProfile(id)
console.log(data);
setUserdata(data)
}

console.log(userData);
  useEffect(()=>{
    getProfile()
    setTimeout(() => {
      setShowspinner(false)
    }, 1500);
  },[])
  return (
    <div>


        {
          showSpinner?(
            <LoadingSpinner/>
          ):(
            <div className='container mt-5'>

            <Card className='shadow col-lg-6 mx-auto'>
            <Card.Body className='p-0 pt-4'>
              <Row>
                <div className="col">
                  <div className='profile_img d-flex justify-content-center'>
                  <img className='border rounded-circle p-1' style={{ width: '150px' }} src={`${BASE_URL}/uploads/${userData.profile}`} alt="Profile" />
                  </div>
                </div>
              </Row>
             <div className="text-center mt-3">
              <h3>{userData.fname.toUpperCase()}</h3>
              <h4 className='text-primary'><i className="las la-school text-primary"></i>: {userData.department.toUpperCase()}</h4>
              <h5><i className="las la-envelope text-info"></i>: {userData.email}</h5>
              <h5><i className="las la-mobile text-danger"></i>: {userData.mobile}</h5>
              <h5><i className="las la-mercury text-warning"></i>: {userData.gender}</h5>
              <h5><i className="las la-map-marker text-success"></i>: {userData.location}</h5>
              <Link to={'/'}><Button className='w-100'>Home</Button></Link>

             </div>
            </Card.Body>
           
          </Card>
                </div>

          )
        }
      
       
    </div>
  )
}

export default Profile