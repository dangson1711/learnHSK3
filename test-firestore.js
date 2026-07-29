import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  try {
    await setDoc(doc(db, 'test_collection', 'test_doc'), { test: true });
    console.log("Write Success!");
    process.exit(0);
  } catch(e) {
    console.error("Error Code:", e.code);
    console.error("Error Message:", e.message);
    process.exit(1);
  }
}
run();
