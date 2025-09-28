import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../context/AppContext";
import Toast from 'react-native-toast-message';

export default function HomeScreen({ navigation }) {
  const { logout, user, collects, deliveries, loadCollects, loadDeliveries } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadCollects(), loadDeliveries()]);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao carregar dados'
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#FFA500';
      case 'IN_PROGRESS': return '#2196F3';
      case 'COMPLETED': return '#4CAF50';
      case 'CANCELLED': return '#F44336';
      default: return '#666';
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

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          size={36}
          color="white"
          onPress={() => navigation.navigate("Profile")}
        />
        <Ionicons
          name="log-out-outline"
          size={30}
          color="white"
          onPress={logout}
        />
      </View>

      <Text style={styles.title}>Olá, {user?.email?.split('@')[0] || 'Usuário'}!</Text>
      <Text style={styles.subtitle}>O que você gostaria de fazer agora?</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor="#333"
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Coletas Pendentes</Text>
          {collects.filter(c => c.status === 'PENDING').map((collect) => (
            <TouchableOpacity
              key={collect.id}
              style={styles.taskCard}
              onPress={() => navigation.navigate("TaskDetail", { collect })}
            >
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{collect.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(collect.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(collect.status)}</Text>
                </View>
              </View>
              <Text style={styles.taskDescription}>{collect.description}</Text>
              <Text style={styles.taskAddress}>{collect.address}</Text>
              <Text style={styles.taskClient}>Cliente: {collect.client}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.sectionTitle}>Entregas Pendentes</Text>
          {deliveries.filter(d => d.status === 'PENDING').map((delivery) => (
            <TouchableOpacity
              key={delivery.id}
              style={styles.taskCard}
              onPress={() => navigation.navigate("TaskDetail", { delivery })}
            >
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{delivery.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(delivery.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(delivery.status)}</Text>
                </View>
              </View>
              <Text style={styles.taskDescription}>{delivery.description}</Text>
              <Text style={styles.taskAddress}>{delivery.address}</Text>
              <Text style={styles.taskClient}>Cliente: {delivery.client}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d72d9",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  taskCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  taskAddress: {
    fontSize: 12,
    color: '#E0E0E0',
    marginBottom: 3,
  },
  taskClient: {
    fontSize: 12,
    color: '#E0E0E0',
  },
});
