import {Component} from 'react'
import {v4 as uuidv4} from 'uuid' // Import v4 for generating unique IDs
import './index.css'
class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      comment: '',
      commentsList: [],
      commentCount: 0,
      likedComments: {},
    }
  }

  onInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {username, comment, commentsList, commentCount} = this.state

    if (username.trim() !== '' && comment.trim() !== '') {
      const newComment = {
        id: uuidv4(),
        username,
        comment,
        date: new Date(),
        isLiked: false,
      }

      this.setState((prevState)=>({
        commentsList: [newComment, ...prevState.commentsList],
         likedComments: { ...prevState.likedComments, [newComment.id]: false },
        username: '',
        comment: '',
        commentCount: commentCount + 1,
      }))
    }
  }

    onLikeClick = (id) => {
    this.setState((prevState) => {
      const updatedLikedComments = { ...prevState.likedComments };
      updatedLikedComments[id] = !updatedLikedComments[id];

      return { likedComments: updatedLikedComments };
    });
  };

  onDeleteClick = id => {
    const {commentsList, commentCount} = this.state
    const updatedComments = commentsList.filter(comment => comment.id !== id)

    this.setState({
      commentsList: updatedComments,
      commentCount: commentCount - 1,
    })
  }
  calculateTimeDifference = timestamp => {
    const currentTime = new Date()
    const commentTime = new Date(timestamp)
    const timeDifference = currentTime - commentTime

    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days} days ago`
    } else if (hours > 0) {
      return `${hours} hours ago`
    } else if (minutes > 0) {
      return `${minutes} minutes ago`
    } else {
      return `${seconds} seconds ago`
    }
  }

  render() {
    const {username, comment, commentsList, commentCount} = this.state

    return (
      <div>
        <h1 className="app-heading">Comments</h1>
        <p>Say Something</p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
          alt="comments"
        />
        <p>{commentCount}</p>

        <form onSubmit={this.onAddComment}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.onInputChange}
            placeholder="Your Name"
          />
          <textarea
            name="comment"
            value={comment}
            onChange={this.onInputChange}
            placeholder="Your Comment"
          />
          <button type="submit">Add Comment</button>
        </form>

        <ul>
          {commentsList.map(comment => (
            <li key={comment.id}>
              <p>{comment.username}</p>
              <p>{comment.comment}</p>
              <p>{new Date() - comment.date}ms ago</p>
              <p>{this.calculateTimeDifference(comment.date)} ago</p>
              <img
                src={
                  this.state.likedComments[comment.id]
                    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
                }
                alt="like"
                onClick={() => this.onLikeClick(comment.id)}
                className="like-button"
              />
               <button type="button" onClick={() => this.onLikeClick(comment.id)}>
                Like
              </button>
              <button
                type="button"
                data-testid="delete"
                onClick={() => this.onDeleteClick(comment.id)}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                  alt="delete"
                />
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Comment
