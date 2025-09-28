import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <Ionicons name="person-circle-outline" size={100} color="white" style={styles.profileIcon} />
      <Text style={styles.name}>[Name]</Text>
      <View style={styles.location}>
        <Ionicons name="location-outline" size={16} color="white" />
        <Text style={styles.locationText}>Location</Text>
      </View>

      <View style={styles.option}>
        <Ionicons name="person-outline" size={20} color="white" />
        <Text style={styles.optionText}>Personal Information</Text>
      </View>

      <View style={styles.option}>
        <Ionicons name="notifications-outline" size={20} color="white" />
        <Text style={styles.optionText}>Notifications</Text>
      </View>

      <View style={styles.settings}>
        <Ionicons name="settings-outline" size={20} color="white" />
        <Text style={styles.optionText}>Settings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2d72d9', padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  profileIcon: {
    alignSelf: 'center',
    marginTop: 10
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold'
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  locationText: {
    color: '#fff',
    marginLeft: 5
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  optionText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  settings: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20
  }
});
