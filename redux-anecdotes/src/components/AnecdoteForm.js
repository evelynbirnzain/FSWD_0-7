import {createAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import {clearNotification, setNotification} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteService.createNew(content)
      .then(anecdote => {
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`you created '${anecdote.content}'`))
        setTimeout(() => dispatch(clearNotification()), 5000)
      })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm