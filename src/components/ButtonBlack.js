import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ButtonBlack(props) {
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
      backgroundColor: '#393534',
      borderRadius: 20
  },
  textButtonWhite: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#F4F4F4'
  }
})
