// src/screens/JobsScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import BottomNavigation from './../BottomNavigation';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://192.168.1.2:3001/jobs');  // Use your server URL here
        console.log('Jobs:', response.data);
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.jobCard}>
      <View style={styles.iconRow}>
        <Icon name="briefcase" size={20} color="#3333cc" />
        <Text style={styles.jobTitle}>{item.title}</Text>
      </View>
      <View style={styles.iconRow}>
        <Icon name="building" size={20} color="#ff6600" />
        <Text style={styles.jobCompany}>{item.company}</Text>
      </View>
      <View style={styles.iconRow}>
        <Icon name="file-text-o" size={20} color="#666666" />
        <Text style={styles.jobDescription}>{item.description}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Listings</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: 'cyan',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#3333cc',
  },
  jobCompany: {
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 10,
    color: '#ff6600',
  },
  jobDescription: {
    fontSize: 14,
    marginLeft: 10,
    color: '#666666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JobsScreen;
