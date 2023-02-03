import * as functions from "firebase-functions";
import { Response } from 'express'
import { db } from './config/firebase'

type EntryType = {
  title: string,
  text: string
}

type Request = {
  body: EntryType,
  params: { entryId: string }
}

// CREATE
const addEntry = async (req: Request, res: Response) => {
  
  let { title, text } = req.body
  title = (typeof title === 'undefined') ? 'default_title' : title;
  text = (typeof text === 'undefined') ? 'default_text' : text;

  try {
    const entry = db.collection('entries').doc()
    const entryObject = {
      id: entry.id,
      title,
      text,
    }

    entry.set(entryObject)

    res.status(200).send({
      status: 'success',
      message: 'entry added successfully',
      data: entryObject
    })
  } catch(e) {
      res.status(500).json((e as Error).message)
  }
}

// READ
const getAllEntries = async (req: Request, res: Response) => {
  try {
    const allEntries: EntryType[] = []
    const querySnapshot = await db.collection('entries').get()
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))
    return res.status(200).json(allEntries)
  } catch(error) { return res.status(500).json(error.message) }
}

const getEntry = async (req: Request, res: Response) => {

  const { entryId } = req.params

  try {
    const entry = db.collection('entries').doc(entryId)
    const entryData = (await entry.get()).data()    

    // Validate that entry exists
    if (typeof entryData === 'undefined') {
      return res.status(400).json({
        status: 'error',
        message: 'entry does not exist',
        entry_id: entryId
        }
      )  
    }

    return res.status(200).json({
      status: 'success',
      message: 'got entry',
      data: entryData
    })
  }
  catch(error) { return res.status(500).json(error.message) }
}



// UPDATE
const updateEntry = async (req: Request, res: Response) => {
  const { body: { text, title }, params: { entryId } } = req

  try {
    const entry = db.collection('entries').doc(entryId)
    const currentData = (await entry.get()).data()

    // Validate that entry exists
    if (typeof currentData === 'undefined') {
      return res.status(400).json({
        status: 'error',
        message: 'entry does not exist',
        entry_id: entryId
        }
      )  
    }
    const entryObject = {
      title: title || currentData.title,
      text: text || currentData.text,
    }

    await entry.set(entryObject).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'entry updated successfully',
      data: entryObject
    })
  }
  catch(error) { return res.status(500).json(error.message) }
}


// DELETE
const deleteEntry = async (req: Request, res: Response) => {
  const { entryId } = req.params

  try {
    
    const entry = db.collection('entries').doc(entryId)

    // Validate that entry exists
    const entryData = (await entry.get()).data()    
    if (typeof entryData === 'undefined') {
      return res.status(400).json({
        status: 'error',
        message: 'entry does not exist',
        entry_id: entryId
        }
      )  
    }

    // Delete entry
    await entry.delete().catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
        entry_id: entryId
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'entry deleted successfully',
      entry_id: entryId
    })
  }
  catch(error) { return res.status(500).json(error.message) }
}

export { addEntry, getEntry, getAllEntries, updateEntry, deleteEntry }
