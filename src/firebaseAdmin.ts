import admin from "firebase-admin"

const config = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  }),
}

const createClientApp = () => {
  if (!admin.apps.length) {
    return admin.initializeApp(config)
  }

  return admin.app()
}

const FirebaseAdmin = createClientApp()

export default FirebaseAdmin
