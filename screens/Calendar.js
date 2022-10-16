import {useState,useEffect,useContext,useCallback} from 'react';
import {Text,StyleSheet,View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import {IconButton} from '../components/UI/IconButton';
import {Colors} from '../costants/colors';
import {AuthContext} from '../context/auth-context';
import { Alert } from 'react-native';
import { getEventsForDate,deleteEvent } from '../util/database';
import {CardComp} from '../components/UI/CardComp';




export const Calendar = () => {
  //setup startDate to current date
    const [selectedStartDate, setSelectedStartDate] = useState(startDate);
    const startDate = selectedStartDate
      ? selectedStartDate.toISOString().split('T')[0]
      : "";  
   const authCtx = useContext(AuthContext);
  
   const [schedule,setSchedule] = useState([] || '');
   const [isDeleted,setIsDeleted] = useState(false);
   
  
   
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
  
      //Retrieve events for current date and order them by time with useFocusEffect
      useFocusEffect(
        useCallback(() => {
          const loadEvents = async () => {
            try{
            const events = await getEventsForDate(startDate);
            setSchedule(events);
            setIsDeleted(false);
            }
            catch(err) {
              console.log(err);
            }
          }
          loadEvents();
        },[startDate,isDeleted])
      )




     // useEffect to show events in the calendar for selected date
      // useEffect(() => {
      //   const fetchData = async () => {
      //     try {
      //       const events = await getEventsForDate(startDate);
      //       setSchedule(events);
      //       setIsDeleted(false);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      //   fetchData();
      // }, [startDate,isDeleted]);


  
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
        <View style={styles.container}>
          <View>
            <CalendarPicker
              onDateChange={setSelectedStartDate}
              previousTitleStyle={styles.previousTitleStyle}
              nextTitleStyle={styles.nextTitleStyle}
              selectedDayColor={Colors.tertiary}
              selectedDayTextColor={Colors.classic}
              selectedDayTextStyle={styles.selectedDay}
              textStyle={styles.textStyle}
              monthTitleStyle={styles.monthTitle}
              yearTitleStyle={styles.yearTitle}
              width={350}
              todayBackgroundColor={Colors.secondary}
              todayTextStyle={styles.todayText}
            />
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

          {/* Show the events for selected date width CardComp */}
          {schedule.length > 0 ? (
            
              <FlatList
              style={styles.cardContainer}
                data={schedule}
                keyExtractor={( index) => index.toString()}
                renderItem={({ item }) => (
                  <CardComp
                    title={item.title}
                    description={item.description}
                    hour={item.hour}
                    id={item.id}
                    deleteEventHandler={deleteEventHandler}
                  />
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
    padding: 10,
    margin: 10,
   
    borderRadius: 10,
  },
  cardContainer: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    borderBottom:20,
    
  },
  previousTitleStyle: {
    fontSize: 18,
    margin:10,
    fontWeight: "bold",
    color: Colors.primary,
  },
  nextTitleStyle: {
    fontSize: 18,
    margin:10,
    fontWeight: "bold",
    color: Colors.primary,
  },
  textStyle: {
    fontSize: 18,
    color: Colors.secondary,
  },
  monthTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  yearTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  selectedDay: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  todayText: {
    color: Colors.classic,
    fontSize: 18,
    fontWeight: 'bold',
   
  },
  dateText: {
    margin: 5,
    marginRight:100,
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign : 'center',
    color: Colors.primary,
  },
  buttonContainer: {
    justifyContent: 'space-between',  
    alignItems: 'center',
    flexDirection: 'row',
    fontSize:18,
    marginLeft:18,
  },
  
  noEvents: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  noEventsText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.secondary,
  }
});
