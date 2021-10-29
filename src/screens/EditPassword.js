import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {getUserById, changePass} from '../redux/actions/users';
import {authLogout} from '../redux/actions/auth';
import ButtonOrange from '../components/ButtonOrange';

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Minimal 8 karakter!').required('Harus Diisi!'),
  newPassword: Yup.string()
    .min(8, 'Minimal 8 karakter!')
    .required('Harus Diisi!'),
});

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
    };
  }

  alertEdit = values => {
    Alert.alert('Update Password', 'Do you want to Update?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => this.edit(values),
      },
    ]);
  };

  edit = values => {
    const {token} = this.props.auth;
    this.props
      .changePass(token, values.password, values.newPassword)
      .then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Success update password!',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.props.authLogout();
      });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            password: '',
            newPassword: '',
          }}
          onSubmit={values => this.alertEdit(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <View style={styles.wrapperInput}>
                <Text style={styles.textLabel}>Password Saat Ini</Text>
                <TextInput
                  keyboardType="ascii-capable"
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Isi Password saat ini"
                  value={values.password}
                />
                {errors.password ? (
                  <Text style={styles.textError}>{errors.password}</Text>
                ) : null}
                <Text style={styles.textLabel}>Password Baru</Text>
                <TextInput
                  keyboardType="ascii-capable"
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  placeholder="Isi Password Baru"
                  value={values.newPassword}
                />
                {errors.newPassword ? (
                  <Text style={styles.textError}>{errors.newPassword}</Text>
                ) : null}
              </View>
              <View style={styles.wrapperButton}>
                <ButtonOrange title={'Simpan'} func={handleSubmit} />
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
  users: state.users,
});

const mapDispatchToProps = {getUserById, changePass, authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
  },
  wrapperInput: {
    width: '100%',
    textAlign: 'center',
    flex: 1,
  },
  wrapperButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: '5%',
  },
  textError: {
    color: 'red',
    fontFamily: 'Roboto-Bold',
  },
  textButton: {
    color: '#fff',
    fontSize: 15,
  },
  textLabel: {
    fontSize: 12,
    marginTop: 20,
  },
  wrapperImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 20,
  },
  textImage: {
    marginLeft: 15,
    fontSize: 15,
  },
  input: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    marginVertical: '2%',
    borderRadius: 10,
    paddingLeft: 10,
  },
});
