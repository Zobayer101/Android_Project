import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Mic from 'react-native-vector-icons/Ionicons';
import Calender from 'react-native-vector-icons/AntDesign';

const CreateToDo = () => {
  const [addData, setAddData] = useState(false);
  return (
    <View style={style.Contuner}>
      <Text style={style.titleText}>What is to be done?</Text>
      <View style={style.InputSection}>
        <TextInput
          placeholder="Enter Task Here"
          placeholderTextColor={'#d1e3e3'}
          style={style.InputFild}
          onFocus={() => setAddData(true)}
          // clearTextOnFocus={() => setAddData(false)}
        />
        <Mic name="mic-sharp" color={'#fff'} size={30} style={style.iCon} />
      </View>
      <Text style={style.titleText}>Due date</Text>
      <View style={style.InputSection}>
        <TextInput
          placeholder="Date not set"
          placeholderTextColor={'#d1e3e3'}
          style={style.InputFild}
        />
        <Calender name="calendar" size={30} color={'#fff'} style={style.iCon} />
      </View>
      <Text style={style.titleText}>Add to List</Text>
      <View style={style.AddListCon}>
        <Text style={style.Texts}>Default List</Text>

        <TouchableOpacity style={style.IconSet}>
          <Calender name="caretdown" color={'#fff'} size={20} />
          <Calender name="bars" color={'#fff'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={addData ? style.relative : style.AddToDo}>
        <Calender name="checkcircleo" color={'#fff'} size={50} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  Contuner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3616c4',
  },
  titleText: {
    color: '#4cfafc',
    fontSize: 20,
    marginLeft: 25,
    marginTop: 30,
  },
  InputSection: {
    width: '100%',
    height: 80,
    //backgroundColor: '#f0c',
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputFild: {
    padding: 0,
    fontSize: 25,
    color: '#fff',
    borderBottomColor: '#12f9fc',
    borderBottomWidth: 1.5,
    height: 40,
    width: 280,
    marginLeft: 25,
  },
  iCon: {marginLeft: 10},
  AddListCon: {
    marginTop: 10,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    // backgroundColor: '#fce',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Texts: {
    color: '#fff',
    marginLeft: 25,
    fontSize: 20,
  },
  IconSet: {
    width: 100,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  AddToDo: {
    width: 80,
    height: 80,
    position: 'relative',
    backgroundColor: '#02aeba',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    transform: [{translateX: 290}, {translateY: 100}],
  },
  relative: {
    width: 80,
    height: 80,
    position: 'absolute',
    backgroundColor: '#02aeba',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    transform: [{translateX: 290}, {translateY: 350}],
  },
});

export default CreateToDo;
