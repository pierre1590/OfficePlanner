import {View} from 'react-native';
import { EventForm } from "../components/Event/Eventform.js";
import { KeyboardAvoidingComponent } from '../components/UI/KeyboardAvoidingView.js';
import { insertEvent } from "../util/database";



export const AddEvent = ({navigation}) => {



    const createEventHandler = async(event) => {
        await insertEvent(event)
        navigation.navigate('Events',{
            event: event
        });
    }

    return( 
    <>
        <View>
            <KeyboardAvoidingComponent>
                <EventForm onCreateEvent={createEventHandler}/>
            </KeyboardAvoidingComponent>
        </View>
    </>
    )
}