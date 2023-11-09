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

            const phoneNumberWithoutPlus = phone?.replace("+", "");
            
            // Convert the string to a number
            const phoneNumber = Number(phoneNumberWithoutPlus);
            const user =    await api.get(`/api/users?filters[$and][0][phoneNumber][$eq]=${phoneNumber}`)
            console.log("usus",user?.data)
            if(user) return user?.data
        }
        return false;
    } catch (error) {
        console.log("Error creating the user ",error.message)
    }
}