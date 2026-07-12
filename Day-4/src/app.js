/**
 * To create Server
 * To config Server
 */

const express = require('express')
const app = express() //Server Created

app.use(express.json())
const notes = []

// POST API /notes
app.post('/notes', (req, res) => {
    res.send('Notes Created');

    notes.push(req.body)
})

// GET API /notes
app.get('/notes', (req, res) => {
    res.send(notes)
})

// DELETE API /notes
// Use Params (only when you have dynamic number like (:index))
// /notes/:index/0
app.delete('/notes/:index', (req, res) => {
    console.log(req.params.index);

    delete notes[req.params.index]

    res.send('Notes Deleted')
})

// PATCH API
app.patch('/notes/:index', (req, res) => {
    notes[req.params.index].description = req.body.description
    res.send('Notes Updated Successfully.')
})






module.exports = app