import { StreamChat } from "stream-chat";
import { JWT_SECRET } from '@env';
import JWT from 'expo-jwt';
import { useSelector } from "react-redux";
import { id } from "date-fns/locale";

const chatClient = StreamChat.getInstance('8a4bf25khwrq');

export const userChatConfigData = ()=>{
    const chatData = useSelector((state)=>state?.user?.userStreamData)
     const chatApiKey = '8a4bf25khwrq';
     const chatUserToken = chatData?.token
     const chatUserId = chatData?.userId
     const chatUserName =  chatData?.userId
     console.log(chatData?.userId)
     return {
        chatApiKey,
        chatUserToken,
        chatUserId,
        chatUserName
     }


}
export const generateUserToken = async (user) => {
try {
   console.log(typeof(user?.id))
    const userId = `${user?.username?.replace(/\s+/g, '-')}-${user?.id.toString()}`;
    const key = JWT_SECRET;
    
   const token =  JWT.encode({user_id:user?.id.toString()}, key);
   const data = {
    token,
    userId:user?.id.toString()
}
   return data
} catch (error) {
}
    
}

