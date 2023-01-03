import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm></AnecdoteForm>
      <AnecdoteList></AnecdoteList>
    </div>
  )
}

export default App