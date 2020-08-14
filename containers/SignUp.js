import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SignUp = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Rejoignez-nous !</Text>
        <TextInput
          placeholder="email"
          placeholderTextColor="white"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="username"
          placeholderTextColor="white"
          style={styles.input}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="name"
          placeholderTextColor="white"
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <TextInput
          multiline={true}
          placeholder="présentez-vous en quelques mots..."
          placeholderTextColor="white"
          style={styles.inputArea}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <TextInput
          placeholder="mot de passe"
          placeholderTextColor="white"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TextInput
          placeholder="confirmez votre de passe"
          placeholderTextColor="white"
          secureTextEntry={true}
          style={styles.input}
          value={passwordConfirmed}
          onChangeText={(text) => {
            setPasswordConfirmed(text);
          }}
        />
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={async (event) => {
            event.preventDefault();
            if (
              !username ||
              !name ||
              !description ||
              !email ||
              !password ||
              !passwordConfirmed
            ) {
              alert("Veuillez remplir tous les champs");
            } else if (password !== passwordConfirmed) {
              alert("Les mots de passe doivent être identiques");
            } else {
              const response = await axios.post(
                "https://express-airbnb-api.herokuapp.com/user/sign_up",
                {
                  email: email,
                  username: username,
                  name: name,
                  description: description,
                  password: password,
                }
              );
              const token = response.data.token;
              const id = response.data.id;
              await AsyncStorage.setItem("userToken", token);
              await AsyncStorage.setItem("userId", id);
              setToken(token);
              alert("connexion réussie!");
            }
          }}
        >
          <Text style={styles.signUpButtonText}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkToLogin}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.linkToLoginText}>
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2485B",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 20,
    marginLeft: 12,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    flex: 1,
    width: 300,
    paddingLeft: 5,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    lineHeight: 30,
    margin: 25,
    fontSize: 18,
    color: "white",
    paddingBottom: 10,
  },
  inputArea: {
    height: 140,
    width: 300,
    borderColor: "white",
    borderWidth: 1,
    lineHeight: 20,
    margin: 25,
    fontSize: 16,
    color: "white",
    padding: 10,
  },

  signUpButton: {
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 20,

    backgroundColor: "white",
    textAlign: "center",

    padding: 20,
  },
  linkToLogin: {
    color: "white",
    textDecorationLine: "underline",
    backgroundColor: "#F2485B",
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#F2485B",
    fontSize: 24,
  },
  linkToLoginText: {
    color: "white",
    textDecorationLine: "underline",
    marginTop: 10,
    paddingBottom: 40,
  },
});
