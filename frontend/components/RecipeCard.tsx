import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function RecipeCard({ item }: any) {
  const router = useRouter();

  return (
    <FlatList
      numColumns={2}
      data={item}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/details_of_card",
              params: { recipeDetails: JSON.stringify(item) },
            });
          }}
          style={styles.cardContainer}
        >
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: item?.image }} style={styles.image} />
            <Text style={styles.background}>{item?.recipeName}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10, // Space on left & right
    paddingBottom: 20, // Space at bottom
  },
  cardContainer: {
    flex: 1,
    padding: 10, // Space around each card
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: "relative", // To position text overlay correctly
  },
  image: {
    width: "100%",
    height: 200, // Slightly reduced for better layout
    borderRadius: 20,
    resizeMode: "cover",
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "white",
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
