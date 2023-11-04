import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";


// Function to store user information in Firestore
export async function changeUserInfo(uid, data) {
  const userDocRef = doc(db, "users", uid);

  try {
    // Set the user data in the "users" collection using the UID as the document ID
    await setDoc(userDocRef, data);
    console.log("User data stored successfully");
  } catch (error) {
    console.error("Error storing user data:", error);
  }
}

async function checkUserAndSetName(userUID, newName) {
  // Reference to the user's profile document
  const userDocRef = db.collection('userProfiles').doc(userUID);

  try {
    const doc = await userDocRef.get();
    if (doc.exists) {
      // User already has a name
      const userData = doc.data();
      console.log('==============user data======================');
      console.log(userData);
      console.log('====================================');
      const userName = userData.name;
      console.log(`User's name: ${userName}`);
    } else {
      // User does not have a name; set their name
      await userDocRef.set({ name: newName });
      console.log(`User's name set to ${newName}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}




