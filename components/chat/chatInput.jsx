import { appColors } from '@/constants/appColors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { stopGeneration } from '../../services/geminiSDK';


export default function ChatInput({ prompt, setPrompt, handleSend, loading }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="כתוב הודעה..."
        placeholderTextColor={appColors.textSecondary}
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />
      <TouchableOpacity 
        onPress={loading ? stopGeneration : handleSend}
        disabled={!prompt && !loading}
      >
        <LinearGradient
          colors={!prompt && !loading ? ['#ccc', '#ccc'] : appColors.gradients.primary}
          style={styles.sendButton}
        >
          {
            loading ? (
              <Ionicons name="square" size={20} color="white" />
            ) :  <Ionicons name="send" size={20} color="white" />
          }
         
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 16,
    backgroundColor: appColors.glass,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: appColors.surface,
  },
  input: {
    flex: 1,
    backgroundColor: appColors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
    textAlignVertical: 'center',
    color: appColors.textPrimary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});