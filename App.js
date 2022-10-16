import {useState,useEffect,useContext} from 'react';
import {Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {Colors} from './costants/colors';
import {Login} from './screens/Login';
import {SignUp} from './screens/SignUp';
import AuthContextProvider, {AuthContext} from './context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Day} from './screens/Day';
import {Calendar} from './screens/Calendar';
import {AddEvent} from './screens/AddEvent';
import {EditEvent} from './screens/EditEvent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {init} from './util/database'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// import * as Device from 'expo-device';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldShowAlert: true,
//       shouldPlaySound: false,
//       shouldSetBadge: true,
//     };
//   },
// });



function AuthStack() {
  return (
    <Stack.Navigator 
       screenOptions={{ 
         headerStyle:{backgroundColor:Colors.primary},
         headerTintColor:'#fff',
         contentStyle:{backgroundColor:Colors.secondary}
       }}
    >
      <Stack.Screen name="Login" component={Login} options={{
        headerShown:false,

      }}/>
      <Stack.Screen name="SignUp"  component={SignUp} options={{
        headerShown:false,
      }} />
    </Stack.Navigator>
  );
}


function AuthenticatedStack() {
 
  return (
   
    <Tab.Navigator
      barStyle={{ 
        backgroundColor: Colors.primary, 
        borderRadius:50,
        }}
      activeColor= '#fff'
      inactiveColor={Colors.secondary}
      initialRouteName='Day'
      shifting={true}
    >
      
    



  
   
     <Tab.Screen
        name="Day"
        component={Day}
        options={{
          title: 'Today',
          tabBarIcon: ({color}) => (
            <Ionicons name="md-today" color={color} size={28} />
          )
        }}
      /> 


<Tab.Screen
        name="Add Event"
        component={AddEvent}
        options={{
          marginTop: 15,
          title: "Add Event",
          tabBarIcon: ({color}) => (
            <Ionicons name="md-add-circle-outline" size={28} color={color} />
          ),
        }}
      />

       
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          marginTop: 15,
          title: "Calendar",
          tabBarIcon: ({color}) => (
            <Ionicons name="md-calendar-outline" size={28} color={color} />
          ),
        }}
      />

      


       
    </Tab.Navigator>
    
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  
  return (
    <>
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
    </>
  );
} 

  

      
     
  

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await  AsyncStorage.getItem('token');
       
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
    
      setIsTryingLogin(false);
    }
    
    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  } else {
    return <Navigation />;
  }

}

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

// useEffect to init setDbInitialized to true and register for push notifications
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // registerForPushNotificationsAsync().then((token) =>
    //   setExpoPushToken(token)
    // );
  }, []);


 
 
  // const registerForPushNotificationsAsync = async () => {
  //   let token;
  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  
  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }
  //     return token;
  // };
  

if(!dbInitialized) {
  return  <AppLoading />;
}





  return (
    <>
      {/* Use SafeAreaView to avoid the status bar overlapping the content */}
      <StatusBar style='auto'/>
     <SafeAreaView style={{flex:1,marginTop:40}}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </SafeAreaView>
    </>
  );
}










