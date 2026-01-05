import { View } from "react-native"
import ChatInput from "./chatInput"
import MessageBubble from "./messageBubble"

export default function ChatBody({ messages }) {
    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <View style={{ padding: 8 }} >
                <MessageBubble text={"hello"} isUser={true} />
                <MessageBubble text={"hey how can i help you?"} isUser={false} />
            </View>

            <ChatInput />
        </View>
    )
}