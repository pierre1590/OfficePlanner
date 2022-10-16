import {useContext,useState,useCallback} from 'react';
import { StyleSheet, Text, View,Alert, FlatList} from 'react-native';
import { Colors } from '../costants/colors';
import {AuthContext} from '../context/auth-context';
import { IconButton } from '../components/UI/IconButton';
import {clearEvents,getEventsForDate,deleteEvent}  from '../util/database';
import { useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {CardComp} from '../components/UI/CardComp';

export const Day = () => {
  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();


  const [selectedDate, setSelectedDate] = useState(new Date());
  const date = selectedDate.toISOString().split('T')[0];

  
  
  const [schedule,setSchedule] = useState([]);
  const [isDeleted,setIsDeleted] = useState(false);


//Retrieve events for current date and order them by time 
  useFocusEffect(
    useCallback(() => {
      const loadEvents = async () => {
        const events = await getEventsForDate(date);
        setSchedule(events);
      }
      loadEvents();
    },[isDeleted])
  );

 



 
 //Clear schedule from database per date
  const clearSchedule = async () => { 
    try {
      await clearEvents(date)
      .then(()=>setIsDeleted(true));
      setSchedule([]);
      setIsDeleted(true);
    }
    catch(err) {
      console.log(err);
    }
  }

 //Function to delete single event with id
  const deleteEventHandler = async (id) => {
    try {
      await deleteEvent(id);
      setIsDeleted(true);
    }
    catch(err) {
      console.log(err);
    }
  }

 



  return (
    <>
      <View style={styles.dateContainer}>
        <IconButton
          icon="md-exit-outline"
          size={30}
          color={Colors.primary}
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => authCtx.logout(),
              },
            ]);
          }}
        />
       <Text style={styles.date}>{date}</Text>

        {/*Icon Button to delete all events*/}
        <IconButton
          icon="md-trash"
          size={30}
          
          color={Colors.error}
          onPress={() => {
           
            Alert.alert(
              "Delete",
              `Are you sure you want to delete all events of ${date}?`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => clearSchedule(date),
                },
              ]
            );
          }}
        />
       
      </View>

      {/*Create a FlatList with Card */}
        {schedule.length > 0 ? (
          <FlatList
            data={schedule}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({ item }) => (
              <CardComp  hour={item.hour} title={item.title} description={item.description} id={item.id} deleteEventHandler={deleteEventHandler}   />
            )}
          />
        ) : (
          <View style={styles.noEvents}>
            <Text style={styles.noEventsText}>No events for today</Text>
          </View>
        )}
    </>
  );
}
    
   


const styles = StyleSheet.create({
 dateContainer:{
   marginTop:15,
   marginLeft:20,
   marginRight:15,
   justifyContent: 'space-around',  
   alignItems: 'space-around',
   flexDirection: 'row',
   fontSize:20,
   fontWeight:'bold',
  },
 
  date: {
    fontSize: 28,
    marginRight: 50,
    color: Colors.primary,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsContainer:{
    marginTop: 20,
  },
  noEvents: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    padding: 15,
  },
  noEventsText: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    color: Colors.secondary,
  },
  
});