import { useState } from "react";
import { Event } from "../../models/event";
import {Button} from '../../components/UI/Button';
import { View, StyleSheet, Text,TextInput,Alert } from "react-native";
import { Colors } from "../../costants/colors";
import {useNavigation} from "@react-navigation/native";
import {Datepicker} from "../../components/Datepicker/Datepicker";
import  { TimePicker } from "../../components/Timepicker/Timepicker";

export const EventForm = ({onCreateEvent}) =>  {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [enteredDate, setEnteredDate] = useState(new Date());
    const [enteredTime, setEnteredTime] = useState(new Date());


    const {navigate} = useNavigation();

    const changeTitleHandler = (title) => {
        setEnteredTitle(title);
    }

    const changeDescriptionHandler = (description) => {
        setEnteredDescription(description);
    }
   
    
   
    const saveEventHandler = () => {
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 ) {
            return;
        }
        const event = new Event(enteredTitle, enteredDescription,enteredDate,enteredTime);
        console.log(event);
        onCreateEvent(event);
    }

    //If the user click on Cancel button it return to Day page
    const cancelEventHandler = () => {
      Alert.alert('Cancel', 'Are you sure you want to cancel?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>  {
            navigate('Day'),[
            setEnteredTitle(""),
            setEnteredDescription("")
          ]}
        },
      ]);
    
    


  }  

    
    
    
      

    return (
      <>
        <View style={styles.form}>
        
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              value={enteredTitle}
              onChangeText={changeTitleHandler}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={enteredDescription}
              onChangeText={changeDescriptionHandler}
            />
          </View>
          <View style={styles.inputContainer}>
            <Datepicker enteredDate={enteredDate} />
          </View>
          <View style={styles.inputContainer}>
            <TimePicker enteredTime={enteredTime} />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={cancelEventHandler} style={styles.cancelBtn}>
              Cancel
            </Button>
            <Button onPress={saveEventHandler} style={styles.sendBtn}>
              Save
            </Button>
          </View>
          <View>
       
          </View>
        </View>      
      </>
    );
  }

const styles = StyleSheet.create({
    form:{
       top:25,
        flex:1,
       padding: 20,
        
    },
    inputContainer:{
        width: '90%',
        height: 80,
        marginBottom: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
    },
    label:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input:{
        fontSize: 18,
        padding: 5,
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: Colors.tertiary,
        width: '100%',
    },
    buttonContainer:{
         padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    cancelBtn:{
     
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',  
    },
    sendBtn:{
       
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
       
      
    }
})