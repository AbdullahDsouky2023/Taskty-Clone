import { StreamChat } from "stream-chat";
import { JWT_SECRET } from '@env';
import JWT from 'expo-jwt';
import { useSelector } from "react-redux";
import { CHAT_API_KEY} from '@env'
const chatClient = StreamChat.getInstance(CHAT_API_KEY);

export const userChatConfigData = ()=>{
    const chatData = useSelector((state)=>state?.user?.userStreamData)
     const chatApiKey = CHAT_API_KEY;
     const chatUserToken = chatData?.token
     const chatUserId = chatData?.userId
     const chatUserName =  chatData?.userId
     return {
        chatApiKey,
        chatUserToken,
        chatUserId,
        chatUserName
     }


}
export const generateUserToken = async (user) => {
try {
   const userId = `user-${user?.id}`
   const key = JWT_SECRET;
    
   const token =  JWT.encode({user_id:userId}, key);
   const data = {
    token,
    userId:userId
}
   return data
} catch (error) {
}
    
}

