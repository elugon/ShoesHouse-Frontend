import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import shoesHouseLogo from '../../img/shoesHouseLogo.png';
import ReactStars from "react-rating-stars-component";
import { AuthContext } from '../../context/AuthContext';



function Comments() {

    const { user } = useContext(AuthContext);
    console.log(user)
    const storedToken= localStorage.getItem('authToken')
    const [comments, setComments] = useState(null)
    const [newComment, setNewComment] = useState({
        text: '',
        rating: 0,
        user_name:''
    })
    const { id } = useParams();
    const navigate = useNavigate();

    const ratingChanged = (newRating) => {
      setNewComment(prev => {
        return {
          ...prev,
          rating: newRating
        }
      })
    }

    const handleChange = (e) => {
        setNewComment(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
      }

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/${id}`);
            if(response.data.data.length === 0){
                setComments(null)
            } else {
                setComments(response.data.data)
            }
          } catch (error) {
            console.error(error)
          }
        }
        getData();
      }, [id])

      const handleSubmit = async (e) => {
        console.log(newComment)
        e.preventDefault();
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/comments/${id}`, { text:newComment.text, rating:newComment.rating, user_name:user.username }, { headers: { Authorization:`Bearer ${storedToken}` }});
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/${id}`);
          if(response.data.data.length === 0){
              setComments(null)
          } else {
              setComments(response.data.data)
          } 
        } catch (error) {
            console.log(error)        
        }
      }


  return (
    <>
     <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8 m-2 rounded dark:bg-slate-600 dark:m-2 dark:rounded'>
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
      <img className="mx-auto h-18 w-auto" src={shoesHouseLogo} alt="shoes-house logo" />
    <p className="mt-2 text-center text-sm text-gray-600 max-w dark:text-slate-200">
      Do you want to go back?</p>
      <h1 className="text-center text-sm font-medium text-indigo-600 dark:text-cyan-400" onClick={() => navigate(-1)}> Click here!</h1>
    <div>{comments && comments.map(ele =>{
        return (
          
          <div key={ele._id} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 dark:bg-slate-400">
              <div className='mb-2  w-full border-gray-300 p-2 border-2 rounded-lg shadow-sm dark:bg-slate-300'>{ele.text}</div>
                <label>{<ReactStars count={5} value={ele.rating} size={24} activeColor="#ffd700"/>}</label>
              </div>
            </div>
          
          )})}
    <div>{!comments && <p>No comments yet</p>}</div>
    </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 dark:bg-slate-400">
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">What did you like or dislike?</label>
        <input required type="text" name="text" value={newComment.text} onChange={handleChange} className='w-full border-gray-300 p-2 border-2 rounded-lg shadow-sm focus:border-2 focus:rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none dark:bg-slate-300'/>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100 mt-2">Your overall rating of this product</label>
        <label>{<ReactStars count={5} onChange={ratingChanged} value={newComment.rating} size={24} activeColor="#ffd700"/>}</label>
        <button type="submit" className='p-auto pb-2 m-1 mt-3 bg-red-500 px-4 py-2 text-white rounded-full'>Make a review!</button>
      </form>
    </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Comments