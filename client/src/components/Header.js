import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/header.css';

export default function Header() {

  const removeUser = (e) => {
    localStorage.removeItem('uid');
  }

  return (
    <Navbar className="border-bottom" bg="light" variant="light" expand="lg" >
      <Nav.Item className='navbar-brand nav-spacing'>Rate My Manager</Nav.Item>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='nav-spacing'/>
      <Navbar.Collapse className='nav-spacing' id="basic-navbar-nav">
        <Nav className="ml-auto nav-spacing">
          <Nav.Link href="/search">Search</Nav.Link>
          <Nav.Link href="/add-manager">Add Manager</Nav.Link>
          <Nav.Link href="/login" onClick={removeUser}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
