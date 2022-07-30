import {useContext,useState,useEffect} from 'react';
import { StyleSheet, Text, View,Alert, FlatList} from 'react-native';
import { Colors } from '../costants/colors';
import {AuthContext} from '../context/auth-context';
import { IconButton } from '../components/UI/IconButton';
import { getEvents } from '../util/database';
import { clearEvents } from '../util/database';


export const Day = () => {
  const authCtx = useContext(AuthContext);


 

 //current date in format YYYY-MM-DD
  const date = new Date().toISOString().slice(0,10);
  
  //get events for current date with getEventsForDate
  const [schedule,setSchedule] = useState([] || null);

  //useEffect with try/catch to get events for current date
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const events = await getEvents();
  //       setSchedule(events);
  //     }
  //     catch(err) {
  //       console.log(err);
  //     }
  //   })();
  // }, [date]);

  //useEffect with async/await to get events for current date
useEffect(()=> {
  const getAllEvents = async () => {
    const data = await getEvents(date);
    setSchedule(data);
  }
  getAllEvents();
},[date]);



 //Clear events from database per date
  const clearEventsHandler = async (date) => {
    try {
      await clearEvents(date);
      setSchedule([]);
    }
    catch(err) {
      console.log(err);
    }
  }



  return (
    <>
    <View style={styles.dateContainer}>

    <IconButton
        icon='md-exit-outline'
        size={30}
        color={Colors.primary}
        onPress={() => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => authCtx.logout(),
          },
        ])
      }}
      />
      {/*Icon Button to delete all events*/}
      <IconButton
        icon='md-trash'
        size={30}
        color={Colors.primary}
        onPress={() => {
        Alert.alert('Delete', 'Are you sure you want to delete all events?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => clearEventsHandler(date),
          },
        ])
      }}
      />

      <Text style={styles.date}>{date}</Text>
    </View>
   
    {schedule.length > 0 ? (
      <FlatList
        data={schedule}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.event}>
              <Text style={styles.hour}>{item.hour}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        
      />
    ) : (
      <View style={styles.noEvents}>
        <Text style={styles.noEventsText}>No events</Text>
      </View>
    )}
    </>
  );
}
    
   


const styles = StyleSheet.create({
 dateContainer:{
   marginTop:15,
   margin:15,
   justifyContent: 'space-between',  
   alignItems: 'center',
   flexDirection: 'row',
   fontSize:20,
  },
  date: {
    fontSize: 22,
    marginRight: 50,
    color: Colors.primary,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsContainer:{
    marginTop: 20,
  },
  event:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  description:{
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  hour:{
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  noEvents: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  noEventsText: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});