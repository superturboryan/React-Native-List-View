import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef} from "react";
import { 
    Dimensions,
    SafeAreaView,
    View, 
    Image,
    Text,
    StyleSheet, 
    Button,
} from "react-native";

const DetailView = props => {

    useEffect(()=> {
        console.log("Viewing " + props.employee['full_name'])
    }, [])

    return (

        <SafeAreaView style={styles.container}>

            <Button 
            title="Close"
            onPress={() => {
                props.close()
            }}/>

            <Image 
            style={styles.image}
            source={{
                uri:props.employee['photo_url_large']
            }} />
                

            <Text>
                {props.employee['full_name']}
            </Text>

            <Text>
                {props.employee['email_address']}
            </Text>

            <Text>
                {props.employee['phone_number']}
            </Text>

            <Text>
                {props.employee['biography']}
            </Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
        
    container: {
        flex: 1,
        alignItems="center"
    },

    image: {
        width: 100,
        height: 100
    },

});

export default DetailView;

