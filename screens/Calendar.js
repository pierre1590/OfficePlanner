import {useState,useEffect,useContext} from 'react';
import {Text,StyleSheet,View, FlatList} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {IconButton} from '../components/UI/IconButton';
import {Colors} from '../costants/colors';
import {AuthContext} from '../context/auth-context';
import { Alert } from 'react-native';





export const Calendar = () => {
//setup startDate to current date
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const startDate = selectedStartDate
    ? selectedStartDate.format("YYYY-MM-DD").toString()
    : "";  
 const authCtx = useContext(AuthContext);

 const [schedule,setSchedule] = useState([] || '');

 

 

  
  
  
  



  

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
        <FlatList
          style={styles.events}
          data={schedule}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDescription}>{item.description}</Text>
              </View>
            );
          }}
        />
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
   backgroundColor: Colors.tertiary,
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
  eventText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  }
});
