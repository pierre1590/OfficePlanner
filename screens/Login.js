import {useState,useContext} from 'react';
import {Text, View, StyleSheet,TextInput,ScrollView,Image,Alert} from 'react-native';
import {Button} from '../components/UI/Button';
import { Formik } from 'formik';
import {AuthContext} from '../context/auth-context';
import * as Yup from 'yup';
import  {login} from '../util/auth';




const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Please enter valid email').required('Email is required').lowercase(),
    password: Yup.string().min(6,({min}) => `Password must be at least ${min} characters`).required('Password is required'),
});


export const Login = ({navigation}) => {
const [isAuthenticating, setIsAuthenticating] = useState(false);

const authCtx = useContext(AuthContext);

return (
  <>
    <ScrollView>
    
    <Formik
      initialValues={{ email: "", password: ""}}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        setIsAuthenticating(true);
        login(values)  
        .then(() => {
         
          const token = login(values);
          authCtx.authenticate(token);  
          
        })
        .catch(() => {
          setIsAuthenticating(false);
          Alert.alert('Invalid email or password');
        });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (

        <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/img/logo.png")} />
          <Text style={styles.labelEmail}>E-mail</Text>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
            placeholder="Enter email..."
            style={styles.email}
            name="email"
          />
          {errors.email && (
            <View style={styles.containerError}>
              <Text style={styles.error}>{errors.email}</Text>
            </View>
          )}
          <Text style={styles.labelPassword}>Password</Text>
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={true}
            placeholder="Enter password..."
            style={styles.password}
            name="password"
          />
          {errors.password && (
            <View style={styles.containerError}>
              <Text style={styles.error}>{errors.password}</Text>
            </View>
          )}
          <View style={styles.buttonLogin}>
              <Button
                mode="flat"
                onPress={handleSubmit}
                android_ripple={{ color: "#ccc" }}
                style={styles.submit}
                disabled={!isValid}
              >
                Login
              </Button>
            </View>
        </View>
      )}
    </Formik>
   
    


      
      <View style={styles.new}>
        <Text style={styles.labelNew}>New?</Text>
        <Button
          mode="flat"
          onPress={() => navigation.navigate("SignUp")}
          android_ripple={{ color: "#ccc" }}
          style={styles.submit}
        >
          Sign Up
        </Button>
      </View>
    </ScrollView>
  </>
);
}

            
    const styles = StyleSheet.create({
        logo:{
            width:180,
            height:180,
            alignSelf:'center',
            marginTop:20,
            marginBottom:20,
            borderRadius: 100,
        },
        container:{
            width:'100%',
            alignSelf:'center',
            marginTop:20,
            marginBottom:15,
            
        },
       email: {
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 10,
            padding: 15,
            margin: 20,
            fontSize:18,
            backgroundColor: '#fff',
        },
        labelEmail: {
            fontSize: 20,
            color: '#fff',
            marginLeft: 25,
            fontWeight: 'bold',
        },
        labelPassword: {
          fontSize: 20,
          color: '#fff',
          marginLeft: 25,
          fontWeight: 'bold',
        },
        new:{
            flexDirection:'row',
            marginTop:15,
            justifyContent:'center',
            alignItems:'center',
            padding: 5,
            margin: 15,
        },
        labelNew:{
          fontSize: 18,
          color: '#fff',
          fontWeight: 'bold',
        },
        password: {
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 10,
            padding: 15,
            margin: 20,
            fontSize: 18,
            backgroundColor: '#fff'
        },
        newCustomer:{
          justifyContent:'center',
          alignItems:'center',
          alignSelf: 'center',
          width: '55%',
          marginTop: 15,
          backgroundColor: '#fff',
          borderRadius: 10,
        },
        textNewCustomer:{
          color: "#000",
          fontSize:15,
          fontWeight: 'bold',
          marginTop: 10,
        },
        signup:{
            alignSelf: 'center',
            elevation: 10,
            shadowColor: '#fff',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
    
        },
        buttonLogin:{
            width:'50%',
            alignSelf:'center',
            marginTop: 3,
    
        },
        containerError:{
          marginTop: 5,
          marginBottom: 10,
          backgroundColor:'#fff',
          borderRadius: 10,
          width: '50%',
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        },
        error:{
         fontSize: 15,
         color: "#f00", 
         textAlign: "center", 
         fontWeight: "bold",
        }
     
    })