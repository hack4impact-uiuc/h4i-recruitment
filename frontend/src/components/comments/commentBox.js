import React from 'react'
import { Row } from 'reactstrap'

const CommentBoxComponent = ({ comments }) => (
  <div>
    <h5>Comments:</h5>
    {comments == undefined || comments.length == 0 ? (
      <div className="center">
        <p>No Comments</p>
      </div>
    ) : (
      comments.map((comment, idx) => (
        <Row key={idx}>
          <div className="comment-box">
            <div>
              <div className="comment-header">
                <p>
                  {comment.writerName ? comment.writerName : 'unrecorded user'} @
                  {comment.created_at}
                </p>
              </div>
              <div className="comment-body">
                <p>{comment.text ? comment.text : 'Unrecorded comment....'}</p>
              </div>
            </div>
          </div>
        </Row>
      ))
    )}
  </div>
)

export default CommentBoxComponent
