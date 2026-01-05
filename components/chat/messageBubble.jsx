import { appColors } from '@/constants/appColors';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';


export default function MessageBubble({ text, isUser }) {
  if (isUser) {
    return (
      <LinearGradient
        colors={appColors.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.userBubble}
      >
        <Text style={[styles.messageText, styles.userText]}>
          {text}
        </Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.aiBubble}>
      <Text style={[styles.messageText, styles.aiText]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
    maxWidth: '90%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  aiBubble: {
    maxWidth: '90%',
    padding: 12,
    alignSelf: 'flex-start',
    direction: 'ltr',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: '#333',
  },
});