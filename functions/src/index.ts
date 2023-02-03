import * as functions from "firebase-functions";
import * as express from 'express'

import { db } from './config/firebase'
import { addEntry } from './entryController'


const app = express()

app.get('/', (req, res) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  res.status(200).send('Hello world!!!!')
})

app.get('/health', (req, res) => {
  functions.logger.info('Helth Check', { structuredData: true })
  res.status(200).send('Health Check  OK!')
})


app.get('/test-db', async (req, res) => {
  try {
    const entry = db.collection('entries').doc()
    const entryObject = {
      hola: 'mundo2',
    }
    await entry.set(entryObject)
    res.status(200).send({ message: 'OK' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

app.get('/entries', addEntry)

exports.app = functions.https.onRequest(app)
