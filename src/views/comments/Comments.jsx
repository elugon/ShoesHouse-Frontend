import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

function Comments() {

    const storedToken= localStorage.getItem('authToken')
    const [comments, setComments] = useState(null)
    const [newComment, setNewComment] = useState({
        text: '',
        rating: ''
    })
    const { id } = useParams();
    const navigate = useNavigate();


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
            const response = await axios.get(`http://localhost:8000/api/v1/comments/${id}`);
            if(response.data.data.response.status === 404){
                setComments(null)
            } else {
                setComments(response.data.data)
            }
            
            console.log(response.data.data)
          } catch (error) {
            console.error(error)
          }
        }
        getData();
      }, [id])

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/comments/${id}`, { text:newComment.text, rating:newComment.rating }, { headers: { Authorization:`Bearer ${storedToken}` }});  
          navigate('/login');
        } catch (error) {
            console.log(error)        
        }
      }


  return (
    <>
    <div>{comments && comments.map(ele =>{
        return <p>{ele.text}</p>})}
    <div>{!comments && <p>No comments yet</p>}</div>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <label>Text</label>
        <input required type="text" name="text" value={newComment.text} onChange={handleChange} />
        <label>Rating</label>
        <input required type="number" name="rating" value={newComment.rating} onChange={handleChange} />
        <button type="submit">Make a review!</button>
      </form>
    </div>
    
    </>
  )
}

export default Comments