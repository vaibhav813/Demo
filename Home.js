import React, {Component} from 'react';
import {View, Text, alert, Image} from 'react-native';
import {create} from 'apisauce';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import moment from 'moment';
import get from 'lodash/get';

const appId = '784973a770b0c81af11c1f408c28fbcb';
const api = create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  //headers: {Accept: 'application/vnd.github.v3+json'},
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLongitude: 0.0,
      currentLatitude: 0.0,
      isLoad: false,
    };
  }
  componentDidMount() {
    console.log('In component did mount');
    this.getCurrentLocation();
    this.getAllDetails();
  }

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        this.setState({currentLongitude: currentLongitude});
        //Setting state Longitude to re re-render the Longitude Text
        this.setState({currentLatitude: currentLatitude});

        console.log(
          'Location--- ',
          this.state.currentLatitude,
          ' --- ' + this.state.currentLongitude,
        );
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  getAllDetails = async () => {
    //api.post('/onecall', {name: 'steve'}, {headers: {'x-gigawatts': '1.21'}});
    this.setState({isLoad: true});
    try {
      const response = await api.get(
        '/onecall?lat=' +
          this.state.currentLatitude +
          '&lon=' +
          this.state.currentLongitude +
          '&appid=' +
          appId,
      );
      this.props.dispatch({type: 'FETCH_DATA_SUCCESS', weatherInfo: response});
      this.setState({isLoad: false});
      console.log('Response message ', response);
    } catch (err) {
      this.setState({isLoad: false});
      console.log(err);
      alert(err);
    }
    //   .catch((err) => {
    //     console.log('Error message ', err);
    //     alert(err);
    //   });
  };

  allDetails = () => {
    let val = get(this.props.data, 'current.weather', {});
    console.log('Date converted called-- ', val);
    var newDate = moment(Date(val)).format('DD/MM/YYYY hh:MM');
    console.log('Date converted-- ', newDate);
    return (
      <View style={{flex: 0}}>
        <Text style={{fontWeight: '700', fontSize: 30}}>Date: {newDate}</Text>
        {get(this.props.data, 'current.weather', {}).map((data) => {
          return (
            <View>
              <Text style={{fontWeight: '500', fontSize: 20}}>
                Weather: {data.main}
              </Text>
              <Text style={{fontWeight: '500', fontSize: 20}}>
                Description: {data.description}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        {this.state.isLoad ? (
          <Image
            source={require('./assets/226-splashy-loader.gif')}
            style={{height: 100, width: 100}}
          />
        ) : null}
        {this.allDetails()}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  console.log('here states are---- ', state.weatherInfo);
  const data = state.weatherInfo || {};
  return data;
};

// const mapDispatchToProps = () => ({
//   fetchData: () => dispatch(fetchData()),
// });

export default connect(mapStateToProps)(Home);
