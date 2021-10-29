import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonOrange from '../components/ButtonOrange';
import CardDailyReport from '../components/CardDailyReport';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {connect} from 'react-redux';
import {
  getDailyAllPegawaiByDate,
  getDailyAllPegawaiByMonth,
  getDailyAllPegawaiByYear,
  getDailyAllPegawaiByCustom,
  postDaily,
} from '../redux/actions/dailys';

class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      date: '',
      month: '',
      year: '',
      date1: '00',
      month1: '00',
      year1: '0000',
      date2: '00',
      month2: '00',
      year2: '0000',
      page: 1,
      loadBy: '',
      loading: true,
      modalVisible: false,
      isDatePickerVisible1: false,
      isDatePickerVisible2: false,
    };
  }

  showDatePicker1 = () => {
    this.setState({isDatePickerVisible1: true});
  };

  hideDatePicker1 = () => {
    this.setState({isDatePickerVisible1: false});
  };

  showDatePicker2 = () => {
    this.setState({isDatePickerVisible2: true});
  };

  hideDatePicker2 = () => {
    this.setState({isDatePickerVisible2: false});
  };

  handleConfirmFrom = dates => {
    const parse = Date.parse(dates);
    const newDate = new Date(parse);
    const year = newDate.getFullYear();
    const autoMonth =
      newDate.getMonth() + 1 < 10
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`;
    const autoDate =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    this.setState({
      year1: year,
      month1: autoMonth,
      date1: autoDate,
    });
    this.hideDatePicker1();
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
    // const final = `${year}-${autoMonth}-${autoDate}`;
    this.setState({
      year2: year,
      month2: autoMonth,
      date2: autoDate,
    });
    this.hideDatePicker2();
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  postDaily = values => {
    const {token} = this.props.auth;
    this.props.postDaily(token, values.desc).then(() => {
      if (this.props.dailys.msg !== '') {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: `${this.props.dailys.msg}`,
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
          text2: 'Submit success',
          visibilityTime: 800,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return this.props.navigation.navigate('Dashboard');
      }
    });
  };

  getDataFirst = () => {
    const {token} = this.props.auth;
    const {page} = this.state;
    const newDate = new Date();
    const autoDate =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    this.props.getDailyAllPegawaiByDate(token, autoDate, page).then(() => {
      this.setState({
        loading: false,
        data: this.props.dailys.data,
        loadBy: 'first',
      });
    });
  };

  loadMoreFirst = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const {page} = this.state;
        const newDate = new Date();
        const autoDate =
          newDate.getDate() < 10
            ? `0${newDate.getDate()}`
            : `${newDate.getDate()}`;
        this.props.getDailyAllPegawaiByDate(token, autoDate, page).then(() => {
          this.setState({
            data: this.state.data.concat(this.props.dailys.data),
          });
        });
      },
    );
  };

  getDataByMonth = async () => {
    await this.setState({
      page: 1,
    });
    const {token} = this.props.auth;
    const {page} = this.state;
    const month = this.state.month;
    this.props.getDailyAllPegawaiByMonth(token, month, page).then(() => {
      if (this.props.dailys.msg !== '') {
        this.setState({
          loading: false,
          data: [],
          loadBy: 'month',
        });
      } else {
        this.setState({
          loading: false,
          data: this.props.dailys.data,
          loadBy: 'month',
        });
        console.log(this.state.data);
      }
    });
  };

  loadMoreByMonth = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const {page} = this.state;
        console.log(page);
        const month = this.state.month;
        console.log(month);
        this.props.getDailyAllPegawaiByMonth(token, month, page).then(() => {
          this.setState({
            data: this.state.data.concat(this.props.dailys.data),
          });
        });
      },
    );
  };

  getDataByDate = async () => {
    await this.setState({
      page: 1,
    });
    const {token} = this.props.auth;
    const {page} = this.state;
    const date = this.state.date;
    this.props.getDailyAllPegawaiByDate(token, date, page).then(() => {
      if (this.props.dailys.msg !== '') {
        this.setState({
          loading: false,
          data: [],
          loadBy: 'date',
        });
      } else {
        this.setState({
          loading: false,
          data: this.props.dailys.data,
          loadBy: 'date',
        });
      }
    });
  };

  loadMoreByDate = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const {token} = this.props.auth;
        const {page} = this.state;
        const date = this.state.date;
        this.props.getDailyAllPegawaiByDate(token, date, page).then(() => {
          this.setState({
            data: this.state.data.concat(this.props.dailys.data),
          });
        });
      },
    );
  };

  getDataByYear = async () => {
    await this.setState({
      page: 1,
    });
    const {token} = this.props.auth;
    const {page} = this.state;
    const year = this.state.year;
    this.props.getDailyAllPegawaiByYear(token, year, page).then(() => {
      this.setState({
        loading: false,
        data: this.props.dailys.data,
        loadBy: 'year',
      });
    });
  };

  loadMoreByYear = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const {page} = this.state;
        const year = this.state.year;
        this.props.getDailyAllPegawaiByYear(token, year, page).then(() => {
          this.setState({
            data: this.state.data.concat(this.props.dailys.data),
          });
        });
      },
    );
  };

  getDataByCustom = async () => {
    await this.setState({
      page: 1,
    });
    const {token} = this.props.auth;
    const {year1, month1, date1, year2, month2, date2, page} = this.state;
    this.props
      .getDailyAllPegawaiByCustom(
        token,
        year1,
        month1,
        date1,
        year2,
        month2,
        date2,
        page,
      )
      .then(() => {
        this.setState({
          loading: false,
          data: this.props.dailys.data,
          loadBy: 'custom',
        });
      });
  };

  searchYear = modalVisible => {
    this.getDataByYear();
    this.setModalVisible(modalVisible);
  };

  searchMonth = modalVisible => {
    this.getDataByMonth();
    this.setModalVisible(modalVisible);
  };

  searchDate = modalVisible => {
    this.getDataByDate();
    this.setModalVisible(modalVisible);
  };

  searchCustom = modalVisible => {
    this.getDataByCustom();
    this.setModalVisible(modalVisible);
  };

  loadMoreByCustom = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const {year1, month1, date1, year2, month2, date2, page} = this.state;
        this.props
          .getDailyAllPegawaiByCustom(
            token,
            year1,
            month1,
            date1,
            year2,
            month2,
            date2,
            page,
          )
          .then(() => {
            this.setState({
              data: this.state.data.concat(this.props.dailys.data),
            });
          });
      },
    );
  };

  componentDidMount() {
    const {privileges} = this.props.auth;
    if (privileges === 'manajer') {
      this.getDataFirst();
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const validationSchema = Yup.object().shape({
      desc: Yup.string().min(10, 'Minimal 20 Karakter!').required(''),
    });
    const {modalVisible} = this.state;
    return (
      <>
        {this.state.loading === false ? (
          <>
            {this.props.auth.privileges === 'pegawai' && (
              <View style={styles.wrapper}>
                <View style={styles.wrapperTitle}>
                  <Text style={styles.textTitle}>Daily Report</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('HistoryDaily')
                    }>
                    <MaterialCommunityIcons
                      name="history"
                      size={35}
                      color="#FF7314"
                    />
                  </TouchableOpacity>
                </View>
                <Formik
                  validationSchema={validationSchema}
                  initialValues={{desc: ''}}
                  onSubmit={values => this.postDaily(values)}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    values,
                  }) => (
                    <>
                      <Text style={styles.textDaily}>
                        Isi daily report kamu
                      </Text>
                      <TextInput
                        multiline
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={handleChange('desc')}
                        onBlur={handleBlur('desc')}
                        placeholder="Masukin laporan kamu ya!"
                        value={values.desc}
                      />
                      {errors.desc ? (
                        <Text style={styles.textError}>{errors.desc}</Text>
                      ) : null}
                      <View style={styles.wrapperButton}>
                        <ButtonOrange func={handleSubmit} title={'Submit'} />
                      </View>
                    </>
                  )}
                </Formik>
              </View>
            )}
            {this.props.auth.privileges === 'manajer' && (
              <View style={styles.wrapperManajer}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.titleSearch}>
                        Cari Dari Tanggal Kustom :
                      </Text>
                      <View style={styles.wrapperCustom}>
                        <View style={styles.wrapperFrom}>
                          <Text style={styles.from}>Dari</Text>
                          <View style={styles.wrapperDate}>
                            <Text style={styles.textDate}>
                              {this.state.year1}-{this.state.month1}-
                              {this.state.date1}
                            </Text>
                            <TouchableOpacity
                              title="Show Date Picker"
                              onPress={this.showDatePicker1}>
                              <MaterialIcons
                                name="calendar-today"
                                color="#000"
                                size={30}
                              />
                            </TouchableOpacity>
                            <DateTimePickerModal
                              isVisible={this.state.isDatePickerVisible1}
                              mode="date"
                              onConfirm={this.handleConfirmFrom}
                              onCancel={this.hideDatePicker1}
                            />
                          </View>
                        </View>
                        <View style={styles.wrapperFrom}>
                          <Text style={styles.from}>Ke</Text>
                          <View style={styles.wrapperDate}>
                            <Text style={styles.textDate}>
                              {this.state.year2}-{this.state.month2}-
                              {this.state.date2}
                            </Text>
                            <TouchableOpacity
                              title="Show Date Picker"
                              onPress={this.showDatePicker2}>
                              <MaterialIcons
                                name="calendar-today"
                                color="#000"
                                size={30}
                              />
                            </TouchableOpacity>
                            <DateTimePickerModal
                              isVisible={this.state.isDatePickerVisible2}
                              mode="date"
                              onConfirm={this.handleConfirm}
                              onCancel={this.hideDatePicker2}
                            />
                          </View>
                        </View>
                      </View>
                      <ButtonOrange
                        title="Cari"
                        func={() => this.searchCustom(!modalVisible)}
                      />

                      <View style={styles.wrapperModalDown}>
                        <View style={styles.modalDown}>
                          <Text style={styles.titleSearch}>Cari tahun :</Text>
                          <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            onChangeText={val => this.setState({year: val})}
                            placeholder="format 0000!"
                            value={this.state.year}
                          />
                          <ButtonOrange
                            title="Cari"
                            func={() => this.searchYear(!modalVisible)}
                          />
                        </View>
                        <View style={styles.modalDown}>
                          <Text style={styles.titleSearch}>Cari bulan :</Text>
                          <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            onChangeText={val => this.setState({month: val})}
                            placeholder="format 00!"
                            value={this.state.month}
                          />
                          <ButtonOrange
                            title="Cari"
                            func={() => this.searchMonth(!modalVisible)}
                          />
                        </View>
                        <View style={styles.modalDown}>
                          <Text style={styles.titleSearch}>Cari tanggal :</Text>
                          <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            onChangeText={val => this.setState({date: val})}
                            placeholder="format 00!"
                            value={this.state.date}
                          />
                          <ButtonOrange
                            title="Cari"
                            func={() => this.searchDate(!modalVisible)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
                <View style={styles.wrapperHeaderManajer}>
                  <Text style={styles.textTitleManajer}>
                    Daily Report Pegawai
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonFIlter}
                    onPress={() => this.setModalVisible(true)}>
                    <MaterialCommunityIcons
                      name="filter-menu"
                      size={24}
                      color="#FF7314"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.wrapperContentManajer}>
                  {this.state.loadBy == 'first' && (
                    <FlatList
                      style={styles.wrapperCard}
                      scrollEnabled={true}
                      keyExtractor={item => item.id}
                      data={this.state.data}
                      renderItem={({item}) => <CardDailyReport data={item} />}
                      onEndReached={this.loadMoreFirst}
                      onEndReachedThreshold={0}
                    />
                  )}
                  {this.state.loadBy == 'custom' && (
                    <FlatList
                      style={styles.wrapperCard}
                      scrollEnabled={true}
                      keyExtractor={item => item.id}
                      data={this.state.data}
                      renderItem={({item}) => <CardDailyReport data={item} />}
                      onEndReached={this.loadMoreByCustom}
                      onEndReachedThreshold={0}
                    />
                  )}
                  {this.state.loadBy == 'year' && (
                    <FlatList
                      style={styles.wrapperCard}
                      scrollEnabled={true}
                      keyExtractor={item => item.id}
                      data={this.state.data}
                      renderItem={({item}) => <CardDailyReport data={item} />}
                      onEndReached={this.loadMoreByYear}
                      onEndReachedThreshold={0}
                    />
                  )}
                  {this.state.loadBy == 'month' && (
                    <FlatList
                      style={styles.wrapperCard}
                      scrollEnabled={true}
                      keyExtractor={item => item.id}
                      data={this.state.data}
                      renderItem={({item}) => <CardDailyReport data={item} />}
                      onEndReached={this.loadMoreByMonth}
                      onEndReachedThreshold={0}
                    />
                  )}
                  {this.state.loadBy == 'date' && (
                    <FlatList
                      style={styles.wrapperCard}
                      scrollEnabled={true}
                      keyExtractor={item => item.id}
                      data={this.state.data}
                      renderItem={({item}) => <CardDailyReport data={item} />}
                      onEndReached={this.loadMoreByDate}
                      onEndReachedThreshold={0}
                    />
                  )}
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
  dailys: state.dailys,
});

const mapDispatchToProps = {
  getDailyAllPegawaiByDate,
  getDailyAllPegawaiByMonth,
  getDailyAllPegawaiByYear,
  getDailyAllPegawaiByCustom,
  postDaily,
};

export default connect(mapStateToProps, mapDispatchToProps)(Daily);

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
    marginBottom: '10%',
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#393534',
    width: '90%',
  },
  input: {
    backgroundColor: '#D3D3D3',
    width: '100%',
    marginVertical: '2%',
    borderRadius: 10,
    padding: '5%',
    marginVertical: '5%',
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
    flexDirection: 'row',
  },
  wrapperContentManajer: {
    flex: 8,
  },
  buttonFIlter: {
    padding: '2%',
    backgroundColor: 'black',
    marginHorizontal: '2%',
    borderRadius: 10,
  },

  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'column-reverse',
  },
  modalView: {
    width: '100%',
    padding: '8%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  wrapperCustom: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  wrapperFrom: {
    width: '50%',
  },
  wrapperDate: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: '5%',
  },
  textDate: {
    width: '75%',
    fontWeight: 'bold',
    color: 'black',
  },
  from: {
    fontWeight: 'bold',
    marginHorizontal: '5%',
  },
  titleSearch: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: '2%',
    color: 'black',
  },
  wrapperModalDown: {
    flexDirection: 'row',
    marginTop: '1%',
  },
  modalDown: {
    width: '33%',
    paddingHorizontal: '1%',
  },

  textDaily: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
});
