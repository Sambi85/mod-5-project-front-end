import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header.js';
import HomePage from "./containers/Homepage.js"
import Profile from "./containers/Profile.js";
import Nav from "./containers/Nav.js";
import Settings from "./containers/Settings.js";
import PostCard from "./components/cards/PostCard.js";
import PostForm from "./components/forms/PostForm.js";
import PatchForm from "./components/forms/PatchForm.js";
class App extends React.Component {

  state = {
    current_user: null,
    users: [],
    posts: [],
    likes: [],
    follows: [],
    postPatch: []
  }

  componentDidMount(){
   
    fetch('http://localhost:4000/users/1').then(response => response.json()).then(userData =>
    
    this.setState({ current_user: userData }))

    fetch('http://localhost:4000/posts').then(response => response.json()).then(postData =>
          this.setState({ posts: postData }))

    fetch('http://localhost:4000/follows').then(response => response.json()).then(followData =>
          this.setState({ follows: followData }))

    fetch('http://localhost:4000/likes').then(response => response.json()).then(likeData =>
          this.setState({ likes: likeData })) 
  }

  profilePatchHandler = (patchObj) => {
    console.log(patchObj)
    this.setState({
      postPatch: patchObj
    })
  }

  likePostHandler = (postObj) => {
      console.log("Post!:", postObj)
        let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
        // this.props.current_user
        post_id: postObj,
        user_id: 1,
        counter: 1,
        date: Date(Date.now())
        })
      }

    fetch(`http://localhost:4000/likes`, options)
    .then(response => response.json())
    .then(likeObj =>
        this.setState({
          likes: [...this.state.likes, likeObj]
      })
    )
}

likeDestroyHandler = (likeObj) => {

  let targetId = likeObj[0].id
  let options = { method: "DELETE" }
  let newArray = [...this.state.likes]
  let foundIndex = newArray.findIndex(element => element.id === targetId)
    newArray.splice(foundIndex, 1)

  fetch(`http://localhost:4000/likes/${targetId}`, options)
  .then(response => response.json())
  .then(data => console.log("This should be empty",data),
    
    this.setState({
      likes: newArray
    })
  )
}

followPostHandler = (leaderObj) => {
  console.log("Post!:", leaderObj.id)
      let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
      // this.props.current_user
      leader_id: leaderObj.id,
      follower_id: 1,
      date: Date(Date.now())
      })
    }

  fetch(`http://localhost:4000/follows`, options)
  .then(response => response.json())
  .then(followObj => 
      this.setState({
        follows: [...this.state.follows, followObj]
    })
  )
}

followDestroyHandler = (followObj) => {

  console.log("Delete!:", followObj[0])
  let targetId = followObj[0].id
  let options = { method: "DELETE" }
  let newArray = [...this.state.follows]
  let foundIndex = newArray.findIndex(element => element.id === targetId)
  let splicedArray = newArray.splice(foundIndex, 1) 
  
  fetch(`http://localhost:4000/follows/${targetId}`, options)
  .then(response => response.json())
  .then(
    this.setState({
      follows: newArray
    })
  )
}

  render() {
    console.log("Front-End-follows:",this.state.follows)
  return (
    <div className="App">
      <Header/>
       <Switch>
          <Route exact path="/" render={() => 
          <HomePage 
            user={this.state.current_user} 
            users={this.state.users} 
            likes={this.state.likes} 
            follows={this.state.follows}
            likePostHandler={this.likePostHandler}
            likeDestroyHandler={this.likeDestroyHandler}
            followPostHandler={this.followPostHandler}
            followDestroyHandler={this.followDestroyHandler}
            posts={this.state.posts}/>}/>
            
          <Route exact path="/profile" render={() =>         
              <Profile user={this.state.current_user} 
                posts={this.state.posts} 
                patchHandler={this.profilePatchHandler} 
                likes={this.state.likes} 
                likePostHandler={this.likePostHandler}
                likeDestroyHandler={this.likeDestroyHandler}/>}/>

          <Route exact path="/nav" render={() => 
            <Nav
              user={this.state.current_user} 
              posts={this.state.posts}
              likes={this.state.likes} 
            follows={this.state.follows}
              likePostHandler={this.likePostHandler}
              likeDestroyHandler={this.likeDestroyHandler}
              followPostHandler={this.followPostHandler}
              followDestroyHandler={this.followDestroyHandler}/>}/>
          
          <Route exact path="/nav/:id" render={() => <PostCard/>}/>
          <Route exact path="/profile/:id" render={() => <PostCard/>}/>
          
          <Route exact path="/settings" render={() => 
            <Settings 
              current_user={this.state.current_user}/>}/>
          
          <Route exact path="/postform" render={()=> 
            <PostForm 
              current_user={this.state.current_user}/>}/>
          
          <Route exact path="/patchform" render={()=> 
            <PatchForm 
              current_user={this.state.current_user} 
              patchId={this.state.postPatch}/>}/>
          {/* <Route exact path="/login" render={}/> */}
          {/* <Route exact path="/dm" render={}/> */}
    
      </Switch>
           
    </div>
    );
  }
}

export default App;
