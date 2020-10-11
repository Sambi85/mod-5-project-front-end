import React from 'react';
import { withRouter } from 'react-router-dom';
import CommentForm from '../forms/CommentForm.js';

class PostCard extends React.Component {

    render() {
        return (
            <>
            <div className="photo-div">
                {/* < img src={} alt="photo"/> */}
                
            </div>

            <div className="title-div">
                title
            </div>
              <div className="comments-div">
                  comments
                  <CommentForm/>
              </div>
            </>
        )
    }
}

export default withRouter(PostCard)