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
    <View>
      <FlatList
        numColumns={2}
        data={item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/details_of_card",
                params: { recipeDetails : JSON.stringify(item) },
              });
            }}
            style={{ padding: 5, flex: 1 }}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item?.image }} style={styles.image} />
            </View>

            <View>
              <Text style={styles.background}>{item?.recipeName}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) =>
          item?.id?.toString() || Math.random().toString()
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 20,
     overflow: "hidden", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    objectFit: "cover",
  },
  background: {
    position: "absolute",
    bottom: 3,
    padding: 5,
    color: "white",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
