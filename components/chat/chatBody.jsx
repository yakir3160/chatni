import { useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, View } from "react-native";
import { sendChatMessage } from "../../services/geminiSDK";
import ChatAnimation from "./chatAnimation";
import ChatInput from "./chatInput";
import MessageBubble from "./messageBubble";


export default function ChatBody({ }) {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleSend = async () => {
        if (!prompt.trim()) return;

        const userMessage = { id: Date.now().toString(), text: prompt, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setPrompt('');
        setLoading(true);
        Keyboard.dismiss();

        try {
            const responseText = await sendChatMessage(userMessage.text);
            const aiMessage = { id: (Date.now() + 1).toString(), text: responseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (e) {
            console.log('Error occurred:', e);

            const errorMessage = { id: (Date.now() + 1).toString(), text: 'מצטער, נתקלתי בשגיאה. אנא נסה שוב.', sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1, position: 'relative', width: '100%' }}>
            <FlatList
                style={{ flex: 1, padding: 8 }}
                data={messages}
                renderItem={({ item }) => (
                    <MessageBubble text={item.text}
                        isUser={item.sender === 'user'}
                    />
                )}
                keyExtractor={item => item.id}
            />
            <View
            style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', position: 'absolute', bottom: 80, left: 0, right: 0, top: 0 }}>
                {loading && <ChatAnimation />}
            </View>

            <ChatInput
                prompt={prompt}
                setPrompt={setPrompt}
                loading={loading}
                setLoading={setLoading}
                handleSend={handleSend}
            />
        </KeyboardAvoidingView >
    )
} 