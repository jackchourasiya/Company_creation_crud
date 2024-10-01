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

function Addcompany() {
  const token    = localStorage.getItem('token');  
  const navigate = useNavigate();
  const [loading,setloading] = useState(false);
  const apiurl = process.env.REACT_APP_API_URL;

  const [company, Setcompany] = useState({
    companyname:'',
    domain:''
  })  

  const handlechange = (e) =>{
    Setcompany({...company,[e.target.name]:e.target.value})
  }  

  const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('company-',company)

        try{
            setloading(true)

            const Add_company = await axios.post(`${apiurl}/addcompany`,{company},{
              headers: { Authorization: `Bearer ${token}` } 
            })

            console.log('Add_company-',Add_company.data.message);

            toast(Add_company.data.message);   

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
            <Form.Group as={Col} md="16" controlId="validationCustom01">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
                required
                type="text"
                name='companyname'
                placeholder="Companyname"
                onChange={(e)=>handlechange(e)}
            />        
            </Form.Group>
            <Form.Group as={Col} md="16" controlId="validationCustom02">
            <Form.Label>Company Domain</Form.Label>
            <Form.Control
                required
                name='domain'
                type="text"
                placeholder="domain"
                onChange={(e)=>handlechange(e)}
            />
            </Form.Group>
            {
                loading?<Spinner animation="border" variant="primary" />:<Button style={{ marginTop: '8px' }} type="submit">Add company</Button>
            }
        <ToastContainer />
        </Form>
    </div>
    </>
  
  );
}

export default Addcompany;