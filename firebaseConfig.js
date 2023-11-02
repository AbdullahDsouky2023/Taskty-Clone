

import {initializeApp} from 'firebase/app';
import { initializeAuth ,getAuth,getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//abdodsouky edge
// export const firebaseConfig = {
//     apiKey: "AIzaSyCkFySoGyh-fH1ir8OZxbnmO33VEWg10Dk",
//     authDomain: "home-services-user-b9504.firebaseapp.com",
//     projectId: "home-services-user-b9504",
//     storageBucket: "home-services-user-b9504.appspot.com",
//     messagingSenderId: "886597742556",
//     appId: "1:886597742556:web:869a9f71557314fd722919"
//   };
//Chrome
export const firebaseConfig = {
  apiKey: "AIzaSyCfFPu1VIgGhgRgzvcfbAzipgd4_MYfkAs",
  authDomain: "home-service2.firebaseapp.com",
  projectId: "home-service2" ,
  storageBucket: "home-service2.appspot.com",
  messagingSenderId: "197872272379",
  appId: "1:197872272379:web:ef909bbd7ebfe41110415e"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export default app;
