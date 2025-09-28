import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AgendamentoScreen({ navigation }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [loadType, setLoadType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = () => {
    alert('Agendamento realizado com sucesso!');
  };

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

      <Text style={styles.title}>Agendamento de coleta</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Pickup Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Dock 2"
          value={pickup}
          onChangeText={setPickup}
        />

        <Text style={styles.label}>Dropoff Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Dock 5"
          value={dropoff}
          onChangeText={setDropoff}
        />

        <Text style={styles.label}>Load Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Pallet"
          value={loadType}
          onChangeText={setLoadType}
        />

        <Text style={styles.label}>Date and Time</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { width: '48%' }]}
            placeholder="04/22/2024"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={[styles.input, { width: '48%' }]}
            placeholder="10:00 AM"
            value={time}
            onChangeText={setTime}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSchedule}>
          <Text style={styles.buttonText}>Schedule</Text>
        </TouchableOpacity>
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
  label: {
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4183dd',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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
