import React, {useState} from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Home } from './Home';
import { Chat } from './Chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {

    async function checkUser() {
        const user = await AsyncStorage.getItem("user");

        return user;
    }

    checkUser();

    const ui = (
        <NavigationContainer>
        <Stack.Navigator initialRouteName={checkUser!=null?"Home":"Sign In"}>
            <Stack.Screen name='Sign In' component={SignIn} />
            <Stack.Screen name='Sign Up' component={SignUp} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
    </NavigationContainer>
    );
    return ui;

}

export default App;
