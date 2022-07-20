import {useState,useEffect,useContext} from 'react';
import {Text,StyleSheet,View,ScrollView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {IconButton} from '../components/UI/IconButton';
import {Colors} from '../costants/colors';
import {AuthContext} from '../context/auth-context';
import { Alert } from 'react-native';




export const Calendar = () => {

  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const startDate = selectedStartDate
    ? selectedStartDate.format("YYYY-MM-DD").toString()
    : "";
  
 const authCtx = useContext(AuthContext);

    useEffect(() => {
      (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          const calendars = await Calendar.getCalendarsAsync(
            Calendar.EntityTypes.EVENT
          );
          console.log('Here are all your calendars:');
          console.log({ calendars });
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
      <Text style={styles.dateText}>{startDate}</Text>
      <IconButton
        icon='add'
        size={30}
        color={Colors.primary}
        onPress={(navigation) => {
          navigation.navigate("AddEvent");
        }}
        />
    </View>
   <ScrollView style={styles.events}>
    <Text>
      Eventi del giorno
    </Text>
   </ScrollView>
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
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign : 'center',
    color: Colors.primary,
  },
  events: {
   backgroundColor: '#fff',
  },
  buttonContainer: {
    justifyContent: 'space-between',  
    alignItems: 'center',
    flexDirection: 'row',
    fontSize:18,
    marginTop:1,
  }
});
