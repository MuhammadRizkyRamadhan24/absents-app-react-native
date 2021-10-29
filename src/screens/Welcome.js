import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import ButtonWhite from '../components/ButtonWhite';
import ButtonBlack from '../components/ButtonBlack';

export default class Welcome extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.textTitle}>Welcome</Text>
        <Text style={styles.textParagraph}>Selamat datang di aplikasi absen</Text>
        <View style={styles.wrapperButton}>
            <ButtonWhite func={() => this.props.navigation.navigate('Login')} title={'Login'} />
        </View>
        <View style={styles.wrapperButton}>
        <ButtonBlack func={() => this.props.navigation.navigate('Signup')} title={'Signup'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#FF7314',
        padding: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#F4F4F4'
    },
    textParagraph: {
        fontSize: 20,
        textAlign: 'center',
        color: '#F4F4F4',
        marginBottom: '5%'
    },
    wrapperButton: {
        width: '100%',
        marginVertical: '2%'
    },
})