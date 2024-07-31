import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Request = () => {
  const [book, setBook] = useState({ title:"", author: "", email:""});

  const navigate = useNavigate();
  const handleChange =(e) =>{
    setBook(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      console.log(book , "done")
      // send me an email with book title and author
      navigate("/") // if everything was a good navigate to home page
    } catch (error) { console.log(error) }
  }

  console.log(book)
  return (
    <div className='form'>
     <h1>Request For Book</h1>
     <input type="text" placeholder='Book Title' onChange={handleChange} name="title"/>
     <input type="text" placeholder='Author' onChange={handleChange} name='author'/>
     <input type="email" placeholder='Your Email Adderss' onChange={handleChange} name='email'/>
     <button onClick={handleClick}>Send Request</button>
    </div>
  )
}

export default Request
 