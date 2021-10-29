import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonOrange from '../components/ButtonOrange';
import CardAbsent from '../components/CardAbsent';
import {connect} from 'react-redux';
import {getUserById} from '../redux/actions/users';
import {getAbsentAllPegawai, absent} from '../redux/actions/absents';

class Absent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      page: 1,
    };
  }

  absentMasuk = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      const {token} = this.props.auth;
      const masuk = 'masuk';
      const date = new Date();
      const autoMonth =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      const autoDate =
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      const autoHours =
        date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
      const autoMinutes =
        date.getMinutes() < 10
          ? `0${date.getMinutes()}`
          : `${date.getMinutes()}`;
      const autoSeconds =
        date.getSeconds() < 10
          ? `0${date.getSeconds()}`
          : `${date.getSeconds()}`;
      const dateFinal = `${date.getFullYear()}-${autoMonth}-${autoDate} ${autoHours}:${autoMinutes}:${autoSeconds}`;
      this.props.absent(token, masuk, dateFinal).then(() => {
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
            text2: 'Absent success',
            visibilityTime: 800,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Absen Maksimal jam 12 Siang',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  absentPulang = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 16) {
      const {token} = this.props.auth;
      const pulang = 'pulang';
      const date = new Date();
      const autoMonth =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      const autoDate =
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      const autoHours =
        date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
      const autoMinutes =
        date.getMinutes() < 10
          ? `0${date.getMinutes()}`
          : `${date.getMinutes()}`;
      const autoSeconds =
        date.getSeconds() < 10
          ? `0${date.getSeconds()}`
          : `${date.getSeconds()}`;
      const dateFinal = `${date.getFullYear()}-${autoMonth}-${autoDate} ${autoHours}:${autoMinutes}:${autoSeconds}`;
      this.props.absent(token, pulang, dateFinal).then(() => {
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
            text2: 'Absent success',
            visibilityTime: 800,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Jam Pulang pukul 16:00',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  getUser = () => {
    const {token} = this.props.auth;
    this.props.getUserById(token).then(() => {
      this.setState({
        loading: false,
      });
    });
  };

  getDataByManajer = () => {
    const {token} = this.props.auth;
    this.props.getUserById(token).then(() => {
      const {page} = this.state;
      const newDate = new Date();
      const autoMonth =
        newDate.getMonth() + 1 < 10
          ? `0${newDate.getMonth() + 1}`
          : `${newDate.getMonth() + 1}`;
      this.props.getAbsentAllPegawai(token, autoMonth, page).then(() => {
        this.setState({
          loading: false,
          data: this.props.absents.data,
        });
      });
    });
  };

  loadMoreAbsent = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const {page} = this.state;
        const newDate = new Date();
        const autoMonth =
          newDate.getMonth() + 1 < 10
            ? `0${newDate.getMonth() + 1}`
            : `${newDate.getMonth() + 1}`;
        this.props.getAbsentAllPegawai(token, autoMonth, page).then(() => {
          this.setState({
            data: this.state.data.concat(this.props.absents.data),
          });
        });
      },
    );
  };

  componentDidMount() {
    // const {navigation} = this.props;
    // this.focusListener = navigation.addListener('focus', async () => {
    const {privileges} = this.props.auth;
    if (privileges === 'manajer') {
      this.getDataByManajer();
    } else {
      this.getUser();
    }
    // });
  }

  render() {
    return (
      <>
        {this.state.loading === false ? (
          <>
            {this.props.auth.privileges === 'pegawai' && (
              <View style={styles.wrapper}>
                <View style={styles.wrapperTitle}>
                  <Text style={styles.textTitle}>Absen</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('HistoryAbsents')
                    }>
                    <MaterialCommunityIcons
                      name="history"
                      size={35}
                      color="#FF7314"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.wrapperButton}>
                  <Text style={styles.textButton}>Masuk</Text>
                  <ButtonOrange func={this.absentMasuk} title="Absen Masuk" />
                  <Text style={styles.textButton}>Pulang</Text>
                  <ButtonOrange func={this.absentPulang} title="Absen Pulang" />
                </View>
              </View>
            )}
            {this.props.auth.privileges === 'manajer' && (
              <View style={styles.wrapperManajer}>
                <View style={styles.wrapperHeaderManajer}>
                  <Text style={styles.textTitleManajer}>
                    Absen Pegawai Bulan Ini
                  </Text>
                </View>
                <View style={styles.wrapperContentManajer}>
                  <FlatList
                    style={styles.wrapperCard}
                    scrollEnabled={true}
                    keyExtractor={item => item.id}
                    data={this.state.data}
                    renderItem={({item}) => <CardAbsent data={item} />}
                    onEndReached={this.loadMoreAbsent}
                    onEndReachedThreshold={0}
                  />
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.wrapperLoading}>
            <ActivityIndicator size="large" color="#FF7314" />
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  absents: state.absents,
});

const mapDispatchToProps = {getUserById, getAbsentAllPegawai, absent};

export default connect(mapStateToProps, mapDispatchToProps)(Absent);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: '8%',
  },
  wrapperLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#393534',
    width: '90%',
  },
  wrapperButton: {
    flex: 1,
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393534',
    paddingVertical: '5%',
  },

  wrapperManajer: {
    flex: 1,
  },
  wrapperCard: {
    width: '100%',
    height: '70%',
  },
  textTitleManajer: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#393534',
    textAlign: 'center',
  },
  wrapperHeaderManajer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperContentManajer: {
    flex: 8,
  },
});
