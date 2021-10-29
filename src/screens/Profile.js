import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {REACT_APP_BASE_URL} from '@env';
import {connect} from 'react-redux';
import {authLogout} from '../redux/actions/auth';

class Profile extends Component {
  logout = () => {
    this.props.authLogout();
  };
  render() {
    console.log(this.props.users.data);
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperProfile}>
          <Text style={styles.textTitle}>Profile</Text>
          <View style={styles.wrapperImage}>
            {this.props.users.data.photo !== null ? (
              <Image
                style={styles.image}
                source={{
                  uri: `${REACT_APP_BASE_URL}/static/images/${this.props.users.data.photo}`,
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
            <View style={styles.wrapperTextProfile}>
              <Text style={styles.textProfileName}>
                {this.props.users.data.name}
              </Text>
              <Text style={styles.textProfileEmail}>
                {this.props.users.data.email}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditProfile')}
            style={styles.buttonAccount}>
            <MaterialCommunityIcons
              name="account-edit"
              size={35}
              color="#FF7314"
            />
            <Text style={styles.textCardAccount}>Ubah Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditPassword')}
            style={styles.buttonAccount}>
            <MaterialCommunityIcons name="lastpass" size={35} color="#FF7314" />
            <Text style={styles.textCardAccount}>Ubah Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logout} style={styles.buttonAccount}>
            <MaterialCommunityIcons
              name="logout-variant"
              size={35}
              color="#FF7314"
            />
            <Text style={styles.textCardAccount}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperProfile: {
    width: '100%',
    backgroundColor: 'white',
    padding: '8%',
  },
  textTitle: {
    color: '#393534',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: '5%',
  },
  wrapperImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 999,
  },
  wrapperTextProfile: {
    width: '75%',
    paddingLeft: '5%',
  },
  textProfileName: {
    color: '#393534',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textProfileEmail: {
    color: '#393534',
    fontSize: 14,
  },
  buttonAccount: {
    flexDirection: 'row',
    paddingHorizontal: '8%',
    backgroundColor: 'white',
    paddingVertical: '5%',
    alignItems: 'center',
    borderRadius: 1,
    borderColor: '#cfcfcf',
    borderWidth: 1,
  },
  textCardAccount: {
    fontSize: 18,
    paddingLeft: '5%',
    fontWeight: 'bold',
    color: '#393534',
  },
  wrapperButton: {
    marginTop: 10,
  },
});
