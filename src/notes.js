import {insert, getDB, saveDB } from "./db.js"

export const newNote = async (note,tags) =>{
    const data = {
        tags,
        content: note,
        id: Date.now()
    }
    await insert(data)
    return data
}

export const getAllNotes = async ()=>{
    const {notes} = await getDB()
    return notes
}

export const findNotes = async searchWord =>{
    const notes = await getAllNotes()
    return notes.filter(note => note.content.toLowerCase().includes(searchWord.toLowerCase()))
}

export const removeNote = async id => {
    const notes = await getAllNotes()
    const match = notes.find(note => note.id === id )

    if (match){
        const newNote = notes.filter(note=> note.id != id)
        saveDB({notes: newNote})
        return id
    }
}

export const removeAllNotes = () => saveDB({notes: []})