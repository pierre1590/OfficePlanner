import React, {useState} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import  DateTimePicker  from '@react-native-community/datetimepicker';
import { Colors } from '../../costants/colors';
import {Ionicons} from '@expo/vector-icons';


export const TimePicker = ({enteredTime,setEnteredTime}) => {
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event,selectedTime) => {
        const currentTime = selectedTime  || enteredTime;
        console.log(currentTime)
        setShow(Platform.OS === 'ios');
        setEnteredTime(currentTime);
        console.log(selectedTime)
    }
    
    
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    }

    const showTimepicker = () => {
        showMode('time');
    }

   
  const formatTime = () => {
    const hours = enteredTime.getHours() < 10 ? `0${enteredTime.getHours()}` : enteredTime.getHours();
    const minutes = enteredTime.getMinutes() < 10 ? `0${enteredTime.getMinutes()}` : enteredTime.getMinutes();
    return `${hours}:${minutes}`;
  }
    

    

  return (
   <>
    <View>
     
        <Text style={{fontSize:18,fontWeight: 'bold'}}>Select hour</Text>
        <View style={styles.input}>
         <Text style={{ fontSize: 18, color:Colors.tertiary,top:2 }}onPress={showTimepicker}> 
            {formatTime(enteredTime)}
        </Text>
          <Ionicons name="md-time" size={20} color={Colors.tertiary} />
      </View>
        
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={enteredTime}
                mode={mode}
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'default' : 'clock'}
                onChange={onChange}
                
            />
        )}
    </View>
    
    </>
    
  )
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