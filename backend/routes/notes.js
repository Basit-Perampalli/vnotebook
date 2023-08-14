const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser');
var Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Route 1: Get all the notes using GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser,async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
    
})

// Route 2: adding new notes using POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title',"Enter a valid title").isLength({ min: 3 }),
    body('description',"description cannot be blank").isLength({min:1})
],async (req, res)=>{
    try {
        const {title,description,tag} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user:req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
    
})

// Route 3: adding new notes using PUT "/api/notes/addnote". Login required
router.put('/updatenote/:id', fetchuser,async (req, res)=>{
    const {title, description, tag} = req.body
    try {
        // create a new Note object
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        
        // // Find the note to be updated and update it
        const id = req.params.id;
        let note = await Notes.findById(id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !==req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        note = await Notes.findByIdAndUpdate(id,{$set: newNote}, {new:true})
        res.json({note})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
// Route 3: adding new notes using DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser,async (req, res)=>{
    try {
        const id = req.params.id;
        let note = await Notes.findById(id)
        if(!note){return res.status(404).send("Not Found")}
    
        // Allow deletion only if users owns this note
        if(note.user.toString() !==req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        note = await Notes.findByIdAndDelete(id)
        res.json({"success": "Note has been deleted", note:note})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
    // // Find the note to be deleted and delete it
})

module.exports = router