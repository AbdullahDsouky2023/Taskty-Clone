import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";


// Function to store user information in Firestore
export async function storeUserInfo(uid, data) {
  const userDocRef = doc(db, "users", uid);

  try {
    // Set the user data in the "users" collection using the UID as the document ID
    await setDoc(userDocRef, data);
    console.log("User data stored successfully");
  } catch (error) {
    console.error("Error storing user data:", error);
  }
}

// Example of using the UID to store user data
// if (currentUser) {
//   const userUID = currentUser.uid;
//   const userData = {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     // Add other user data here
//   };

  // Store the user information in Firestore
//   storeUserInfo(userUID, userData);
