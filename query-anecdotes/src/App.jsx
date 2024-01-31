import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { context } from './components/NotificationContext'
import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom'
import AnecdoteList from './components/anecdoteList'
import About from './components/About'
import Anecdote from './components/Anecdote'

const App = () => {
  const match = useMatch('/anecdotes/:id')
  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (newAnecdote) => {
      const previousAnecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = previousAnecdotes.map((anecdote) =>
        anecdote.id === newAnecdote.id ? newAnecdote : anecdote,
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    },
  })
  const [state, dispatch] = useContext(context)
  const handleVote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'success',
      message: `Voted for anecdote: ${anecdote.content}`,
    })
  }

  const {
    data: anecdotes,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  const styles = {
    padding: '5px 10px',
    margin: '5px',
  }

  const footerStyles = {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#eee',
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    width: '100%',
    overflow: 'hidden',
  }
  // sort by votes
  anecdotes.sort((a, b) => b.votes - a.votes)

  const anecdote = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null
  return (
    <div>
      <Notification />

      <h3>Anecdote app</h3>
      <Link style={styles} to='/'>
        anecdotes
      </Link>
      <Link style={styles} to='/create'>
        create new
      </Link>
      <Link style={styles} to='/about'>
        about
      </Link>

      <Routes>
        <Route
          path='/'
          element={
            <AnecdoteList anecdotes={anecdotes} handleVote={handleVote} />
          }
        />
        <Route path='/create' element={<AnecdoteForm />} />
        <Route path='/about' element={<About />} />
        {
          <Route
            path='/anecdotes/:id'
            element={<Anecdote anecdote={anecdote} />}
          />
        }
      </Routes>
      <footer style={footerStyles}>
        <em>
          Anecdotes App &copy;
          {new Date().getFullYear()}
          <a
            href='https://github.com/ovchinikov'
            target='_blank'
            rel='noopener noreferrer'
          >
            Ovchinikov
          </a>
        </em>
      </footer>
    </div>
  )
}

export default App
