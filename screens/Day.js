import {useContext} from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { Colors } from '../costants/colors';
import {AuthContext} from '../context/auth-context';
import { IconButton } from '../components/UI/IconButton';

export const Day = () => {
  const authCtx = useContext(AuthContext);

 //current date in format YYYY-MM-DD
  const date = new Date().toISOString().slice(0,10);


  return (
    <>
    <View style={styles.dateContainer}>
    <IconButton
        icon='md-exit-outline'
        size={30}
        color={Colors.primary}
        onPress={() => authCtx.logout()}
      />
      <Text style={styles.date}>{date}</Text>
      <IconButton
        icon='add'
        size={30}
        color={Colors.primary}

        />
    </View>
    <ScrollView style={styles.eventsContainer}>
      <Text>Eventi del giorno</Text>
      
    </ScrollView>
   
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
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsContainer:{
    marginTop: 20,
  },
});