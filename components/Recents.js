import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

function Recents() {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>This is the Recents Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    body: {
      backgroundColor: 'darkslateblue',
      justifyContent: 'center',
      alignItems:'center',
      height: 120,
    },
    text: {
      color: 'white',
    }
  });

export default Recents
