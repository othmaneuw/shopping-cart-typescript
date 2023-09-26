// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import axios from "axios";
// import { sortCountries } from "./utils/sortCountries";
// import {Navigate} from 'react-router-dom';

// function Register() {
//   const [countries, setCountries] = useState([]);
//   const [redirect,setRedirect] = useState(false);
//   const [infos,setInfos] = useState({
//     name : "",
//     email : "",
//     password : "",
//     country : "",
//     city : "",
//     phone : ""
//   });
//   const getCountries = async () => {
//     const { data } = await axios.get("https://restcountries.com/v3.1/all");
//     setCountries(sortCountries(data));
//   };
//   const handleChange = (e) =>{
//       setInfos(prev => {
//         return {...infos, [e.target.name] : e.target.value}
//       });
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const {name,email,password,phone,country,city} = infos;
//     console.log(infos);
//     await axios.post("/user/register", {
//       name,
//       email,
//       password,
//       country,
//       city,
//       phone,
//     });
//     setRedirect(true);
//   };
//   useEffect(() => {
//     getCountries();
//   }, []);
//   if(redirect) return <Navigate to="/login" />
//   return (
//     <div style={{ color: "grey" }}>
//       <h2 style={{ color: "dodgerblue", textAlign: "center" }}>
//         {" "}
//         Créez votre compte{" "}
//       </h2>
//       <Form className="container" onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Form.Group as={Col} controlId="formGridEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email" />
//           </Form.Group>

//           <Form.Group as={Col} controlId="formGridPassword">
//             <Form.Label>Mot de passe</Form.Label>
//             <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" />
//           </Form.Group>
//         </Row>

//         <Form.Group className="mb-3" controlId="formGridAddress1">
//           <Form.Label>Name</Form.Label>
//           <Form.Control name="name" onChange={handleChange} placeholder="Enter your name" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formGridAddress2">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control name="phone" onChange={handleChange} placeholder="+212 .." />
//         </Form.Group>

//         <Row className="mb-3">
//           <Form.Group as={Col} controlId="formGridState">
//             <Form.Label>Country</Form.Label>
//             <Form.Select name="country" onChange={handleChange} defaultValue="Choose...">
//               {countries.map((country, index) => (
//                 <option key={index} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           <Form.Group as={Col} controlId="formGridCity">
//             <Form.Label>City</Form.Label>
//             <Form.Control onChange={handleChange} placeholder="city here" name="city" />
//           </Form.Group>
//         </Row>

//         <Button variant="primary" type="submit">
//           Créer
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default Register;
