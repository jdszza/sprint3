import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { AppContext } from '../context/AppContext';
import Toast from 'react-native-toast-message';

export default function TaskDetailScreen({ navigation, route }) {
  const { collect, delivery } = route.params || {};
  const { updateCollectStatus, updateDeliveryStatus } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSnack, setShowSnack] = useState(false);
  
  const item = collect || delivery;
  const isCollect = !!collect;

  const handleStatusUpdate = async (newStatus) => {
    if (!item) return;
    
    setLoading(true);
    try {
      if (isCollect) {
        await updateCollectStatus(item.id, newStatus);
      } else {
        await updateDeliveryStatus(item.id, newStatus);
      }
      
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Status atualizado com sucesso!'
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao atualizar status'
      });
    } finally {
      setLoading(false);
    }
  };

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

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString('pt-BR');
    } catch {
      return '-';
    }
  };

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Item não encontrado</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={36} color="white" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Detalhes</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Endereço: {item.address}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Cliente: {item.client}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Telefone: {item.phone}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Data: {item.date} às {item.time}</Text>
          </View>
        </View>

        {item.items && item.items.length > 0 && (
          <View style={styles.itemsCard}>
            <Text style={styles.cardTitle}>Itens</Text>
            {item.items.map((itemDetail, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName}>{itemDetail.name}</Text>
                <Text style={styles.itemWeight}>Peso: {itemDetail.weight}</Text>
                {itemDetail.fragile && (
                  <Text style={styles.fragileText}>⚠️ Frágil</Text>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Ações</Text>
          {item.status === 'PENDING' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.startButton]}
              onPress={() => handleStatusUpdate('IN_PROGRESS')}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.actionButtonText}>Iniciar {isCollect ? 'Coleta' : 'Entrega'}</Text>
              )}
            </TouchableOpacity>
          )}
          
          {item.status === 'IN_PROGRESS' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.completeButton]}
              onPress={() => handleStatusUpdate('COMPLETED')}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.actionButtonText}>Concluir {isCollect ? 'Coleta' : 'Entrega'}</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <Snackbar
        visible={showSnack && !!error}
        onDismiss={() => setShowSnack(false)}
        duration={3000}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2d72d9' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2d72d9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8, color: '#111' },
  statusBadge: { alignSelf: 'flex-start', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 16 },
  statusText: { color: 'white', fontWeight: '700', letterSpacing: 0.5 },
  detailsCard: { backgroundColor: '#f7f9fc', borderRadius: 12, padding: 12, marginBottom: 16 },
  itemsCard: { backgroundColor: '#f7f9fc', borderRadius: 12, padding: 12, marginBottom: 16 },
  actionsCard: { backgroundColor: '#f7f9fc', borderRadius: 12, padding: 12, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#222' },
  description: { color: '#333', marginBottom: 10, lineHeight: 20 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  detailText: { color: '#444' },
  itemRow: { 
    backgroundColor: 'white', 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3'
  },
  itemName: { fontSize: 16, fontWeight: '600', color: '#222' },
  itemWeight: { fontSize: 14, color: '#666', marginTop: 4 },
  fragileText: { fontSize: 12, color: '#FF9800', marginTop: 4 },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  startButton: { backgroundColor: '#2196F3' },
  completeButton: { backgroundColor: '#4CAF50' },
  actionButtonText: { color: 'white', fontWeight: '600' },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 8, color: '#333' },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { fontSize: 16, color: '#c62828', marginBottom: 12 },
  backButton: { color: '#2d72d9', fontWeight: '700' },
});
