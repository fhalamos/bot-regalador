import * as admin from 'firebase-admin'
import * as dotenv from 'dotenv'

dotenv.config()


admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.FS_PRIVATE_KEY,
    projectId: process.env.FS_PROJECT_ID,
    clientEmail: process.env.FS_CLIENT_EMAIL
  }),
  databaseURL: 'https://bot-regalador.firebaseio.com'
})

const db = admin.firestore()
export { admin, db }

