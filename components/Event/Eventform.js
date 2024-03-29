import { useState } from "react";
import { Event } from "../../models/event";
import {Button} from '../../components/UI/Button';
import { View, StyleSheet, Text,TextInput,Alert, ScrollView,Switch } from "react-native";
import { Colors } from "../../costants/colors";
import {useNavigation} from "@react-navigation/native";
import {Datepicker} from "../../components/Datepicker/Datepicker";
import  { TimePicker } from "../../components/Timepicker/Timepicker";
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});



export const EventForm = ({onCreateEvent}) =>  {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [enteredDate, setEnteredDate] = useState(new Date());
    const [enteredTime, setEnteredTime] = useState(new Date());
    const [withAlert, setWithAlert]  = useState(false);
   


    const {navigate} = useNavigation();

    const changeTitleHandler = (title) => {
        setEnteredTitle(title);
    }

    const changeDescriptionHandler = (description) => {
        setEnteredDescription(description);
    }
   
   
    

    const saveEventHandler = async() => {
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 ) {
            Alert.alert("Blank fields","The title and / or description fields are empty.",[
              {text:'OK'},
          ]);
        }else {
        const event = new Event(enteredTitle, enteredDescription,enteredDate,enteredTime);
        const results = await onCreateEvent(event);
        if (withAlert) {
          await scheduleEventNotification(event);
        }
        setEnteredTitle("");
        setEnteredDescription("");  
        navigate('Day');
        console.log(results);
        }
    }

    // Schedule event for date and hour
    const scheduleEventNotification = async (event) => {
      // Set up trigger to show event of a Day
    const date = new Date(event.date);
    const hours = event.hour.getHours() < 10 ? '0' + event.hour.getHours() : event.hour.getHours();
    const minutes = event.hour.getMinutes() < 10 ? '0' + event.hour.getMinutes() : event.hour.getMinutes();
    // time interval must be greater than 0
   
    const timeInterval = new Date(date.setHours(hours,minutes,0,0));
    console.log(timeInterval);
    if (timeInterval.getTime() > new Date().getTime()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: event.title,
          body: event.description,
          sound: "sound.wav",
        },
        trigger: {
          date,
          timeInterval
        },
      });
    }else {
      Alert.alert("Invalid date","The date and / or time is invalid.",[
        {text:'OK'},
    ]);
    }
    }

      // try {
      //   await Notifications.scheduleNotificationAsync({
      //     content: {
      //       title: "Office Planner",
      //       body: event.description,
      //       sound: "sound.wav",
      //     },
      //     trigger: {
      //      date,
      //      timeInterval,
      //     },
      //   });
      //   console.log("Notification scheduled");
        
      // } catch (e) {
      //   Alert.alert('Event notification error', e.message);
      // }
   


    

  
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
        <ScrollView style={styles.container}>
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
                style={styles.inputDescription}
                placeholder="Enter description"
                value={enteredDescription}
                onChangeText={changeDescriptionHandler}
                multiline
                numberOfLines={10}
              />
            </View>
            <View style={styles.inputContainer}>
              <Datepicker
                enteredDate={enteredDate}
                setEnteredDate={setEnteredDate}
              />
            </View>
            <View style={styles.inputContainer}>
              <TimePicker
                enteredTime={enteredTime}
                setEnteredTime={setEnteredTime}
              />
            </View>
            <View style={styles.inputContainerAlert}>
              <View>
                <Text style={styles.label}>Alert</Text>
                <Text style={styles.textAlert}>
                  You will receive an alert at the {'\n '}time you set the reminder.
                </Text>
              </View>
              <Switch
                value={withAlert}
                onValueChange={(value) => {
                  setWithAlert(value);
                }}
              />
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
        backgroundColor: Colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',  
    },
    sendBtn:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: Colors.secondary,
    },
    inputContainerAlert: {
      flexDirection: 'row',
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    textAlert: {
      fontSize: 14,
      color: Colors.secondary,
    },
})