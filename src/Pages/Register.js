import React, {useState, useContext} from 'react'
import {Row, Col,Form} from 'react-bootstrap'

// import firebase from 'firebase/compat/app'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const firestore = firebase.firestore()

import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  doc
} from "firebase/firestore";



import {UserContext} from '../context/UserContext'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

const Register=()=> {
    const context = useContext(UserContext)
    const navigate =  useNavigate()
  
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

  const usersCollectionRef = collection(db, "users");
    const handleSignUp = ()=>{
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then((res)=>{
          console.log(res)
          context.setUser({email:res.user.email, uid: res.user.uid})
          const createUser = async () => {
            await addDoc(usersCollectionRef, { email: res.user.email, score: 0, total:0 });
          };
          createUser()
        })
          .catch((error)=>{
            console.log(error)
            toast(error.message,{
              type:'error'
            })
          })
      
        }
      
        const handleFormSubmit=(e)=>{
          e.preventDefault()
          handleSignUp()
        }
      
        if(context.user?.uid){
          navigate("/")
        }
       
      
  return (
    <div className='main'>
    <Row style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Col xl={6} sm={12} md={8}>
    <div className='form'>
    <Form onSubmit={handleFormSubmit}>
    <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control
            type='email'
            name='email'
			      id='email'
            placeholder='Enter Email'
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
        /> 
    </Form.Group>
    <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
            type='password'
            placeholder='Enter Password'
            name='password'
			      id='password'
            required
            value={password}
			      onChange={e => setPassword(e.target.value)}
        />
    </Form.Group>
    <button type='submit' className='submit mt-3'>
       Register
    </button>
</Form>
    </div>
    </Col>
    </Row>
      
   </div>
  )
}

export default Register