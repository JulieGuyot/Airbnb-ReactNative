import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function AroundMe() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setIsLoading(false);
      } else {
        alert("You have to accept location to use the app");
      }
    };
    askPermission();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-api.herokuapp.com/api/room/around?latitude=${latitude}&longitude=${longitude}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  return (
    <View>
      {isLoading === false ? (
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {data.map((element, index) => {
            return (
              <MapView.Marker
                key={element._id}
                coordinate={{
                  latitude: element.loc[1],
                  longitude: element.loc[0],
                }}
                title={element.title}
                description={element.description}
              ></MapView.Marker>
            );
          })}
        </MapView>
      ) : null}
    </View>
  );
}
