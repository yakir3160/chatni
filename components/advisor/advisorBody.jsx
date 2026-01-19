import { useState } from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { createAdvisorPrompt, generateText } from '../../services/geminiSDK';
import InternationalTravelAdvisor from './internationalTravelAdvisor';
import LocalTravelAdvisor from './localTravelAdvisor';


export default function AdvisorBody({ }) {
    const [role, setRole] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [GeneratedText, setGeneratedText] = useState('');

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const prompt =  await createAdvisorPrompt(role, formData);
            const response = await generateText(prompt);
            console.log("Generated Response:", response);
            setGeneratedText(response);
        } catch (error) {
            console.error("Error generating response:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <RNPickerSelect
                style={{
                    viewContainer: { backgroundColor: 'white', borderRadius: 25, margin: 10, },
                    inputIOS: { color: 'black', padding: 10, },
                    inputAndroid: { color: 'black', padding: 10, },
                }}
                onValueChange={(value) => setRole(value)}
                items={[
                    { label: 'Local Travel Advisor', value: 'local_travel_advisor' },
                    { label: 'International Travel Advisor', value: 'international_travel_advisor' },
                ]}
            />
            {role === 'local_travel_advisor' && (
                <View style={{ flex: 1, padding: 20 }}>
                    <LocalTravelAdvisor formData={formData} setFormData={setFormData}  handleGenerate={handleGenerate}  />
                </View>
            )}
            {role === 'international_travel_advisor' && (
                <View style={{ flex: 1, padding: 20 }}>
                    <InternationalTravelAdvisor formData={formData} setFormData={setFormData}  handleGenerate={handleGenerate}  />
                </View>
            )}
            <View style={{ padding: 20 }}>

                {loading ? 'Generating...' : (
                    <Text style={{ padding: 20, color: '#333', fontSize: 16 }}>
                        {
                            GeneratedText
                        }
                    </Text>
                )}
            </View>
        </View>
    );
}   