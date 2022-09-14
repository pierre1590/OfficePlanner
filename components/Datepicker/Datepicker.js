import React, {useState} from 'react';
import {StyleSheet,View, Platform,Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { Colors } from '../../costants/colors';

import {Ionicons} from '@expo/vector-icons';

export const Datepicker = ({enteredDate, setEnteredDate}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event,selectedDate) => {
      const currentDate =  selectedDate || enteredDate;
      console.log(currentDate)
      setShow(Platform.OS === 'ios' ? true : false);
      setEnteredDate(currentDate);
  }

  const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
  }

  const showDatepicker = () => {
      showMode('date');
  }
 
  
  
return (
    <View >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select date</Text>
      <View style={styles.input}>
         <Text style={{ fontSize: 18, color:Colors.tertiary,top:2 }}onPress={showDatepicker}> 
            {enteredDate ? enteredDate?.toISOString().split('T')[0] : 'Select date'}
          </Text>
          <Ionicons name="md-calendar" size={20} color={Colors.tertiary} />
      </View>
      
     
     {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={enteredDate}
          mode={mode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'default' : 'calendar'}
          onChange={onChange}

        />
        )}
      
    </View>
);
}

const styles = StyleSheet.create({
  input:{
    top:5,
    fontSize: 18,
    padding: 5,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: Colors.tertiary,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}
});