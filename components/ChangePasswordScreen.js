import React, {useState} from "react";
import {View, Text, TextInput, Alert, Image} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import {changePassword} from "../api/firebase-methods";
import styles from "../styles/login-styles";

function ChangePasswordScreen(props) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handleSubmit() {
    if (!email) {
      Alert.alert("Email is required");
    } else if (!oldPassword) {
      Alert.alert("Old Password is required");
    } else if (!newPassword) {
      Alert.alert("New Password is required");
    } else {
      changePassword(email, oldPassword, newPassword);
      props.setScreen("LoginScreen");
    }
  }

  return (
    <View style={styles.loginScreen}>
      <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
      />
      <TextInput
        style={styles.inputBox}
        placeholderTextColor="rgb(120,120,130)"
        placeholder="Email"
        maxLength={50}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.inputBox}
        placeholderTextColor="rgb(120,120,130)"
        placeholder="Old Password"
        maxLength={20}
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.inputBox}
        placeholderTextColor="rgb(120,120,130)"
        placeholder="New Password"
        maxLength={20}
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.loginButton}>SUBMIT</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.setScreen("ResetScreen")}>
        <Text style={styles.smallLink}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => props.setScreen("Dashboard")}>
        <Ionicons
          name="arrow-back"
          style={styles.backArrow}
        />
        <Text style={styles.boldText}>GO BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ChangePasswordScreen;