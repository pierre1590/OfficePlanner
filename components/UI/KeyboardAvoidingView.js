import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export const KeyboardAvoidingComponent = ({ children}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollView>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

