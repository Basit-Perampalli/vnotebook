import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) =>{
    const notesInitial = [
        {
            "_id": "64da7c7577224311a99f9a5e",
            "user": "64d68d2b93d7be01862e4e74",
            "title": "Hello",
            "description": "Good Morning",
            "tag": "greeting",
            "date": "2023-08-14T19:11:49.886Z",
            "__v": 0
          },
        {
            "_id": "64da7c7577224311a99f9a5e",
            "user": "64d68d2b93d7be01862e4e74",
            "title": "Hello",
            "description": "Good Morning",
            "tag": "greeting",
            "date": "2023-08-14T19:11:49.886Z",
            "__v": 0
          },
        {
            "_id": "64da7c7577224311a99f9a5e",
            "user": "64d68d2b93d7be01862e4e74",
            "title": "Hello",
            "description": "Good Morning",
            "tag": "greeting",
            "date": "2023-08-14T19:11:49.886Z",
            "__v": 0
          },
        {
            "_id": "64da7c7577224311a99f9a5e",
            "user": "64d68d2b93d7be01862e4e74",
            "title": "Hello",
            "description": "Good Morning",
            "tag": "greeting",
            "date": "2023-08-14T19:11:49.886Z",
            "__v": 0
          },
        {
            "_id": "64da7c7577224311a99f9a5e",
            "user": "64d68d2b93d7be01862e4e74",
            "title": "Hello",
            "description": "Good Morning",
            "tag": "greeting",
            "date": "2023-08-14T19:11:49.886Z",
            "__v": 0
          },
          {
            "_id": "64da7e3a7487951355a6c27d",
            "user": "64d68d2b93d7be01862e4e74",
            "title": "Hello",
            "description": "Good Morning",
            "tag": "greeting",
            "date": "2023-08-14T19:19:22.199Z",
            "__v": 0
          }
    ]
const [notes,setNotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value={{notes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState