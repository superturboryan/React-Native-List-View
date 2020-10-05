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
    Modal,
    TouchableWithoutFeedback,
} from "react-native";

import DetailView from './DetailView'

const ListView = props => {

    const [ employeeList, setEmployeeList ] = useState( [] )
    const [refresh, setRefresh] = useState(false);

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState({})

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
          setRefresh(false)

        } catch (error) {

          console.error(error);
        }
    };

    const closeModal = () => {
        setModalOpen(false)
    }

    const onRefresh = () => {
        setEmployeeList([])
        fetchEmployeeList()
    }

    const employeeCell = ({ item }) => {
        return (
            <View 
            style={styles.cell}
            onTouchEnd={() => {
                setSelectedEmployee(item)
                setModalOpen(true)
            }}>
                
                <Image 
                style={styles.cellImage}
                source={{
                    uri:item['photo_url_small']
                }} />
                
                <Text style={styles.cellText}>
                    {item['full_name'] + " \n-" + item.team}
                </Text> 

            </View>
        )
    }

    return (

        <SafeAreaView style={styles.container}>

            <Modal 
            visible= {modalOpen}
            animationType={"slide"}>

                <DetailView employee={selectedEmployee} close={closeModal}/>

            </Modal>

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
        padding: 15,
        marginTop:5,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },

    cellImage: {
        height:50,
        width: 50,
        borderRadius: 25,
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