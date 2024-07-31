import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({ title:"", desc:"", price:null, cover:"", urldownload:""});

  const navigate = useNavigate();
  const handleChange =(e) =>{
    setBook(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3010/addBook", book)//book send json to create new book
      navigate("/") // if everything was a good navigate to home page
    } catch (error) { console.log(error) }
  }

  console.log(book)
  return (
    <div className='form'>
     <h1>Add New Book</h1>
     <input type="text" placeholder='title' onChange={handleChange} name="title"/>
     <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
     <input type="num" placeholder='price' onChange={handleChange} name='price'/>
     <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
     <input type="text" placeholder="Url Download" onChange={handleChange} name='urldownload'/>
     <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
 