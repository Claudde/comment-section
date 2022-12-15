import './App.scss';
import api from './api/comments';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';
import React, { useState, useEffect } from 'react';


function App() {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [media, setMedia] = useState('');

  const retrieveComments = async() => {
    const response = await api.get("./comments");
    return response.data;
  }
  
  useEffect(() => {
    const getUser = async () => {

      const response = await api.get("./currentUser")
        .then(response => {
          setUsername(response.data.username)
          setAvatar(response.data.image)})
        .catch(err => console.log(err))

    }

    const getAllComments = async () => {
      const allComment = await retrieveComments();
      if(allComment) setComments(allComment);
    };
    getUser();
    getAllComments();
  }, []);

  useEffect(() => {
    if(media !== ''){
      var newCommentDiv = document.getElementById(media);
      newCommentDiv.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setMedia('');
    }
    
  }, [username, comments, avatar, media]);

  const getNewId = () => {
    let maxId = 0;
    for(let i in comments){
      maxId = maxId < comments[i].id ? comments[i].id : maxId;
      for(let j in comments[i].replies){
        maxId = maxId < comments[i].replies[j].id ? comments[i].replies[j].id : maxId;
      }
    }
    return maxId + 1;
  }

  const addCommentHandler = async(e, comment) => {
    e.preventDefault();
    const request = {
      id: getNewId(), 
      ...comment
    }

    try {
      const response = await api.post("./comments", request);  
      setComments([...comments, response.data]);
      setMedia(response.data.id);
      
    } catch (error) {
      console.log(error);
    }
    
  }


  return (
    <div className="App">
      <header className="App-header">
        <h3>Comments</h3>
        
        <CommentList comments={[...comments]} 
                    setChanger={setComments} 
                    username={username} 
                    avatar={avatar}
                    getNewId={getNewId}/>

        <AddComment username={username} avatar={avatar} addCommentHandler={addCommentHandler}/>
      </header>
    </div>
  );
}

export default App;
