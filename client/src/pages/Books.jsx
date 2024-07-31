import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
const Books = () => {
  const [books, setBooks] = useState([]) // store JSON from response
  const [searchBookName, setSearchBook] = useState("") // store searched book

  // fetch data
  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3010/getBooks");//get data from backend
      // console.log(res);
      setBooks(res.data);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  
useEffect(() => {
  fetchAllBooks() // call the function after creating
},[])



  // download book
  const handleDownload = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
      });
  
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'book.pdf'); // Set the desired file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // delete book
  const deleteBook = async (id)=>{
    try {
      await axios.delete("http://localhost:3010/delete/"+id)
      fetchAllBooks()
      console.log("done")
    } catch (error) { console.log('An error occurred while deleting the book')}
  }



  const search=(searchBook)=>{ console.log(searchBook)}
  return (
    <div>
      <h1>Book Lab</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" placeholder='lets find the book' onChange={(searchBookName) => setSearchBook(searchBookName.target.value)} />
          <button className='update' onClick={()=>search(searchBookName)}>search</button>
        </div>
      </div>

      <div className="books">
        {
          books.filter((book)=> {
            return searchBookName.toLowerCase() === '' ? book : book.title.toLowerCase().includes(searchBookName)
          }).map(
            book => (
              <div className="book" key={book.id}>
                {book.cover && <img src={book.cover} alt="" />}
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>${book.price}</span>
                {/* <button className='update' onClick={() => deleteBook(book.id)}>Delete</button> */}
                <button className='update' onClick={() => handleDownload(book.urldownload)}>Download</button>
              </div>
            )
          )
        }
      </div>

      <button className='request'><Link to="/request">Request book</Link></button>

    </div>
  )
}

export default Books

// axios allows us to make any API request with react app