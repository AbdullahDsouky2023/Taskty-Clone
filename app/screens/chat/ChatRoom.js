import React from 'react'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo'
import { useChatContext } from '../../context/ChatContext';

export default function ChatRoom() {
  const { channel } = useChatContext();
  console.log(channel)

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  )
}