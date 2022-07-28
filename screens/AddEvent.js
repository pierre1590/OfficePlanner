import { EventForm } from "../components/Event/Eventform.js";
import  {insertEvent}  from "../util/database";



export const AddEvent = () => {
    const createEventHandler = async(event) => {
        await insertEvent(event);
    }
   
     return  <EventForm onCreateEvent={createEventHandler} />

}