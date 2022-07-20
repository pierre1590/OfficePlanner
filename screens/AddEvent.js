import { EventForm } from "../components/Event/Eventform";
import { insertEvent } from "../util/database";

export const AddEvent = ({navigation}) => {
    const createEventHandler = async(event) => {
        await insertEvent(event)
        navigation.navigate('Events',{
            event: event
        });
    }

    return <EventForm onCreateEvent={createEventHandler}/>
}