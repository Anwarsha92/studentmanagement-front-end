import React from 'react'
import { Spinner } from 'react-bootstrap'


function LoadingSpinner() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'50vh'}}>
        <Spinner animation="border" variant="info" /> <span className='ms-2'>Loading</span>
    </div>
  )
}

export default LoadingSpinner