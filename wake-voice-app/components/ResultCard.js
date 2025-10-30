import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultCard({ status, resultText }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Recognized text</Text>
      <Text style={styles.text}>
        {status === 'Idle' && 'Waiting...'}
        {status === 'Listening' && 'Listening... say the wake phrase'}
        {status === 'Awake' && 'Wake phrase detected — say your command'}
        {status === 'Processing' && 'Processing...'}
        {status === 'Result' && (resultText || 'No text captured')}
        {status === 'Error' && 'Error — see alert or logs.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 16, padding: 16, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.05, elevation: 3 },
  heading: { fontSize: 14, fontWeight: '700', marginBottom: 6 },
  text: { fontSize: 16, color: '#333' }
});

