import {useContext,useState,useCallback,useEffect} from 'react';
import { StyleSheet, Text, View,Alert, FlatList} from 'react-native';
import { Colors } from '../costants/colors';
import {AuthContext} from '../context/auth-context';
import { IconButton } from '../components/UI/IconButton';
import {clearEvents,getEventsForDate,deleteEvent,editEvent}  from '../util/database';
import { useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {CardComp} from '../components/UI/CardComp';

export const Day = () => {
  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();

 //current date in format YYYY/MM/DD  to be used in database query
  const [selectedDate, setSelectedDate] = useState(new Date());
  const date = selectedDate.toISOString().split('T')[0];

  
  
  const [schedule,setSchedule] = useState([]);

  const [isDeleted,setIsDeleted] = useState(false);

//Retrieve events for current date
useFocusEffect(
  useCallback(() => {
      (async () => {
        const events = await getEventsForDate(date);
        setSchedule(events);
        setIsDeleted(false);
      })();
    }, [isDeleted])
  )
     

 
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
        {/*Icon Button to delete all events*/}
        <IconButton
          icon="md-trash"
          size={30}
          color={Colors.primary}
          onPress={() => {
            {
              /*Alert to confirm delete for today in format 2022/08/01*/
            }
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
        <Text style={styles.date}>{date}</Text>
      </View>

      {/*Create a FlatList with Card */}
        {schedule.length > 0 ? (
          <FlatList
            data={schedule}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({ item }) => (
              <CardComp  hour={item.hour} title={item.title} description={item.description} id={item.id} deleteEventHandler={deleteEventHandler} />

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
   margin:15,
   justifyContent: 'space-between',  
   alignItems: 'center',
   flexDirection: 'row',
   fontSize:20,
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
  }
});