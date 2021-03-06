import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function registration(name, email, password) {
  const sanitizedEmail = email.toLowerCase().trim();
  try {
    await firebase.auth().createUserWithEmailAndPassword(sanitizedEmail, password)
    .then(userCredential => {
      if (userCredential) {
        const user = userCredential.user;
        user.sendEmailVerification();
        firebase.firestore().collection("users").doc(user.uid).set({
          email: user.email,
          name: name,
          theme: "dark",
          sortBy: "modified-desc",
          notes: []
        });
        Alert.alert(
          "Success!",
          "An automated message with a verification link has been sent to your email. " +
          "Please use it to enable your Simple Notes account by verifying your email address."
        );
      }
    });
  } catch(err) {
    Alert.alert("Error!", err.message);
  }
}

export async function logIn(email, password) {
  const sanitizedEmail = email.toLowerCase().trim();
  try {
    await firebase.auth().signInWithEmailAndPassword(sanitizedEmail, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (!user.emailVerified) {
        user.sendEmailVerification();
        firebase.auth().signOut();
        Alert.alert(
          "Unverified Email Address",
          "A new automated message with a verification link has been sent to your email. " +
          "Please use it to enable your Simple Notes account by verifying your email address."
        );
      }
    });
  } catch(err) {
    Alert.alert("Error!", err.message);
  }
}

export async function logOut() {
  try {
    await firebase.auth().signOut();
  } catch(err) {
    Alert.alert("Error!", err.message);
  }
}

export async function saveNotes(userRef, updatedNotesArr) {
  try {
    await userRef.update({notes: updatedNotesArr});
  } catch(err) {
    Alert.alert("Error!", err.message);
  }
}

export async function resetPassword(email) {
  const sanitizedEmail = email.toLowerCase().trim();
  try {
    await firebase.auth().sendPasswordResetEmail(sanitizedEmail);
    Alert.alert(
      "Password Reset",
      "An automated message with a password reset link has been sent to your email."
    );
  } catch(err) {
    Alert.alert("Error!", err.message);
  }
}

export async function changeEmail(oldEmail, password, newEmail) {
  const sanitizedOldEmail = oldEmail.toLowerCase().trim();
  const sanitizedNewEmail = newEmail.toLowerCase().trim();
  try {
    await firebase.auth().signInWithEmailAndPassword(sanitizedOldEmail, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      user.updateEmail(sanitizedNewEmail)
      .then(() => {
        user.sendEmailVerification();
        firebase.firestore().collection("users").doc(user.uid).update({
          email: user.email,
        });
        Alert.alert(
          "Success!",
          "Your email address has been changed to " + user.email +
          ". Please verify this address by clicking on the link in the automated verification message sent to your email."
        );
      });
    });
  } catch(err) {
    Alert.alert("Error!", err.message);
  }
}

export async function changePassword(email, oldPassword, newPassword) {
  const lowerCaseEmail = email.toLowerCase();
  try {
    await firebase.auth().signInWithEmailAndPassword(lowerCaseEmail, oldPassword)
    .then(() => {
      const user = firebase.auth().currentUser;
      user.updatePassword(newPassword)
      .then(() => {
        Alert.alert(
          "Success!",
          "Your password has been changed."
        );
      });
    });
  } catch(err) {
    Alert.alert("Error!", err.message);
  }
}