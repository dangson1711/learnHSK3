import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Need to read the compiled JS or parse TS. Let's just do it directly.
const firebaseConfig = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const querySnapshot = await getDocs(collection(db, "vocabularies"));
  let count = 0;
  querySnapshot.forEach((doc) => {
    count++;
  });
  console.log("Total words in DB:", count);
}
check();
