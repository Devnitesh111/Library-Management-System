import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    bookName: '',
    bookPrice: '',
    isbnNumber: '',
    authorName: '',
    publishedAt: '',
    publication: '',
    imagePath: '', // to store the path of the previous image
  });
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      if (!validateFile(files[0])) {
        return;
      }
      setImage(files[0]);
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const validateFile = (file) => {
    if (!file) {
      setErrorMessage('');
      return true;
    }

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    const maxSize = 1024 * 1024 * 1; // 1MB

    if (!allowedExtensions.test(file.name)) {
      setErrorMessage('Only images are allowed.');
      return false;
    }

    if (file.size > maxSize) {
      setErrorMessage('File size exceeds 1MB.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFile(image)) {
      return;
    }
    const formData = new FormData();

    // Delete the previous image if it exists
    if (data.imagePath) {
      try {
        await axios.delete(`http://localhost:3000/delete-image/${data.imagePath}`);
      } catch (error) {
        console.error('Error deleting previous image:', error);
      }
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('image', image);

    try {
      const response = await axios.patch(`http://localhost:3000/book/${id}`, formData);
      if (response.status === 200) {
        navigate(`/book/${id}`);
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/book/${id}`);
      if (response.status === 200) {
        const { imagePath, ...rest } = response.data.data;
        setData({ ...rest, imagePath }); // set imagePath from response
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bookName" className="block text-sm font-medium text-gray-600">
              Book Name
            </label>
            <input
              type="text"
              id="bookName"
              value={data.bookName}
              name="bookName"
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bookPrice" className="block text-sm font-medium text-gray-600">
              Book Price
            </label>
            <input
              type="number"
              id="bookPrice"
              name="bookPrice"
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
              value={data.bookPrice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isbnNumber" className="block text-sm font-medium text-gray-600">
              ISBN Number
            </label>
            <input
              type="text"
              id="isbnNumber"
              name="isbnNumber"
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
              value={data.isbnNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-600">
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
              value={data.authorName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publication" className="block text-sm font-medium text-gray-600">
              Publication
            </label>
            <input
              type="text"
              id="publication"
              name="publication"
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
              value={data.publication}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-600">
              Published At
            </label>
            <input
              type="date"
              id="publishedAt"
              name="publishedAt"
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
              value={data.publishedAt}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bookImage" className="block text-sm font-medium text-gray-600">
              Book Image
            </label>
            <input
              type="file"
              id="bookImage"
              name="image"
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
              onChange={handleChange}
            />
            {data.imagePath && <p className="text-gray-500 mt-2">Previous Image: {data.imagePath}</p>}
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Edit Book
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBook;
