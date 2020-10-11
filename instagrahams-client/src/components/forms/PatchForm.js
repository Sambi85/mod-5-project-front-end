import React from 'react';

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
            <div className="post-form-div">
                <form onSubmit={this.submitHandler}className="post-form">
                    <h1> Update your Post </h1>
                    <input name="img" value={this.state.img} placeholder="Img Url" onChange={this.changeHandler}/>
                    <input name="description" value={this.state.description} placeholder="Description"onChange={this.changeHandler}/>
                    <button>Post</button>    
                </form>
            </div>
            </>
        )
    }
}
export default PatchForm;