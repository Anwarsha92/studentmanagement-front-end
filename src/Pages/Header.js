import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <div>

<Navbar className="bg-black "  style={{height:'60px'}}>
        <Container>
          <Navbar.Brand href="/">
            
            <strong><h3 className='text-white'><i className="las la-graduation-cap"></i>StudentConnect</h3></strong>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header