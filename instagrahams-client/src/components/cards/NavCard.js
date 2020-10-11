import React from 'react';
import CommentForm from "../forms/CommentForm.js"
import { withRouter } from "react-router-dom"

class NavCard extends React.Component {
    
    clickListener = (event) => {

       let photoId = this.props.data.id
       this.props.history.push(`/nav/${photoId}`)
    }

    render() {
        console.log(this.props.data)
        return (
        <div className="photo">
            <div className="photo">
                <img onClick={this.clickListener}src={this.props.data.img} alt=''/>
            </div>
            <div>
                <p>{this.props.data.description}</p>
            </div>
            
            <div>
                <span>
                    <div>
                        likes: {this.props.data.likes.length}
                    </div>
                    <div>
                        comments: {this.props.data.comments.length}
                    </div>
                </span>
            </div>
            <div className="card-buttons">
                <button>like</button>
                <button>comment</button>
                <button>save</button>
                <button>follow</button>
            </div>
            <div className="date-div">
                {this.props.data.date}
            </div>
            <div className="comments-div">
                <CommentForm/>
            </div>

        </div>
        )
    }
}

export default withRouter(NavCard)