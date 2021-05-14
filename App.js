import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "3ee7e36b45cadaf04413cecd8917e48e";


export default class extends React.Component {
  state = {
    isLoading: true

  };
  getWeather = async (latitude , longtitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&APPID=${API_KEY}${units=metric}`);
    this.setState({isLoading : false , temp: data.main.temp})
  };
  
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { 
        coords: {latitude , longtitude} 
    } = await Location.getCurrentPositionAsync();
    this.getWeather(latitude , longtitude)
    } catch (error) {
      Alert.alert("Can find you." , "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading , temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp = {Math.round(temp)} />;
  }
}

