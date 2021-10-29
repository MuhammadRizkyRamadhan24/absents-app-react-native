import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import {authRegister} from '../redux/actions/auth';

import ButtonWhite from '../components/ButtonWhite';

class Signup extends Component {
  signup = values => {
    this.props
      .authRegister(values.email, values.name, values.password)
      .then(() => {
        if (this.props.auth.msg !== '') {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: `${this.props.auth.msg}`,
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        } else {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Login success',
            visibilityTime: 800,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          return this.props.navigation.navigate('Login');
        }
      });
  };

  render() {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .min(10, 'Minimal 10 Karakter!')
        .required('Harus diisi!'),
      name: Yup.string().min(5, 'Minimal 5 Karakter!').required('Harus diisi!'),
      password: Yup.string()
        .min(8, 'Minimal 8 Karakter!')
        .required('Harus diisi!!'),
    });
    return (
      <View style={styles.wrapper}>
        <Text style={styles.textTitle}>Signup</Text>
        <Text style={styles.textParagraph}>Signup untuk mendaftar</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: '', name: '', password: ''}}
          onSubmit={values => this.signup(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Masukin email kamu ya!"
                value={values.email}
              />
              {errors.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                keyboardType="ascii-capable"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholder="Masukin nama kamu ya!"
                value={values.name}
              />
              {errors.name ? (
                <Text style={styles.textError}>{errors.name}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Masukin password kamu ya!"
              />
              {errors.password ? (
                <Text style={styles.textError}>{errors.password}</Text>
              ) : null}
              <View style={styles.wrapperButton}>
                <ButtonWhite func={handleSubmit} title={'Daftar'} />
              </View>
            </>
          )}
        </Formik>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authRegister};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FF7314',
    padding: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#F4F4F4',
  },
  textParagraph: {
    fontSize: 20,
    textAlign: 'center',
    color: '#F4F4F4',
    marginBottom: '10%',
  },
  wrapperButton: {
    width: '100%',
    marginTop: '10%',
  },
  input: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    marginVertical: '2%',
    borderRadius: 10,
    paddingLeft: 10,
  },
  textError: {
    color: 'red',
    width: '100%',
  },
});
