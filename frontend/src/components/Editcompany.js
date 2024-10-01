import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import Navcomponent from './Nav';


function Editcompany() {
  const apiurl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState({
    companyname: '',
    domain: '',
  });

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    try {
      const company_response = await axios.get(`${apiurl}/getcompany/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompany({
        companyname: company_response.data.companyInfo.companyname,
        domain: company_response.data.companyInfo.domain,
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const update_company = await axios.put(`${apiurl}/editcompany/${id}`, { company }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(update_company.data.message);

      setTimeout(() => {
        navigate('/AdminDahboard');
      }, 2000);
    } catch (err) {
      if (err.response) {
        setLoading(false);
        toast.error(err.response.data.message);
        console.log(err.response);
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
            value={company.companyname}
            placeholder="Company name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="16" controlId="validationCustom02">
          <Form.Label>Company Domain</Form.Label>
          <Form.Control
            required
            name='domain'
            value={company.domain}
            type="text"
            placeholder="Domain"
            onChange={handleChange}
          />
        </Form.Group>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Button type="submit">Update Company</Button>
        )}
        <ToastContainer />
      </Form>
    </div>
    </>

  );
}

export default Editcompany;
