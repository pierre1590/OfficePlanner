import React, {useState} from 'react';
import {Text,View} from 'react-native';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import { Colors } from '../../costants/colors';
import moment from 'moment';
import {Ionicons} from '@expo/vector-icons';

export const TimePicker = () => {
   //Create a new Datepicker to select the date 
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShow(Platform.OS === 'ios' ? true : false);
        setTime(currentTime);
    }
    
    
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    }

    const showTimepicker = () => {
        showMode('time');
    }


    

    

  return (
   <>
    <View>
     
        <Text style={{fontSize:18,fontWeight: 'bold'}}>Select hour</Text>
        {/*Date in format YYYY/MM/DD */}
        <Text style={{marginTop: 10,fontSize:18,backgroundColor:Colors.classic,color:Colors.tertiary,padding:5}} onPress={showTimepicker}>
            {moment(time).format('LT')}
            <Ionicons name="md-timer-outline" size={20} color={Colors.tertiary} />
        </Text>
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="clock"
                onChange={onChange}
                
            />
        )}
    </View>
    
    </>
    
  )
}
