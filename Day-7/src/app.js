// To Create a server

const express = require('express')
const noteModel = require('./models/notes.model')

const app = express()

app.use(express.json())

// POST /notes
// req = {title,description}

app.post('/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note Created Successfully.",
        note
    })
})

// GET /notes

app.get('/notes', async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Notes Fetched Successfuly.",
        notes
    })
})



module.exports = app