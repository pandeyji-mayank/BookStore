import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const verifyToken = async () => {
      const token = JSON.parse(localStorage.getItem('login'))?.token;
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.post(
          'http://localhost:5555/verify',
          {},  // Empty body (if no data needs to be sent)
          {
            headers: {
              'Authorization': `Bearer ${token}`,  // Authorization header with token
            },
          }
        );

        console.log(res.data);  // Handle response
      } catch (error) {
        console.error('Error during token verification:', error);
        navigate('/login');  // Redirect to login on failure
      }
    };
    verifyToken();
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        console.log(book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 max-h-9'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Image</span>
            <iframe src={`http://localhost:5555/${book.filePath}`} alt={book.title} width={1000} height={700} />
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
