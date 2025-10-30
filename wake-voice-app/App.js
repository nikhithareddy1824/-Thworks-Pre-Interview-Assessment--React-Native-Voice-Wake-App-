import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import StatusIndicator from './components/StatusIndicator';
import ResultCard from './components/ResultCard';

const WAKE_PHRASE = 'hey thworks'; // change if you like (lowercase)

export default function App() {
  const [status, setStatus] = useState('Idle'); // Idle, Listening, Awake, Processing, Result, Error
  const [partial, setPartial] = useState('');
  const [resultText, setResultText] = useState('');
  const [awakeCountdown, setAwakeCountdown] = useState(0);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // start continuous listening on mount
    startListening();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    // If awake, set a short window (e.g., 5s) to capture the actual command
    if (status === 'Awake') {
      setAwakeCountdown(5);
      const timer = setInterval(() => {
        setAwakeCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // timed out without command
            setStatus('Idle');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  async function startListening() {
    try {
      setStatus('Listening');
      setPartial('');
      // on Android you may need to pass locale: 'en_US'
      await Voice.start('en-US');
    } catch (e) {
      console.error('startListening error', e);
      setStatus('Error');
    }
  }

  function onSpeechStart(e) {
    // console.log('onSpeechStart', e);
  }

  function onSpeechPartialResults(e) {
    const { value } = e;
    if (value && value.length > 0) {
      const text = value.join(' ').toLowerCase();
      setPartial(text);
      // if we are not awake yet, check for wake phrase
      if (status !== 'Awake' && text.includes(WAKE_PHRASE)) {
        // detected wake phrase
        onWakeDetected();
      }
    }
  }

  function onSpeechResults(e) {
    const { value } = e;
    if (value && value.length > 0) {
      const text = value.join(' ').trim();
      // If currently awake -> treat this as user's command
      if (status === 'Awake') {
        setStatus('Processing');
        setResultText(text);
        setTimeout(() => {
          setStatus('Result');
          // after showing result, return to Listening after 3s
          setTimeout(() => {
            setResultText('');
            startListening(); // restart continuous listening
          }, 3000);
        }, 500); // simulate processing
      } else {
        // If not awake but wake phrase was present in full results and we missed it earlier
        if (text.toLowerCase().includes(WAKE_PHRASE)) {
          onWakeDetected();
        }
      }
    }
  }

  function onSpeechError(e) {
    console.error('onSpeechError', e);
    setStatus('Error');
    Alert.alert('Speech Error', (e && e.error && e.error.message) || 'Unknown');
    // attempt to restart listening after a short wait
    setTimeout(() => {
      startListening();
    }, 1000);
  }

  async function onWakeDetected() {
    setStatus('Awake');
    setPartial('');
    // stop existing recognition to avoid merging results
    try {
      await Voice.stop();
    } catch (e) {
      console.warn('stop after wake error', e);
    }
    // give short delay and then start a fresh capture for the user's single utterance
    setTimeout(async () => {
      try {
        setStatus('Listening');
        // start one-shot capture for the command
        await Voice.start('en-US');
      } catch (e) {
        console.error('start for command error', e);
        setStatus('Error');
      }
    }, 400);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wake-Word Demo</Text>

      <StatusIndicator status={status} awakeCountdown={awakeCountdown} />

      <View style={styles.section}>
        <Text style={styles.hint}>Wake phrase:</Text>
        <Text style={styles.wakePhrase}>{WAKE_PHRASE}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.hint}>Live partial results:</Text>
        <Text style={styles.partial}>{partial}</Text>
      </View>

      <ResultCard status={status} resultText={resultText} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => {
          setResultText('');
          startListening();
        }}>
          <Text style={styles.buttonText}>Restart Listening</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.stopBtn]} onPress={async () => {
          try { await Voice.stop(); setStatus('Idle'); } catch (e) { console.warn(e); }
        }}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>States: Idle · Listening · Awake · Processing · Result · Error</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f9fc' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  section: { marginVertical: 12 },
  hint: { fontSize: 14, color: '#333' },
  wakePhrase: { fontSize: 18, fontWeight: '600', marginTop: 6 },
  partial: { marginTop: 6, fontSize: 16, color: '#666' },
  controls: { flexDirection: 'row', gap: 10, marginTop: 20 },
  button: { padding: 12, backgroundColor: '#0b6ef3', borderRadius: 8, marginRight: 10 },
  stopBtn: { backgroundColor: '#c0392b' },
  buttonText: { color: '#fff', fontWeight: '600' },
  footer: { marginTop: 24, color: '#666', fontSize: 12 }
});
