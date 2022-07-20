import {useState,useEffect,useContext} from 'react';
import {Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Colors} from './costants/colors';
import {SplashScreen} from './screens/SplashScreen';
import {Login} from './screens/Login';
import {SignUp} from './screens/SignUp';
import AuthContextProvider, {AuthContext} from './context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Day} from './screens/Day';
import {Calendar} from './screens/Calendar';
import {AddEvent} from './screens/AddEvent';
import {SafeAreaView} from 'react-native-safe-area-context';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons} from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();



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
      barStyle={{ backgroundColor: Colors.primary }}
      activeColor= '#fff'
      inactiveColor={Colors.secondary}
      initialRouteName='Day'
    >
   
     <Tab.Screen
        name="Day"
        component={Day}
        options={{
          title: 'Today',
          tabBarIcon: ({color}) => (
            <Ionicons name="md-today" color={color} size={30} />
          )
        }}
      /> 
       
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          title: "Calendar",
          tabBarIcon: ({color}) => (
            <Ionicons name="md-calendar-outline" size={30} color={color} />
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
    return <Text>App Loading</Text>
  } else {
    return <Navigation />;
  }

}

export default function App() {
  
  return (
    <>
      {/* Use SafeAreaView to avoid the status bar overlapping the content */}
      <StatusBar style="auto" />
     <SafeAreaView style={{flex:1,marginTop:40}}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </SafeAreaView>
    </>
  );
}










