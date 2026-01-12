import { useState } from "react";
import { FlatList, KeyboardAvoidingView ,Keyboard} from "react-native";
import ChatInput from "./chatInput";
import MessageBubble from "./messageBubble";
import { sendChatMessage } from "../../services/geminiSDK";

export default function ChatBody({ }) {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'שלום! אני העוזר האישי שלך. איך אני יכול לעזור לך היום?', sender: 'ai' }
    ]);
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
        <KeyboardAvoidingView style={{ flex: 1, width: '100%' }}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <MessageBubble text={item.text} isUser={item.sender === 'user'} />
                )}
                keyExtractor={item => item.id}
            />
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