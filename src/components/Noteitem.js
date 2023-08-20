import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"

const Noteitem = (props) => {
  const context = useContext(noteContext);
    const {deleteNote} = context;
   const {note, updateNote} = props;
  return (
    <div className="col-md-3" >
    <div className="card my-3" >
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <hr />
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <i className="btn fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
            <i className="btn fa-solid fa-trash-can" onClick={()=>{deleteNote(note._id);props.showAlert(" Note Deleted ", "success")}}></i>
        </div>
    </div>
    </div>
  )
  
}

export default Noteitem
