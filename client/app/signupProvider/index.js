// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import BottomNavigation from './../BottomNavigation';
import axios from 'axios';

const SignUpScreen = () => {
  const [user, setUser] = useState({ username: '', name: '', email: '', password: '' });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSignUp = async () => {
    console.log('Signing up:', user);
    try {
      const response = await axios.post('http://192.168.1.2:3001/signup', user);
      console.log('Registration successful:', response.data);
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      Alert.alert('Registration Error', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      {isRegistered && <Text style={styles.successMessage}>Registered successfully!</Text>}
      <Text style={styles.title}>Register</Text>
        <TextInput
        style={styles.input}
        placeholder="Username"
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={user.email}
          keyboardType="email-address"
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={user.password}
          secureTextEntry
          onChangeText={(text) => setUser({ ...user, password: text })}
        />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.linkText}>Already have an account? <Link href="/loginProvider">Login</Link></Text>
      </TouchableOpacity>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    color: '#1e90ff',
    marginTop: 20,
  },
});

export default SignUpScreen;
