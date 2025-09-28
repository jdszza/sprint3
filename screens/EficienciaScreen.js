import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EficienciaScreen({ navigation }) {
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
          name="close"
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </View>

      <Text style={styles.title}>Eficiência energética</Text>

      <View style={styles.card}>
        <View style={styles.headerCard}>
          <Text style={styles.headerCardTitle}>Efficiency Overview</Text>
          <Text style={styles.headerCardDate}>Mar 1–Mar 31</Text>
        </View>

        {/* Gráfico simulado */}
        <View style={styles.graphPlaceholder}>
          <Text style={styles.graphPercent}>79%</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Energy Usage</Text>
          <Text style={styles.infoValue}>325 kWh</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Distance Traveled</Text>
          <Text style={styles.infoValue}>150 km</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>CO₂ Emissions</Text>
          <Text style={styles.infoValue}>52 kg</Text>
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
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerCardTitle: {
    color: '#333',
    fontWeight: 'bold',
  },
  headerCardDate: {
    color: '#333',
  },
  graphPlaceholder: {
    backgroundColor: '#1f5bb5',
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  graphPercent: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#333',
    fontWeight: 'bold',
  },
  infoValue: {
    color: '#333',
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
