import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import { context } from './NotificationContext'
import { useNavigate } from 'react-router-dom'

const AnecdoteForm = () => {
  const [state, dispatch] = useContext(context)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (error) => {
      dispatch({ type: 'error', message: error.response.data.error })
    },
    onSuccess: (newAnecdote) => {
      const previousAnecdotes = queryClient.getQueryData(['anecdotes'])
      console.log(previousAnecdotes)
      queryClient.setQueryData(
        ['anecdotes'],
        [...previousAnecdotes, newAnecdote],
      )
    },
  })
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'success', message: `Created anecdote: ${content}` })
    navigate('/')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
