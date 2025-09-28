import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function MapScreen({ navigation }) {
  const { logout } = useContext(AppContext);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          size={36}
          color="white"
          onPress={() => navigation.navigate('Profile')}
        />
        <Ionicons
          name="log-out-outline"
          size={30}
          color="white"
          onPress={logout}
        />
      </View>

      {/* Conteúdo */}
      <Text style={styles.title}>Map Screen</Text>
      <Text style={styles.subtitle}>Here you can visualize the map or route.</Text>

      <View style={styles.mapPlaceholder}>
        <Text style={{ color: '#fff' }}>🗺️ Map View Here</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="list" size={20} color="white" />
          <Text style={styles.navText}>Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map" size={20} color="white" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('More')}
        >
          <Ionicons name="menu" size={20} color="white" />
          <Text style={styles.navText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d72d9',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#1f5bb5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#2d72d9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
});
