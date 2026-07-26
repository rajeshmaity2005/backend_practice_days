import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.note);
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function submitHandler(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    axios.post('http://localhost:3000/api/notes', {
      title: title.value,
      description: description.value
    })
      .then(res => {
        fetchNotes()
      })
  }

  function noteDeleteHandler(noteId) {
    axios.delete('http://localhost:3000/api/notes/' + noteId)
      .then(res => {
        fetchNotes()
      })
  }

  return (
    <>

      <form className='note-create-form' onSubmit={submitHandler}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button>Submit</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>

              <button
                onClick={() => { noteDeleteHandler(note._id) }}
              >Delete</button>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App
