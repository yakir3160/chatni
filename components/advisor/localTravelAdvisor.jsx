import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LocalTravelAdvisor({ handleGenerate }) {
    const [data, setData] = useState({
        destination: '',
        duration: '',
        budget: '',
        travelers: '',
        interests: '',
        maxDriveTime: '',
    });

    const handleSubmit = () => {
        console.log(data);
        handleGenerate();
        // You can build your prompt handling logic here
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Plan Your Local Trip</Text>
            
            <View style={styles.formGroup}>
                <Text style={styles.label}>Destination</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="e.g. Tel Aviv, Jerusalem, Eilat" 
                    value={data.destination}
                    onChangeText={(text) => setData({...data, destination: text})}
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Duration (Days)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g. 3" 
                        keyboardType="numeric"
                        value={data.duration}
                        onChangeText={(text) => setData({...data, duration: text})}
                    />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Travelers</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g. 2" 
                        keyboardType="numeric"
                        value={data.travelers}
                        onChangeText={(text) => setData({...data, travelers: text})}
                    />
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Budget (Low, Medium, High)</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="e.g. Medium" 
                    value={data.budget}
                    onChangeText={(text) => setData({...data, budget: text})}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Interests / Preferences</Text>
                <TextInput 
                    style={[styles.input, styles.textArea]} 
                    placeholder="e.g. Food, Hiking, History, Museums" 
                    multiline
                    numberOfLines={3}
                    value={data.interests}
                    onChangeText={(text) => setData({...data, interests: text})}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Maximum Drive Time (Hours)</Text>
                <TextInput  

                    style={styles.input}
                    placeholder="e.g. 2"
                    keyboardType="numeric"
                    value={data.maxDriveTime}
                    onChangeText={(text) => setData({...data, maxDriveTime: text})}
                />
            </View> 

            <TouchableOpacity 
                style={styles.button} 
                onPress={handleSubmit}
            >
                <Ionicons name="color-wand-outline" size={20} color="white" />
                <Text style={styles.buttonText}>Generate recommendation </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    formGroup: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#666',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});