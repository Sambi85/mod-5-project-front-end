import React from 'react';

class CommentForm extends React.Component {

state = {
    comment: ""
}

changeHandler = (event) => {
    
    this.setState({
        comment: event.target.value
    })
}

submitHandler = (event) => {
    
    this.setState({
        comment: event.target.value
    })
}

    render() {
        return (
            <div className="comment-form-div">
            <form onSubmit={this.submitHandler}>
                <input name="comment" value={this.state.comment} placeholder="comment here" onChange={this.changeHandler}/>
                <button>Post</button>
            </form>
            </div>
        )
    }

}

export default CommentForm