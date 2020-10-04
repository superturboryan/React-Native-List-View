import React from 'react';
import { View, StyleSheet, } from 'react-native';

import ListView from './app/screens/ListView'

export default function App() {
  return (
    <View style={styles.container}>

      <ListView />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
 