// CommentItem.js
import React from 'react'
import './index.css'

const CommentItem = ({comment, onLikeClick, onDeleteClick}) => {
  const {commenterName, commentText, liked, id, timestamp} = comment

  return (
    <li className="comment-item">
      <div className="comment-header">
        <p className="commenter-name">{commenterName}</p>
        <p className="comment-timestamp">{timestamp}</p>
        <p className="comment-timestamp">
          {this.calculateTimeDifference(timestamp)} ago
        </p>
      </div>
      <p className="comment-text">{commentText}</p>
      <div className="comment-actions">
        <img
          src={
            liked
              ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
          }
          alt="like"
          onClick={() => onLikeClick(id)}
          className="like-button"
        />
        <button
          type="button"
          className="delete-button"
          data-testid="delete"
          onClick={() => onDeleteClick(id)}
        >
          <img src="delete.png" alt="delete" />
          Delete
        </button>
      </div>
    </li>
  )
}

export default CommentItem
