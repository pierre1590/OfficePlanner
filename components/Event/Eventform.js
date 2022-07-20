import { useState } from "react";
import { Event } from "../../models/event";
import {Button} from '../../components/UI/Button';

export const EventForm = ({onCreateEvent}) =>  {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [enteredDate, setEnteredDate] = useState("");


    const changeTitleHandler = (title) => {
        setEnteredTitle(title);
    }

    const changeDescriptionHandler = (description) => {
        setEnteredDescription(description);
    }

    const changeDateHandler = (date) => {
        setEnteredDate(date);
    }

    const saveEventHandler = () => {
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredDate.trim().length === 0) {
            return;
        }
        const event = new Event(enteredTitle, enteredDescription, enteredDate);
        onCreateEvent(event);
    }

    return (
        <>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} placeholder="Enter title" value={enteredTitle} onChangeText={changeTitleHandler} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} placeholder="Enter description" value={enteredDescription} onChangeText={changeDescriptionHandler} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date</Text>
                <TextInput style={styles.input} placeholder="Enter date" value={enteredDate} onChangeText={changeDateHandler} />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={saveEventHandler}>Save</Button>
            </View>
        </>
    );
}