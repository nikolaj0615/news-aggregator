import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <Navbar className='px-3  d-flex flex-column flex-md-row justify-content-between ' bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">News Page</Navbar.Brand>
            <Nav className='w-100'>
                <div className=" nav_items d-flex justify-content-between">
                    <Nav.Link as={Link} to="/sports">Sports</Nav.Link>
                    <Nav.Link as={Link} to="/politics">Politics</Nav.Link>
                    <Nav.Link as={Link} to="/business">Business</Nav.Link>
                    <Nav.Link as={Link} to="/health">Health</Nav.Link>
                    <Nav.Link as={Link} to="/technology">Technology</Nav.Link>
                    <Nav.Link as={Link} to="/fashion">Fashion</Nav.Link>
                </div>
            </Nav>


        </Navbar>
    );
};

export default NavBar;