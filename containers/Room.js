import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

import axios from "axios";
import MapView from "react-native-maps";
import Stars from "../components/Stars";
export default function Room({ route }) {
  const { infos } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://airbnb-api.herokuapp.com/api/room/" + infos._id
    );
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Use Effect");
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#F2485B" style={{ flex: 1 }} />
  ) : (
    <ScrollView>
      <View>
        <Image
          style={{ height: 180, resizeMode: "cover" }}
          source={{ uri: data.photos[0] }}
        />

        <Text style={styles.price}>{data.price} €</Text>
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Stars rating={data.ratingValue} />
            <Text style={styles.reviews}>{data.reviews} avis</Text>
          </View>
          <Image
            style={styles.imageUser}
            source={{ uri: data.user.account.photos[0] }}
          />
        </View>
        <Text style={styles.description}>{data.description}</Text>
        <MapView
          initialRegion={{
            latitude: data.loc[1],
            longitude: data.loc[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{ height: 300, width: "100%" }}
        >
          <MapView.Marker
            key={data._id}
            coordinate={{
              latitude: data.loc[1],
              longitude: data.loc[0],
            }}
            title={data.title}
            description={data.description}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  price: {
    position: "absolute",
    top: 120,
    fontSize: 18,
    color: "white",
    backgroundColor: "black",
    padding: 10,
  },
  imageUser: {
    height: 70,
    width: 70,
    right: 10,
    top: 10,
    borderRadius: 50,
    position: "absolute",
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    width: 280,
    marginTop: 10,
    marginBottom: 10,
  },
  reviews: {
    marginLeft: 10,
    fontSize: 1,
    color: "grey",
  },
  description: {
    marginLeft: 10,
    width: 350,
    fontSize: 15,
    marginBottom: 30,
    marginTop: 20,
    textAlign: "justify",
  },
});
