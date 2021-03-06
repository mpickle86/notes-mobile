import React, {useState} from "react";
import {View, Text, TextInput, Alert, Image} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {registration} from "../api/firebase-methods";
import styles from "../styles/login-styles";

function SignUpScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    if (!name) {
      Alert.alert("Name is required.");
    } else if (!email) {
      Alert.alert("Email is required");
    } else if (!password) {
      Alert.alert("Password is required");
    } else {
      registration(name, email, password);
      props.setScreen("LoginScreen");
    }
  }

  return (
    <View style={styles.loginScreen}>
      <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
      />
      <Text style={styles.lightText}>Create a new account:</Text>
      <TextInput
        style={styles.inputBox}
        placeholderTextColor="rgb(120,120,130)"
        placeholder="Name"
        maxLength={20}
        value={name}
        onChangeText={name => setName(name)}
      />
      <TextInput
        style={styles.inputBox}
        placeholderTextColor="rgb(120,120,130)"
        placeholder="Email"
        maxLength={50}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={styles.inputBox}
        placeholderTextColor="rgb(120,120,130)"
        placeholder="Password"
        maxLength={20}
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.boldText}>SIGN UP</Text>
      </TouchableOpacity>

      <Text style={styles.lightText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => props.setScreen("LoginScreen")}>
        <Text style={styles.boldText}>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUpScreen;