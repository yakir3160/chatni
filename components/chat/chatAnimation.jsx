import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';



export default function ChatAnimation() {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 800 }),
                withTiming(1, { duration: 800 })
            ),
            -1,
            true
        );
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.6, { duration: 800 }),
                withTiming(1, { duration: 800 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.content, animatedStyle]}>
                <Text style={styles.text}>Generating...</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       width: '40%',
        minHeight: 50,
        padding: 20,
       minHeight: 50,
       padding: 20,
    },
    content: {
        padding: 10,
        borderRadius: 20,

    },
    text: {
        fontSize: 16,
        fontWeight: '500', 
        color: '#FF5722',
    }
});