import PropTypes from 'prop-types'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <div>
        <em>{anecdote.content}</em>
      </div>
      <div>votes:{anecdote.votes}</div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
}

export default Anecdote
