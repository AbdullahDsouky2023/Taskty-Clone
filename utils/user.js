import { setUserData } from '../app/store/features/userSlice';
import api from './index';

export const createUser = async(data)=>{
    try {
     const createdUser =    await api.post('/api/users',{
            ...data,
            role:2,
        })
        return true
    } catch (error) {
        console.log("Error creating the user ",error)
    }
}
export const getUserByPhoneNumber = async(phone)=>{
    try {
        // Remove the "+" symbol
        if(phone){
            console.log("user phone from user is ",phone)
            const phoneNumberWithoutPlus = phone?.replace("+", "");
            
            // Convert the string to a number
            const phoneNumber = Number(phoneNumberWithoutPlus);
            const user =    await api.get(`/api/users?filters[$and][0][phoneNumber][$eq]=${phoneNumber}`)
            console.log("usus",user?.data)
            if(user?.data[0] && user?.data.length !== 0) {
                setUserData(user?.data[0])
                console.log("userfound",user?.data.length)
                return true
            }
            else {
                console.log("userfound",user?.data.length)
                return false

            } 
        } return false;
    } catch (error) {
        console.log("Error creating the user ",error.message)
    }
}
export const updateUserData = async(id,data)=>{
try {
   const updatedUser =  await api.put(`/api/users/${id}`,{
        ...data
    })
    console.log('====================================');
    console.log("update user",updatedUser);
    console.log('====================================');
    if(updateUserData) return true
    return false
} catch (error) {
    console.log('error updating the user ',error.message) 
}
}