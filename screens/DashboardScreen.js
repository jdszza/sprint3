import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { AppContext } from '../context/AppContext';

export default function DashboardScreen({ navigation }) {
  const { collects, deliveries, loadCollects, loadDeliveries } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([loadCollects(), loadDeliveries()]);
    } catch (e) {
      setError('Falha ao carregar dados');
      console.error('Error loading items:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return '#4CAF50';
      case 'IN_PROGRESS': return '#FF9800';
      case 'PENDING': return '#2196F3';
      case 'CANCELLED': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING': return 'Pendente';
      case 'IN_PROGRESS': return 'Em Andamento';
      case 'COMPLETED': return 'Concluído';
      case 'CANCELLED': return 'Cancelado';
      default: return status;
    }
  };

  // Combinar coletas e entregas
  const allItems = [...collects, ...deliveries];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => navigation.navigate('TaskDetail', { 
        collect: item.title?.includes('Coleta') ? item : null,
        delivery: item.title?.includes('Entrega') ? item : null
      })}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemLocation}>📍 {item.address}</Text>
      <Text style={styles.itemClient}>👤 {item.client}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          size={36}
          color="white"
          onPress={() => navigation.navigate('Profile')}
        />
        <TouchableOpacity onPress={loadItems}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Dashboard de Tarefas</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Carregando tarefas...</Text>
        </View>
      ) : (
        <FlatList
          data={allItems}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.title}-${item.id}`}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        duration={3000}
        style={styles.snackbar}
      >
        {error}
      </Snackbar>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemLocation: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  itemClient: {
    fontSize: 12,
    color: '#666',
  },
  snackbar: {
    backgroundColor: '#F44336',
  },
});
