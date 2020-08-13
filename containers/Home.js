import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

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
                style={{ height: 170, resizeMode: "cover" }}
                source={{ uri: item.photos[0] }}
              />
              <Text style={styles.itemPrice}>{item.price} €</Text>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemReviews}>{item.reviews} avis</Text>
              </View>
              <Image
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  resizeMode: "contain",
                  position: "absolute",
                  left: 250,
                  bottom: 30,
                }}
                source={{ uri: item.user.account.photos[0] }}
              />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemPrice: {
    position: "absolute",
    top: 120,
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
    paddingRight: 70,
  },
});
