import { PropTypes } from 'prop-types'
import { Link, useParams } from 'react-router-dom'

const AnecdoteList = ({ anecdotes, handleVote }) => {
  const { id } = useParams()

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          <div>
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
  handleVote: PropTypes.func.isRequired,
}

export default AnecdoteList
