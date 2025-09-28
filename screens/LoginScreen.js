import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert, ActivityIndicator
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !senha) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Por favor, preencha todos os campos.'
        });
        return;
      }

      setLoading(true);

      // Autenticação com Spring Boot
      const response = await api.post('/auth/login', { email, senha });
      const { token } = response.data;
      
      if (!token) {
        throw new Error('Token não recebido');
      }

      await login(email, token);
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Login realizado com sucesso!'
      });
    } catch (error) {
      console.error('[Login] Erro geral:', error?.message);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Email ou senha incorretos'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>LOGO</Text>
      </View>
      <Text style={styles.title}>Sign In</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="name@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="********"
          secureTextEntry={!showPassword}
          value={senha}
          onChangeText={setSenha}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#333"
            style={styles.eyeIcon}
          />
        </Pressable>
      </View>

      <TouchableOpacity 
        style={[styles.button, { opacity: loading ? 0.7 : 1 }]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#333" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Forgot Password?</Text>
        <Text style={[styles.footerText, { fontWeight: 'bold' }]}>Sign Up</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2d72d9', padding: 24, justifyContent: 'center' },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', alignSelf: 'center', marginBottom: 30, justifyContent: 'center', alignItems: 'center' },
  logoText: { fontWeight: 'bold', fontSize: 18 },
  title: { color: '#fff', fontSize: 28, marginBottom: 30, textAlign: 'left', fontWeight: 'bold' },
  label: { color: '#fff', marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 20 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 5, paddingRight: 10, marginBottom: 20 },
  inputPassword: { flex: 1, padding: 10 },
  eyeIcon: { marginLeft: 5 },
  button: { backgroundColor: '#ccc', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#333', fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  footerText: { color: '#fff' }
});
