import {StyleSheet,Alert, View} from "react-native";
import {Colors} from "../../costants/colors";
import { Card, Paragraph,Title } from "react-native-paper"; 
import {Ionicons} from "@expo/vector-icons";



export const CardComp = ({hour, title, description,id,deleteEventHandler}) => {
 


    return (
        <>
            <Card style={styles.containerCard}>
                <Card.Content>
                    <View style={styles.flexHourTitle}>
                        <Paragraph style={styles.hour}>{hour}</Paragraph>
                        <Title style={{fontSize:20}}>{title}</Title>
                    </View>
                    <Paragraph style={{fontSize:20,textAlign:'center'}}>{description}</Paragraph>
                </Card.Content> 
                <Card.Actions style={styles.buttons}>
                <Ionicons 
                        name="md-trash" 
                        size={20} 
                        color={Colors.error} 
                         
                         onPress={() => {
                            Alert.alert(
                                "Delete",
                                `Are you sure you want to delete ${title}?`,
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel",
                                    },
                                    {
                                        text: "OK",
                                        onPress: () => deleteEventHandler(id),
                                    },
                                ]
                            );
                        }} />
                </Card.Actions>
            </Card>
        </>
    );
}


const styles = StyleSheet.create({
    containerCard:{
        margin:45,
        marginVertical:20,
        borderRadius: 15,
        width:'78%',
        backgroundColor: Colors.primaryLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    flexHourTitle:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginRight:10,
    },
    hour:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.secondary,
        marginHorizontal: 5,
        },
      title:{
        fontSize:20,
        padding:5,
        fontWeight: "bold",
        color: Colors.secondary,
        
      },
      description:{
        padding: 5,
        fontSize:20,
        marginLeft: 50, 
        textAlign: 'center',
      },
     buttons:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginRight:20,
        marginBottom:10,
        },
})