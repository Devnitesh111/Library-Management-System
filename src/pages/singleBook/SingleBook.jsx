import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  const fetchBook = async () => {
    const response = await axios.get(`http://localhost:3000/book/${id}`);
    if (response.status === 200) {
      setBook(response.data.data);
    }
  };

  const del = async () => {
    try {
      await axios.delete(`http://localhost:3000/book/${id}`);
      // After deletion, you can redirect or do any necessary cleanup
      // For example, redirecting to the homepage after deletion:
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      <Navbar />
      <img
        className="w-full"
        src={book.imageUrl ? book.imageUrl : 'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=sph'}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.bookName}</div>
        <p className="text-gray-700 text-base">Rs. {book.bookPrice}</p>
        <p className="text-black-700 text-base">{book.isbnNumber}</p>
        <p className="text-black-700 text-base">{book.authorName}</p>
        <p className="text-black-700 text-base">{book.publishedAt}</p>
        <button onClick={del} className="bg-blue-300 p-2">
          Delete
        </button>
        <Link to={`/editBook/${book._id}`}>
          <button className="bg-blue-300 p-2 ml-2">Edit</button>
        </Link>
      </div>
    </>
  );
};

export default SingleBook;
