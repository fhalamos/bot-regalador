import * as functions from "firebase-functions";
import * as express from 'express'


import { addEntry, getAllEntries } from './entryController'


const app = express()

app.get('/', (req, res) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  res.status(200).send('Hello world!')
})

app.get('/health', (req, res) => {
  functions.logger.info('Helth Check', { structuredData: true })
  res.status(200).send('Health Check  OK!')
})


app.post('/entries', addEntry)
app.get('/entries', getAllEntries)


exports.app = functions.https.onRequest(app)