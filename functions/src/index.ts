import * as functions from "firebase-functions";
import * as express from 'express'

import { db } from './config/firebase'
import { addEntry } from './entryController'


const app = express()

app.get('/', (req, res) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  res.status(200).send('Hello world!')
})

app.get('/health', (req, res) => {
  functions.logger.info('Helth Check', { structuredData: true })
  res.status(200).send('Health Check  OK!')
})


// for now its a GET rather than POST just to make it easier to test on chrome
app.get('/entries', addEntry)

exports.app = functions.https.onRequest(app)