import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";


export function Home(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const [redirect,setRedirect] = useState(false);
    //const {setUser,user} = useUserContext();
    const handleSubmit = async (e:FormEvent) =>{
       e.preventDefault();
       setError(false);
       const response = await axios.post('/user/login',{email,password},{withCredentials:true});
       if(response.data.message){
            setError(true);
       }else{
           setRedirect(true);
        //    setUser(response.data);
        //    console.log(user);
       }
    }
    if(redirect) return <Navigate to="/" />
    return (
      <div className="container" style={{ color: "grey" }}>
        <h2 style={{ color: "dodgerblue", textAlign: "center",marginTop:"40px" }}>
          Connexion
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          {error && <h4 style={{
            color : "red",
            fontWeight : "bold"
          }}> Invalid credentials </h4>}
        </Form>
        <p>If you don't have an account , <Link to="/register">Register Here</Link></p>
      </div>
    );
}