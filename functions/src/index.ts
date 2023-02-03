import * as functions from "firebase-functions";
import * as express from 'express'


import { addEntry, getEntry, getAllEntries, updateEntry, deleteEntry } from './entryController'


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
app.get('/entries/:entryId', getEntry)
app.patch('/entries/:entryId', updateEntry)
app.delete('/entries/:entryId', deleteEntry)


exports.app = functions.https.onRequest(app)