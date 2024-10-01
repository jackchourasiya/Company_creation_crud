import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import '../App.css'
import Navcomponent from './Nav';


function Login() {
  const apiurl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [loading,setloading] = useState(false);

  const [user, Setuser] = useState({
    adminEmail:'',
    password:''
  })  

  const handlechange = (e) =>{
    Setuser({...user,[e.target.name]:e.target.value})
  }  

  const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            setloading(true)
            const Admin = await axios.post(`${apiurl}/adminLogin`,{user},{
                headers:{'Content-Type':'application/json'}
            })
            localStorage.setItem("token",Admin.data.token)
            toast(Admin.data.message);   

            setTimeout(()=>{
                navigate('/AdminDahboard');
            },2000)
        }
        catch(err){
            if(err.response){
                setloading(false)
                toast(err.response.data.message);
                // console.log(err.response)
            }
        }
  };

  return (
    <>
    <Navcomponent/>
    <div className='form-container'>
        <Form onSubmit={handleSubmit}>
        <h1>Admin LogIn</h1>
            <Form.Group as={Col} md="16" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
                required
                type="text"
                name='adminEmail'
                placeholder="Email"
                onChange={(e)=>handlechange(e)}
            />        
            </Form.Group>
            <Form.Group as={Col} md="16" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
                required
                name='password'
                type="text"
                placeholder="password"
                onChange={(e)=>handlechange(e)}
            />
            </Form.Group>
            {
                loading?<Spinner animation="border" variant="primary" />:<Button style={{ marginTop: '8px' }} type="submit">Login</Button>
            }
        <ToastContainer />
        </Form>
    </div>
    </>
    
  );
}

export default Login;