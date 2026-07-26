// To create server

const express = require('express')
const noteModel = require('./models/notes.model')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
// http://localhost:3000/assets/index-C7gR20Rp.js
// http://localhost:3000/assets/index-C2lCt3AI.css
// http://localhost:3000/assets/index-C2lCt3AI-2.css ---- <NOT EXIST>
app.use(express.static('./public'))

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: 'Note created successfully.',
        note
    })
})

app.get('/api/notes', async (req, res) => {
    const note = await noteModel.find()

    res.status(200).json({
        message: "Note fetched successfully.",
        note
    })
})

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted syccessfully."
    })
})

app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body
    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully."
    })
})

console.log(__dirname);


app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'))
})



module.exports = app