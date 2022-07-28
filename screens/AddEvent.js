
import { EventForm } from "../components/Event/Eventform.js";
import { insertEvent } from "../util/database";



export const AddEvent = ({navigation}) => {
    const createEventHandler = async(event) => {
        await insertEvent(event);
        navigation.navigate("Day",{
        event:  event
    });
    }
   
     return  <EventForm onCreateEvent={createEventHandler} />

}