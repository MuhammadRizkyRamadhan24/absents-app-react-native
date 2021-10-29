import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {REACT_APP_BASE_URL} from '@env';
import {connect} from 'react-redux';
import {getUserById, changeUser} from '../redux/actions/users';
import ButtonOrange from '../components/ButtonOrange';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Harus Diisi!'),
  email: Yup.string().email('Email tidak valid!').required('Harus Diisi!'),
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      pictureUri: '',
      birth_date: '',
      isUpdate: false,
      isDatePickerVisible: false,
    };
  }

  setStateBirth = () => {
    const newDate = new Date(`${this.props.users.data.birth_date}`);
    const year = newDate.getFullYear();
    const autoMonth =
      newDate.getMonth() + 1 < 10
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`;
    const autoDate =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    const final = `${year}-${autoMonth}-${autoDate}`;
    this.setState({
      birth_date: final,
    });
  };

  componentDidMount() {
    this.setStateBirth();
  }

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = dates => {
    const parse = Date.parse(dates);
    const newDate = new Date(parse);
    const year = newDate.getFullYear();
    const autoMonth =
      newDate.getMonth() + 1 < 10
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`;
    const autoDate =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    const final = `${year}-${autoMonth}-${autoDate}`;
    this.setState({
      birth_date: final,
    });
    this.hideDatePicker();
  };

  selectPicture = e => {
    if (!e.didCancel) {
      const maxSize = 1024 * 1024 * 2;
      if (e.assets[0].fileSize > maxSize) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'File to large!',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          photo: null,
          pictureUri: '',
        });
      } else {
        this.setState({
          pictureUri: e.assets[0].uri,
          photo: e.assets[0],
        });
      }
    }
  };

  setPicture = () => {
    Alert.alert('Select Picture', 'Please choose a picture', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Gallery',
        onPress: () => launchImageLibrary({quality: 0.5}, this.selectPicture),
      },
      {
        text: 'Camera',
        onPress: () => launchCamera({quality: 0.5}, this.selectPicture),
      },
    ]);
  };

  alertEdit = values => {
    Alert.alert('Update Profile', 'Do you want to Update?', [
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
    if (this.state.photo === null) {
      const data = {
        name: values.name,
        email: values.email,
        birth_date: this.state.birth_date,
      };
      this.props.changeUser(token, data).then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Success update data!',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.props.navigation.navigate('Dashboard');
      });
    } else {
      const data = {
        name: values.name,
        email: values.email,
        birth_date: this.state.birth_date,
        photo: this.state.photo,
      };
      this.props.changeUser(token, data).then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Success update data!',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.props.navigation.navigate('Dashboard');
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {token} = this.props.auth;
    if (prevState.isUpdate !== this.state.isUpdate) {
      this.props.getUserById(token);
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: `${this.props.users.data.name}`,
            email: `${this.props.users.data.email}`,
          }}
          onSubmit={values => this.alertEdit(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <ScrollView contentContainerStyle={styles.wrapperInput}>
                <View style={styles.wrapperImage}>
                  {this.props.users.data.photo === null ? (
                    <Image
                      style={styles.photo}
                      source={
                        this.state.pictureUri === ''
                          ? {
                              uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                            }
                          : {
                              uri: this.state.pictureUri,
                            }
                      }
                    />
                  ) : (
                    <Image
                      style={styles.photo}
                      source={
                        this.state.pictureUri === ''
                          ? {
                              uri: `${REACT_APP_BASE_URL}/static/images/${this.props.users.data.photo}`,
                            }
                          : {
                              uri: this.state.pictureUri,
                            }
                      }
                    />
                  )}
                  <TouchableOpacity onPress={this.setPicture}>
                    <Text style={styles.textImage}>
                      Perbarui Foto Profile (Max 2MB)
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.textLabel}>Nama Lengkap</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="ascii-capable"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Edit Nama Lengkap"
                  value={values.name}
                />
                {errors.name ? (
                  <Text style={styles.textError}>{errors.name}</Text>
                ) : null}
                <Text style={styles.textLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Edit email"
                  value={values.email}
                />
                {errors.email ? (
                  <Text style={styles.textError}>{errors.email}</Text>
                ) : null}
                <Text style={styles.textLabel}>Tanggal Lahir</Text>
                <View style={styles.wrapperDate}>
                  <Text style={styles.date}>{this.state.birth_date}</Text>
                  <TouchableOpacity
                    title="Show Date Picker"
                    onPress={this.showDatePicker}>
                    <MaterialIcons
                      name="calendar-today"
                      color="#000"
                      size={30}
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                  />
                </View>
              </ScrollView>
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

const mapDispatchToProps = {getUserById, changeUser};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
  },
  wrapperInput: {
    width: '100%',
    textAlign: 'center',
  },
  wrapperButton: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: '5%',
  },
  button: {
    backgroundColor: '#440A67',
    width: '100%',
    height: 60,
    marginBottom: '10%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: 'red',
    fontFamily: 'Roboto-Bold',
  },
  textButton: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 15,
  },
  textLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginTop: 10,
  },
  wrapperImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 20,
  },
  textImage: {
    marginLeft: 15,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },
  input: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    marginVertical: '2%',
    borderRadius: 10,
    paddingLeft: 10,
  },
  wrapperDate: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    marginVertical: '2%',
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: 'black',
    width: '85%',
  },
});
