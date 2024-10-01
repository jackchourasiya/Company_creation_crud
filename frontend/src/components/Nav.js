import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AdminDahboard from './AdminDahboard';
import { useNavigate,Link } from 'react-router-dom';
// import Navcomponent from './Nav';

function Navcomponent() {
  const token = localStorage.getItem('token');

  const Logout = () => {
    localStorage.clear();
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">App</Navbar.Brand>
          
          <Nav className="me-auto" >
             {token ? (
              <>

                <Link to="/Addcompany" className='nav-link'>Create Company</Link>
                <Link to="/AdminDahboard" className='nav-link'>Listing</Link>
                
                <Link to="/" onClick={Logout} className='nav-link'>Logout</Link>
                
              </>
            ) : (
              <Link to="/" className='nav-link'>Home</Link>
            )}

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navcomponent;


