import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import CardAbsent from '../components/CardAbsent';
import {connect} from 'react-redux';
import {getUserById} from '../redux/actions/users';
import {getAbsentById} from '../redux/actions/absents';

class HistoryAbsents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      page: 1,
    };
  }

  getDataById = () => {
    const {token} = this.props.auth;
    const {page} = this.state;
    const newDate = new Date();
    const autoMonth =
      newDate.getMonth() + 1 < 10
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`;
    this.props.getAbsentById(token, autoMonth, page).then(() => {
      this.setState({
        loading: false,
        data: this.props.absents.dataById,
      });
      console.log(this.state.data);
    });
  };

  loadMoreAbsent = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        page: Number(this.state.page) + 1,
      },
      () => {
        const {page} = this.state;
        const newDate = new Date();
        const autoMonth =
          newDate.getMonth() + 1 < 10
            ? `0${newDate.getMonth() + 1}`
            : `${newDate.getMonth() + 1}`;
        this.props.getAbsentById(token, autoMonth, page).then(() => {
          this.setState({
            data: this.state.data.concat(this.props.absents.dataById),
          });
          console.log(this.state.page);
        });
      },
    );
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', async () => {
      this.getDataById();
    });
  }

  render() {
    return (
      <>
        {this.state.loading === false ? (
          <View style={styles.wrapper}>
            {/* <View style={styles.wrapperHeader}>
              <Text style={styles.textHeader}>Bulan ini</Text>
            </View> */}
            {this.state.data.length > 0 ? (
              <View style={styles.wrapperContent}>
                <FlatList
                  scrollEnabled={true}
                  keyExtractor={item => item.id}
                  data={this.state.data}
                  renderItem={({item}) => <CardAbsent data={item} />}
                  onEndReached={this.loadMoreAbsent}
                  onEndReachedThreshold={0.2}
                />
              </View>
            ) : (
              <View style={styles.wrapperLoading}>
                <Text>Tidak ada History Absen</Text>
              </View>
            )}
          </View>
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
  absents: state.absents,
});

const mapDispatchToProps = {getUserById, getAbsentById};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryAbsents);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperCard: {
      flex: 1
  },
  wrapperContent: {
    flex: 1,
  },
  wrapperHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#393534',
    textAlign: 'center',
  },
});
