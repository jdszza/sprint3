import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function MoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={36} color="white" />
      </View>

      <Text style={styles.title}>More</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.buttonText}>• Dashboard de operações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Agendamento")}
      >
        <Text style={styles.buttonText}>• Tela de agendamento de coleta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Rota")}
      >
        <Text style={styles.buttonText}>• Tela de acompanhamento de rota</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Eficiencia")}
      >
        <Text style={styles.buttonText}>
          • Tela de relatório de eficiência energética
        </Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="list" size={20} color="white" />
          <Text style={styles.navText}>Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Map")}
        >
          <Ionicons name="map" size={20} color="white" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("More")}
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
    backgroundColor: "#2d72d9",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4183dd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#2d72d9",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "white",
    marginTop: 4,
  },
});
