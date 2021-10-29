import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {REACT_APP_BASE_URL} from '@env';

export default function CardDailyReport(props) {
  return (
    <View style={styles.card}>
      <View style={styles.wrapperTime}>
        <Text style={styles.textTime}>{props.data.date.split('T')[0]}</Text>
      </View>
      <View style={styles.wrapperCardContent}>
        {props.data.photo !== null ? (
          <Image
            style={styles.image}
            source={{
              uri: `${REACT_APP_BASE_URL}/static/images/${props.data.photo}`,
            }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
          />
        )}
        <View style={styles.wrapperCardText}>
          <Text style={styles.textName}>{props.data.name}</Text>
          <Text style={styles.textLate}>{props.data.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },
  wrapperTime: {
    backgroundColor: 'grey',
  },
  textTime: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    paddingVertical: '2%',
  },
  wrapperCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
  },
  wrapperCardText: {
    marginLeft: '5%',
    width: '70%',
  },
  textName: {
    fontWeight: 'bold',
    color: '#393534',
    fontSize: 16,
  },
  textType: {
    fontWeight: '500',
    color: '#393534',
    fontSize: 14,
  },
});
