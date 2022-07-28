import { useState } from "react";
import { Event } from "../../models/event";
import {Button} from '../../components/UI/Button';
import { View, StyleSheet, Text,TextInput,Alert, ScrollView } from "react-native";
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
   
 
    
   
    const saveEventHandler = async() => {
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 ) {
            Alert.alert("Blank fields","The title and/or description fields are empty.",[
              {text:'OK'},
          ]);
        }
        const event = new Event(enteredTitle, enteredDescription,enteredDate,enteredTime);
        const results = await onCreateEvent(event);
        setEnteredTitle("");
        setEnteredDescription("");  
        console.log(results);
       
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

  // if enteredTitle and enteredDescription are empty the border color is red
   





    
    
      

    return (
      <>
      
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={[styles.input,  styles.inputError]}
              placeholder="Enter title"
              value={enteredTitle}
              onChangeText={changeTitleHandler}
              
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.inputDescription, styles.inputError]}
              placeholder="Enter description"
              value={enteredDescription}
              onChangeText={changeDescriptionHandler}
              multiline
              numberOfLines={10}
             
            />
          </View>
          <View style={styles.inputContainer}>
            <Datepicker enteredDate={enteredDate} setEnteredDate={setEnteredDate} />
          </View>
          <View style={styles.inputContainer}>
            <TimePicker enteredTime={enteredTime} setEnteredTime={setEnteredTime}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={cancelEventHandler} style={styles.cancelBtn}>
              Cancel
            </Button>
            <Button onPress={saveEventHandler} style={styles.sendBtn}>
              Save
            </Button>
          </View>      
        </View>      
      </ScrollView>
      </>
    );
  }

const styles = StyleSheet.create({
    container:{
     backgroundColor: Colors.primaryLight,
    flex: 1,
    },
    form:{
      padding: 20,
      top:50,
    },
    inputContainer:{
        width: '90%',
        height: 80,
        marginBottom: 10,
        padding: 10,
        alignSelf: 'center',
    },
    label:{
        fontSize: 18,
        fontWeight: 'bold',
      },
     input:{
        fontSize: 18,
        padding: 10,
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: Colors.tertiary,
        width: '100%',
    },
    inputDescription:{
      fontSize: 18,
      padding: 10,
      borderWidth: 0,
      borderRadius: 5,
      backgroundColor: '#fff',
      color: Colors.tertiary,
      width: '100%',
      height: '100%',
    },
    buttonContainer:{
        flexDirection: 'row',
        top:10,
        padding: 20,
        margin:15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        
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
    },
    inputError:{
        borderColor: 'red',
        borderWidth: 1.5,
        
    },

})