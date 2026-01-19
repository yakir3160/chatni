import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function InternationalTravelAdvisor({ handleGenerate }) {
    const [data, setData] = useState({
        origin: '',
        destination: '',
        duration: '',
        budget: '',
        travelers: '',
        maxStops: '',
        flightClass: '',
        interests: ''
    });

    const handleSubmit = () => {
        console.log("International Trip Request:", data);
        handleGenerate();
        // You can build your prompt handling logic here
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Plan Your International Trip</Text>
            
            <View style={styles.row}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>From (Origin)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g. Tel Aviv" 
                        value={data.origin}
                        onChangeText={(text) => setData({...data, origin: text})}
                    />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>To (Destination)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g. Tokyo" 
                        value={data.destination}
                        onChangeText={(text) => setData({...data, destination: text})}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Duration (Days)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g. 10" 
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

            <Text style={styles.sectionHeader}>Flight Preferences</Text>
            <View style={styles.row}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Max Stops</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g. 0 (Direct), 1, Any" 
                        value={data.maxStops}
                        onChangeText={(text) => setData({...data, maxStops: text})}
                    />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Class</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g. Economy, Business" 
                        value={data.flightClass}
                        onChangeText={(text) => setData({...data, flightClass: text})}
                    />
                </View>
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
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
        color: '#444',
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
        backgroundColor: '#5856D6', // Using a different color to distinguish from local
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