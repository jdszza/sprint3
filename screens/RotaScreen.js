import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RotaScreen({ navigation }) {
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
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <Text style={styles.title}>Rota</Text>

      <View style={styles.card}>
        {/* Mapa Simulado */}
        <View style={styles.mapPlaceholder}>
          <Text style={{ color: '#fff' }}>🗺️ Route Map</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>In Progress</Text>
          <Text style={styles.infoSub}>ETA: 12:30 PM</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Collection</Text>
          <Text style={styles.infoSub}>Dock 3</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Delivery</Text>
          <Text style={styles.infoSub}>251 Oak St</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Status</Text>
          <Text style={styles.infoSub}>En Route</Text>
        </View>
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

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Map')}
        >
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
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 100,
  },
  mapPlaceholder: {
    backgroundColor: '#1f5bb5',
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  info: {
    marginBottom: 12,
  },
  infoTitle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoSub: {
    color: '#333',
    fontSize: 14,
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
