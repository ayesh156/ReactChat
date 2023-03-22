import React from 'react';
import { View,Text,Button,StyleSheet } from 'react-native';

export function M() {

    const ui = (
        <View style={styles.view1}>
            <Text style={styles.text1}>Text 1</Text>
            <Button title="Button 1" />
        </View>
    );

    return ui;

}

const styles = StyleSheet.create(
    {
        view1: {
            flexDirection: 'row',
        },
        text1:{
            color:"red",
            fontSize:20,
        }
    }
)