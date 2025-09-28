import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collects, setCollects] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Carrega usuário salvo no AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          // Configurar o token para futuras requisições
          api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        }
      } catch (e) {
        console.log('Erro ao carregar user:', e);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Faz login e salva localmente
  const login = async (email, token) => {
    const loggedUser = { email, token };
    setUser(loggedUser);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    // Configurar o token para futuras requisições
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Faz logout e remove do AsyncStorage
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setCollects([]);
    setDeliveries([]);
    await AsyncStorage.removeItem('user');
    // Remove token das requisições
    delete api.defaults.headers.common['Authorization'];
  };

  // Carrega dados de coletas
  const loadCollects = async () => {
    try {
      const response = await api.get('/api/collects');
      setCollects(response.data);
    } catch (error) {
      console.log('Erro ao carregar coletas:', error);
    }
  };

  // Carrega dados de entregas
  const loadDeliveries = async () => {
    try {
      const response = await api.get('/api/deliveries');
      setDeliveries(response.data);
    } catch (error) {
      console.log('Erro ao carregar entregas:', error);
    }
  };

  // Atualiza status de uma coleta
  const updateCollectStatus = async (id, status) => {
    try {
      const response = await api.patch(`/api/collects/${id}/status`, { status });
      setCollects(prev => prev.map(collect => 
        collect.id === id ? { ...collect, status } : collect
      ));
      return response.data;
    } catch (error) {
      console.log('Erro ao atualizar coleta:', error);
      throw error;
    }
  };

  // Atualiza status de uma entrega
  const updateDeliveryStatus = async (id, status) => {
    try {
      const response = await api.patch(`/api/deliveries/${id}/status`, { status });
      setDeliveries(prev => prev.map(delivery => 
        delivery.id === id ? { ...delivery, status } : delivery
      ));
      return response.data;
    } catch (error) {
      console.log('Erro ao atualizar entrega:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      isAuthenticated,
      collects,
      deliveries,
      loadCollects,
      loadDeliveries,
      updateCollectStatus,
      updateDeliveryStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};
