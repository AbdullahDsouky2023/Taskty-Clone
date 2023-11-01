// Import the functions you need from the SDKs you need
import { firebase } from '@expo/firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkFySoGyh-fH1ir8OZxbnmO33VEWg10Dk",
  authDomain: "home-services-user-b9504.firebaseapp.com",
  projectId: "home-services-user-b9504",
  storageBucket: "home-services-user-b9504.appspot.com",
  messagingSenderId: "886597742556",
  appId: "1:886597742556:web:869a9f71557314fd722919"
};
let app ;
if(firebase.app.length === 0 ){
    app = firebase.initializeApp(firebaseConfig)
}else {
app = firebase.app()
}
const auth = firebase.auth()
export { auth }