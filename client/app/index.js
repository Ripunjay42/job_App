import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavigation from './BottomNavigation';

const Homepage = () => {
  const router = useRouter();
  const handleJobSeekerPress = () => {
    router.push('/jobs');
  };

  const handleJobProviderPress = () => {
    router.push('/signupProvider');
  };

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']} // Define your gradient colors
      style={styles.container}
    >
      <Animatable.Text animation="bounceInDown" style={styles.title}>
        Welcome to Job Portal
      </Animatable.Text>
      <Animatable.View animation="fadeIn" delay={1000} style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleJobSeekerPress}>
          <Text style={styles.buttonText}>Job Seeker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleJobProviderPress}>
          <Text style={styles.buttonText}>Job Provider</Text>
        </TouchableOpacity>
      </Animatable.View>
      <BottomNavigation />
    </LinearGradient>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
  },
  buttonContainer: {
    width: '50%',
  },
  button: {
    backgroundColor: 'cyan',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',  
  },
});

export default Homepage;
