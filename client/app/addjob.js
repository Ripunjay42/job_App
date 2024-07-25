// src/screens/AddJobScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Addjob = ({setLoggedin}) => {
  const [job, setJob] = useState({ title: '', description: '', company: '' });
  const [isAdd, setIsadd] = useState(false);
  const router = useRouter();

  const handleAddJob = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3001/addjob', job);  // Update with your server URL
      console.log('Job added:', response.data);
      setIsadd(true);
      Alert.alert('Success', 'Job added successfully!');
    } catch (error) {
      console.error('Add job failed:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response ? error.response.data : error.message);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have been logged out.');
    setLoggedin(false); // Redirect to login screen
  };

  return (
    <View style={styles.container}>
        {isAdd && <Text style={styles.successMessage}>JOb added successfully!</Text>}
      <Text style={styles.title}>Add Job</Text>
      <TextInput
        style={styles.input}
        placeholder="Job Title"
        value={job.title}
        onChangeText={(text) => setJob({ ...job, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Job Description"
        value={job.description}
        onChangeText={(text) => setJob({ ...job, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={job.company}
        onChangeText={(text) => setJob({ ...job, company: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddJob}>
        <Text style={styles.buttonText}>Add Job</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} 
        onPress={
            () => 
                    {
                    setJob({ title: '', description: '', company: '' });
                    setIsadd(false);
                    }
                }
        >
        <Text style={styles.buttonText}>Add More Job</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
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
});

export default Addjob;
