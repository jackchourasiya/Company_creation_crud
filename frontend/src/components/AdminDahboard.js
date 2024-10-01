import { useEffect, useState } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import Navcomponent from './Nav';


function AdminDahboard (){
    const token                 = localStorage.getItem('token');
    const [company, setcompany] = useState();
    const apiurl = process.env.REACT_APP_API_URL;
    const fetchdata = async() => {
        try{
            const company_response = await axios.get(`${apiurl}/getcompany`,{
                headers:{Authorization:`Bearar ${token}`}
            })
            console.log('company_response.data.companyInfo-',company_response.data)
            setcompany(company_response.data.companyInfo);
        }
        catch(err){
            if(err.response){
                console.log(err.response.data.message)
            }
        }
    }

    useEffect(()=>{ 
        fetchdata();
    },[]);

    const deletecompany = async (id) => {
        try {
          const company_response = await axios.delete(`http://localhost:5000/deletecompany/${id}`, {
            headers: { Authorization: `Bearer ${token}` }  // Correct spelling of 'Bearer'
          });
          fetchdata();  // Fetch updated data after deletion
        } catch (err) {
          if (err.response) {
            console.log(err.response.data.message);  // Log any error message from the response
          }
        }
      };
      

    return(
        <>
        <Navcomponent/>
         <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                    <th>Company name</th>
                    <th>Domain</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                company && company.length > 0 ? (
                    company.map((val, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{val.companyname}</td>
                        <td>{val.domain}</td>
                        <td><Link to={`/editcompany/${val._id}`}>Edit</Link></td>
                        <td>
                        <button onClick={() => deletecompany(val._id)}>Delete</button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="5">Company not available</td>
                    </tr>
                )
                }

            </tbody>
            </Table>
        </>
    )
}
export default AdminDahboard;