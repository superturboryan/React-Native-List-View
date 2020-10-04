import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef} from "react";
import { 
    Dimensions,
    SafeAreaView,
    View, 
    Image,
    Text,
    StyleSheet, 
    FlatList,
} from "react-native";

const ListView = props => {

    const [ employeeList, setEmployeeList ] = useState( [] )
    const [refresh, setRefresh] = useState(false);

    const flatListRef = useRef(null);

    useEffect(() => {
        fetchEmployeeList()
    }, [])

    const fetchEmployeeList = async () => {
        setRefresh(true)
        console.log("Loading employee list json")
        try {
          let response = await fetch(
            'https://s3.amazonaws.com/sq-mobile-interview/employees.json'
          );
          
          let json = await response.json();
        //   console.log("Loaded list!", json.employees)
          
          setEmployeeList(json.employees)

          setTimeout(()=>{
            setRefresh(false)
          }, 500)
        
        } catch (error) {

          console.error(error);
        }
    };

    const onRefresh = () => {
        setEmployeeList([])
        fetchEmployeeList()
    }

    const employeeCell = ({ item }) => {
        return (
            <View style={styles.cell}>
                
                <Image 
                style={styles.cellImage}
                source={{
                    uri:item['photo_url_small']
                }} />
                
                <Text style={styles.cellText}>
                    {item['full_name'] + " - " + item.team}
                </Text> 
            </View>
        )
    }

    return (

        <SafeAreaView style={styles.container}>

            <FlatList 
            style={styles.list}
            renderItem={employeeCell}
            keyExtractor={(item) => item.uuid}
            data={employeeList}
            ref={flatListRef}
            refreshing={refresh}
            onRefresh={() => onRefresh()}
            />

            <StatusBar style="dark" />

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
        
    container: {
        flex: 1,
    },

    list: {
        flex: 1,
        width: Dimensions.get('screen').width,
        alignContent:"flex-start",
        backgroundColor:"darkgrey"
    },

    cell: {
        backgroundColor:"lightgrey",
        padding: 20,
        marginTop:5,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },

    cellImage: {
        height:50,
        width: 50,
    },

    cellText: {
        textAlign:"left",
        marginLeft:20,
    }
});

export default ListView;

// Employee {
//     "biography",
//     "email_address",
//     "employee_type",
//     "full_name",
//     "phone_number",
//     "photo_url_large",
//     "photo_url_small",
//     "team",
//     "uuid",
//   }