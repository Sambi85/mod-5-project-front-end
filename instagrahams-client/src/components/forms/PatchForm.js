import React from 'react';
import { Button, Form } from "semantic-ui-react";

class PatchForm extends React.Component {

    state = {
        img: '',
        description: ''
    }

    changeHandler = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
        this.formHandler(this.state)
    }

    formHandler = (formObj) => {
        
        let id = this.props.patchId
        console.log(id)
        debugger
        let options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                // this.props.current_user
                img: formObj.img,
                description: formObj.description,
                date: Date(Date.now()),
                user_id: 1
            })
        }

        fetch(`http://localhost:4000/posts/${id}`,options)
        .then(response => response.json())
        .then(console.log)
        
        this.setState({
            img: "",
            description: ""
        })
    }

    render() {
        return (
            <>
             <div style={{ backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Saqqara_pyramid_ver_2.jpg/1200px-Saqqara_pyramid_ver_2.jpg")`, backgroundPosition: 'center',
  backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'1450px', height: '800px'
      }}>
      </div>
      <div className="patchform-div" style={{"border":"1px solid lightGrey","border-radius":"10px","paddingBottom":"20px", backgroundColor:"white", opacity:"85%"}} >
                <Form onSubmit={this.submitHandler}className="post-form">
                    <h1> Update Post </h1>
                    <input name="img" value={this.state.img} placeholder="Img Url" onChange={this.changeHandler}/>
                    <input name="description" value={this.state.description} placeholder=" Change Description Here"onChange={this.changeHandler}/>
                    <Button>Post</Button>    
                </Form>
            </div>
            </>
        )
    }
}
export default PatchForm;