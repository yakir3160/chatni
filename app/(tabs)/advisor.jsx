import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { appColors } from '@/constants/appColors';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AdvisorScreen() {
  return (
    <LinearGradient
      colors={appColors.gradients.background}
      style={styles.container}
    >
      <ThemedText type="title" style={styles.title}>
        Advisor
      </ThemedText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: appColors.secondary,
  },
});
