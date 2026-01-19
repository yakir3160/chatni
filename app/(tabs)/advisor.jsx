import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

import { appColors } from '@/constants/appColors';

import AdvisorBody from '@/components/advisor/advisorBody';
import { ThemedText } from '@/components/themed-text';

export default function AdvisorScreen() {
  return (
    <LinearGradient
      colors={appColors.gradients.background}
      style={styles.container}
    >
      <ThemedText type="title" style={styles.title}>
        Advisor
      </ThemedText>
      <AdvisorBody />
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
    color: appColors.secondary,
  },
});
