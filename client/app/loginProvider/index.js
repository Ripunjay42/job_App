// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import BottomNavigation from './../BottomNavigation';
import axios from 'axios';
import Addjob from '../addjob';

const LoginScreen = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedin, setLoggedin] = useState(false);

  const handleLogin = async (event) => {
    console.log('Logging in:', { username, password });
    event.preventDefault();
    try {
      const response = await axios.post('http://10.0.2.2:3001/login', { username, password });
      console.log('User Login:', response.data);
      console.log({username, password});
      setLoggedin(true);
    } catch (error) {
      console.error('User Login Error:', error.response.data);
    }
  };

  return (
    <>
    {!loggedin ? (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setusername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? <Link href="/signupProvider">SignUp</Link></Text>
      </TouchableOpacity>
      <BottomNavigation />
    </View>
  ): (
    <Addjob setLoggedin={setLoggedin}/>
  )}
  </>
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

export default LoginScreen;
