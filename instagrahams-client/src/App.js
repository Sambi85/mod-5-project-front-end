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
    postPatch: []
  }

  componentDidMount(){
   
    fetch('http://localhost:4000/users/1').then(response => response.json()).then(userData =>
    
    this.setState({ current_user: userData }))

    fetch('http://localhost:4000/posts').then(response => response.json()).then(postData =>
          this.setState({ posts: postData }))

    fetch('http://localhost:4000/likes').then(response => response.json()).then(likeData =>
          this.setState({ likes: likeData })) 
  }

  profilePatchHandler = (patchObj) => {
    console.log(patchObj)
    this.setState({
      postPatch: patchObj
    })
  }

  render() {
console.log(this.state.postPatch)
  return (
    <div className="App">
      <Header/>
       <Switch>
          <Route exact path="/" render={() => <HomePage user={this.state.current_user} users={this.state.users} posts={this.state.posts}/>}/>
          <Route exact path="/profile" render={() => <Profile user={this.state.current_user} posts={this.state.posts} patchHandler={this.profilePatchHandler}/>}/>
          <Route exact path="/nav" render={() => <Nav data={this.state.posts}/>}/>
          <Route exact path="/nav/:id" render={() => <PostCard/>}/>
          <Route exact path="/profile/:id" render={() => <PostCard/>}/>
          <Route exact path="/settings" render={() => <Settings current_user={this.state.current_user}/>}/>
          <Route exact path="/postform" render={()=> <PostForm current_user={this.state.current_user}/>}/>
          <Route exact path="/patchform" render={()=> <PatchForm current_user={this.state.current_user} patchId={this.state.postPatch}/>}/>
          {/* <Route exact path="/login" render={}/> */}
          {/* <Route exact path="/dm" render={}/> */}
    
      </Switch>
           
    </div>
    );
  }
}

export default App;
