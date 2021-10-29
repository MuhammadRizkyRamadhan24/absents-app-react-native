import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ButtonWhite(props) {
  return (
    <>
      <TouchableOpacity onPress={props.func} style={styles.containerButtonWhite}>
        <Text style={styles.textButtonWhite}>{props.title}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  containerButtonWhite: {
      padding: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4F4F4',
      borderRadius: 20
  },
  textButtonWhite: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#393534'
  }
})
