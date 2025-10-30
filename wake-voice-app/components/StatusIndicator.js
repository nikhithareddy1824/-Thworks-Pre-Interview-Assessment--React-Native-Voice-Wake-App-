import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatusIndicator({ status, awakeCountdown }) {
  const colorMap = {
    Idle: '#6c757d',
    Listening: '#0b6ef3',
    Awake: '#f39c12',
    Processing: '#8e44ad',
    Result: '#27ae60',
    Error: '#e74c3c'
  };
  const color = colorMap[status] || '#6c757d';
  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.text}>{status}{status === 'Awake' && awakeCountdown ? ` • ${awakeCountdown}s` : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  text: { marginLeft: 8, fontSize: 16, fontWeight: '600' }
});

