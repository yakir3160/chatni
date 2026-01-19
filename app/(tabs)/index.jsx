import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

import ChatBody from '@/components/chat/chatBody';
import { ThemedText } from '@/components/themed-text';
import { appColors } from '@/constants/appColors';

export default function ChatScreen() {
  return (
    <LinearGradient
      colors={appColors.gradients.background}
      style={styles.container}
    >
      <ThemedText type="title" style={styles.title}>Chat</ThemedText>
      <ThemedText type="subtitle"  style={styles.subtitle}>היי איך אני יכול לעזור לך היום?</ThemedText>
      <ChatBody />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    marginBottom: 20,
    color: appColors.primary,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: appColors.primary,
  },  
});
