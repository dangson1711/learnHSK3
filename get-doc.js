import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  try {
    const d = await getDoc(doc(db, 'vocabularies', '旅游'));
    if (d.exists()) {
      console.log(JSON.stringify(d.data(), null, 2));
    } else {
      console.log("Doc not found. Let's try HSK1 word.");
      const d2 = await getDoc(doc(db, 'vocabularies', '你好'));
      console.log(JSON.stringify(d2.data(), null, 2));
    }
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
