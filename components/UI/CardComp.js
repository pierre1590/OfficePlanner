import {StyleSheet,Alert,Text, View} from "react-native";
import {Colors} from "../../costants/colors";
import { Card, Paragraph,Title } from "react-native-paper"; 
import {Ionicons} from "@expo/vector-icons";
import {deleteEvent} from "../../util/database";
import {useFocusEffect} from "@react-navigation/native";
import {useCallback} from "react";



export const CardComp = ({hour, title, description,id,deleteEventHandler}) => {
  
 



    return (
        <>
            <Card style={styles.containerCard}>
                <Card.Content>
                    <View style={styles.flexHourTitle}>
                        <Text style={styles.hour}>{hour}</Text>
                        <Title style={styles.title}>{title}</Title>
                    </View>
                    
                    <View style={styles.descriptionView}>
                        <Paragraph style={styles.description}>{description}</Paragraph>
                    </View>
                </Card.Content>
                <Card.Actions style={styles.buttons}>
                    <Ionicons
                        style={{marginRight:10}}
                        name="pencil"
                        size={20}
                        padding={10}
                        onPress={() => {
                            navigation.navigate('EditEvent',id)}
                        }
                    />
                    <Ionicons
                     style={{marginLeft:5,marginRight:10}}
                        padding={10}
                        name="md-trash"
                        size={20}
                        color={Colors.error}
                        onPress={() => {
                            Alert.alert(
                                "Delete",
                    `Are you sure you want to delete "${title}" ?`,
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
                }}
            />
                </Card.Actions>
            </Card>

        </>
    );
}


const styles = StyleSheet.create({
    containerCard:{
        margin:60,
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
        textDecorationLine:'underline',
      },
      descriptionView:{
        flexDirection: 'row', 
      }, 
      description:{
        padding: 5,
        fontSize:19,
        marginLeft: 50, 
        textAlign: 'justify',
      },
      buttons:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginVertical: 5,
      }
})