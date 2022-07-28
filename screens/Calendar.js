import {useState,useEffect,useContext} from 'react';
import {Text,StyleSheet,View, FlatList} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {IconButton} from '../components/UI/IconButton';
import {Colors} from '../costants/colors';
import {AuthContext} from '../context/auth-context';
import { Alert } from 'react-native';
import { getEvents } from '../util/database';





export const Calendar = () => {
//setup startDate to current date
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const startDate = selectedStartDate
    ? selectedStartDate.format("YYYY-MM-DD").toString()
    : "";  
 const authCtx = useContext(AuthContext);

 const [schedule,setSchedule] = useState([] || '');

 const date = new Date().toISOString().slice(0,10);
 
    useEffect(() => {
      (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          const calendars = await Calendar.getCalendarsAsync(
            Calendar.EntityTypes.EVENT
          );
          console.log(calendars);

        }
      })();
    }, []);

    useEffect(()=> {
      const getAllEvents = async () => {
        const data = await getEvents(date);
        setSchedule(data);
      }
      getAllEvents();
    },[date]);
  

    

  return (
    <>
      <View style={styles.container}>
        <View>
          <CalendarPicker onDateChange={setSelectedStartDate} />
        </View>
        <View style={styles.buttonContainer}>
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
          <Text style={styles.dateText}>{startDate}</Text>
        </View>
        {schedule.length > 0 ? (
      <FlatList
      style={styles.events}
        data={schedule}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.event}>
              
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
   
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  dateText: {
    margin: 5,
    marginRight:100,
    fontSize: 23,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign : 'center',
    color: Colors.primary,
  },
  events: {
   borderRadius: 2,
   backgroundColor: Colors.grey,
  },
  buttonContainer: {
    justifyContent: 'space-between',  
    alignItems: 'center',
    flexDirection: 'row',
    fontSize:18,
    marginTop:1,
  },
  event:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 60,
    marginBottom: 15,
    marginTop: 15,
    width: '70%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.classic,
  },
  description:{
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,

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
