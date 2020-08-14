import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ setToken, setId }) => {
  const [img, setImg] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");
    const response = await axios.get(
      "https://express-airbnb-api.herokuapp.com/user/" + id,
      { headers: { Authorization: "Bearer " + token } }
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
      <View style={styles.container}>
        {img ? (
          <Image
            style={styles.image}
            source={{ uri: img }}
            style={{ height: 100, width: 100 }}
          />
        ) : null}
        <TouchableOpacity
          style={{ paddingTop: 30 }}
          onPress={async () => {
            const galleryPerm = await ImagePicker.requestCameraRollPermissionsAsync();
            if (galleryPerm.status === "granted") {
              const pickImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
              });
              setImg(pickImage.uri);
            }
          }}
        >
          <Text style={styles.addImage}>Ajouter une image</Text>
        </TouchableOpacity>

        <TextInput style={styles.input}>{data.name}</TextInput>
        <TextInput style={styles.input}>{data.email}</TextInput>
        <TextInput style={styles.description}>{data.description}</TextInput>
        <TouchableOpacity style={styles.upDateButton}>
          <Text style={styles.upDate}>Mettre à jour</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => {
            setToken(null);
          }}
        >
          <Text style={styles.logOut}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 60,
  },
  input: {
    borderBottomColor: "#F2485B",
    borderBottomWidth: 1,
    width: 300,
    lineHeight: 21,
    margin: 10,
    fontSize: 18,
    color: "black",
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  description: {
    height: 100,
    width: 300,
    borderColor: "#F2485B",
    borderWidth: 1,
    lineHeight: 20,
    margin: 25,
    fontSize: 16,
    color: "black",
    padding: 10,
  },
  addImage: {
    color: "#F2485B",
    marginBottom: 20,
  },
  upDateButton: {
    borderColor: "#F2485B",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 30,
    backgroundColor: "white",
    textAlign: "center",
    padding: 20,
  },
  upDate: {
    fontSize: 20,
    color: "#F2485B",
  },
  logOutButton: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 30,
    backgroundColor: "#F2485B",
    textAlign: "center",
    padding: 20,
  },
  logOut: {
    fontSize: 20,
    color: "white",
  },
});
