// BottomNavigation.js
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BottomNavigation = () => {
  const router = useRouter();

  const handleHomePress = () => {
    router.push('/'); // Navigate to the homepage
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleHomePress}>
      <Ionicons name="home" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -24 }],
    backgroundColor: 'cyan',
    padding: 12,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BottomNavigation;