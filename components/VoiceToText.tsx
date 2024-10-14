import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Torch from 'react-native-torch';
import {VoiceProcessor} from '@picovoice/react-native-voice-processor';

const VoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(false);
  const [flash, setFlash] = useState(false); // Ensure initialization

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Request permission on Android
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        .then(granted => {
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
              'Permission Denied',
              'You need camera permission to use the flashlight.',
            );
          }
        })
        .catch(err => Alert.alert(err));
    }
  }, []);
  useEffect(() => {
    Torch.switchState(flash);
  }, [flash]);

  //Timer function...
  useEffect(() => {
    // if (!timer) {
    //   setFlash(data => !data);
    // }

    if (timer) {
      var clearTime = setTimeout(() => {
        setTimer(false);
        setFlash(data => !data);

        //console.log('timer update');
      }, 800);
    }
    return () => clearTimeout(clearTime);
  }, [timer]);

  const voiceProcessor = VoiceProcessor.instance;
  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'This app needs access to your microphone to process voice input.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  };
  const startRecording = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      return;
    }

    const frameLength = 600;
    const sampleRate = 6000;

    try {
      await voiceProcessor.start(frameLength, sampleRate);

      voiceProcessor.addFrameListener(frame => {
        // console.log('Audio Frame: ', frame);
        let value = calculateVolume(frame);
        if (value > 9000 && !timer) {
          setTimer(true);
        }
      });

      setIsRecording(true);
    } catch (error) {
      Alert.alert('Failed to start recording');
      //console.error('Failed to start recording', error);
    }
  };
  //
  const calculateVolume = (frame: any[]) => {
    // Basic way to calculate volume (average amplitude)
    const sumSquares = frame.reduce((sum, sample) => sum + sample * sample, 0);
    const rms = Math.sqrt(sumSquares / frame.length);

    return rms;
  };
  //
  const stopRecording = () => {
    voiceProcessor.stop();
    setIsRecording(false);
  };

  return (
    <View style={Styles.mainView}>
      <Text style={Styles.newText}>
        {isRecording ? 'Recording...' : 'Press the button to start recording.'}
      </Text>

      <View style={Styles.SetView}>
        <TouchableOpacity onPress={startRecording} style={Styles.StartBtn} />

        <TouchableOpacity onPress={stopRecording} style={Styles.StopBTN} />
      </View>

      <View style={Styles.buttonGap}>
        <TouchableOpacity
          style={Styles.OpacityTouch}
          onPress={() => setFlash(!flash)}>
          <Text style={Styles.InnerText}>{flash ? ' ON' : 'OFF'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#013',
  },
  buttonGap: {
    marginTop: '50%',
    backgroundColor: '#0ac',
    marginLeft: '40%',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  OpacityTouch: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InnerText: {
    fontSize: 30,
    color: '#f0e',
  },
  StartBtn: {
    height: 50,
    width: 50,
    backgroundColor: '#0f5',
    borderRadius: 25,
  },
  StopBTN: {
    height: 50,
    width: 50,
    backgroundColor: '#f05',
    borderRadius: 25,
  },
  SetView: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  newText: {
    color: '#fff',
  },
});

export default VoiceToText;
