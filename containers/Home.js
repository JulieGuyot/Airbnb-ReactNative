import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Stars from "../components/Stars";

const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://airbnb-api.herokuapp.com/api/room?city=paris"
    );
    console.log(response.data);
    setData(response.data.rooms);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Use Effect");
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#F2485B" style={{ flex: 1 }} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.monairbnb}>MonAirbnb</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => {
          return String(item._id);
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate("Room", { infos: item });
              }}
            >
              <Image
                style={{ height: 200, resizeMode: "cover" }}
                source={{ uri: item.photos[0] }}
              />
              <Text style={styles.itemPrice}>{item.price} €</Text>
              <View style={styles.itemDetails}>
                <View style={{ flexDirection: "row" }}>
                  <ScrollView horizontal={true}>
                    <View>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Stars rating={item.ratingValue} />
                        <Text style={styles.itemReviews}>
                          {item.reviews} avis
                        </Text>
                      </View>
                    </View>
                  </ScrollView>

                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      resizeMode: "contain",
                      marginLeft: 10,
                    }}
                    source={{ uri: item.user.account.photos[0] }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  card: {
    width: 330,
  },

  monairbnb: {
    backgroundColor: "#F2485B",
    width: "120%",
    textAlign: "center",
    marginBottom: 30,
    color: "white",
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 20,
  },
  itemPrice: {
    position: "absolute",
    top: 150,
    color: "white",
    backgroundColor: "black",
    padding: 10,
  },
  itemDetails: {
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 30,
    paddingTop: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  itemTitle: {
    width: 330,
    fontSize: 18,
    paddingRight: 70,
    marginBottom: 10,
  },
  itemReviews: {
    color: "grey",
  },
});
