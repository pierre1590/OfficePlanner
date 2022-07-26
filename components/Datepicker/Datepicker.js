import React, {useState} from 'react';
import {TextInput,View, Platform,Text, Button} from 'react-native';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import { Colors } from '../../costants/colors';
import moment from 'moment';
import {Ionicons} from '@expo/vector-icons';

export const Datepicker = () => {
   
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event,selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios' ? true : false);
        setDate(currentDate);
    }

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatepicker = () => {
        showMode('date');
       
    }

    
   
  return (
    <>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select date</Text>
        <Text style={{ marginTop: 10, fontSize: 18, backgroundColor: Colors.classic, color: Colors.tertiary, padding: 5 }} onPress={showDatepicker}>
            {date.toDateString()}
            <Ionicons name="md-calendar" size={20} color={Colors.tertiary} />
        </Text>
        
        
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={mode}
            is24Hour={true}
            display="calendar"
            onChange={onChange}
          />
          )}
      </View>
    </>
  );
}
