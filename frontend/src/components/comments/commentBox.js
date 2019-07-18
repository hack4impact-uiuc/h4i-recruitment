import React from 'react'
import { Row } from 'reactstrap'
import { convertUTCToLocal } from '../../utils/core'

const CommentBoxComponent = ({ comments }) => (
  <>
    <h4>Comments:</h4>
    {comments == undefined || comments.length == 0 ? (
      <div className="center">
        <p>No Comments</p>
      </div>
    ) : (
      comments.map((comment, idx) => (
        <Row key={idx} className="ml-1">
          <div className="comment-box">
            <div className="comment-header">
              <p>
                {comment.writerName ? comment.writerName : 'unrecorded user'} @{' '}
                {convertUTCToLocal(comment.created_at)}
              </p>
            </div>
            <div className="comment-body">
              <p className="mb-0 textarea-input">
                {comment.text ? comment.text : 'Unrecorded comment....'}
              </p>
            </div>
          </div>
        </Row>
      ))
    )}
  </>
)

export default CommentBoxComponent
