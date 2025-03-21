import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import { UseContext } from "@/context/UseContext";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "@/services/Color";

export default function Foodmaker() {
  const [recipies, setRecipies] = useState();
  const [tag, setTag] = useState(false);
  const { userData } = useContext(UseContext);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    recipesData();
  }, []);
  const recipesData = async () => {
    // todo
    setIsFetching(true);
    const res = await GlobalApi.getRecipeByEmail(userData?.email);
    setRecipies(res);
    setIsFetching(false);
  };

  const savedData = async () => {
    setIsFetching(true);

    const res = await GlobalApi.sevedRecipeByUser(userData?.email);
    setRecipies(res.data);
    setIsFetching(false);
  };

  return (
    <View style={{ padding: 20, backgroundColor: Color.WHITE, height: "100%" }}>
      <Text style={{ fontSize: 30, fontFamily: "outfit-bold" }}>Foodmaker</Text>
      {/* headline */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={(pre) => {
            setTag(true);
            recipesData();
          }}
          style={[
            { flexDirection: "row", gap: 10, alignItems: "center" },
            tag ? { opacity: 1 } : { opacity: 0.4 },
          ]}
        >
          <Ionicons name="sparkles" size={24} color="black" />
          <Text style={{ fontSize: 20, fontFamily: "outfit-regular" }}>
            Your Recipe
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(pre) => {
            setTag(false);
            savedData();
          }}
          style={[
            { flexDirection: "row", gap: 10, alignItems: "center" },
            !tag ? { opacity: 1 } : { opacity: 0.4 },
          ]}
        >
          <FontAwesome name="bookmark" size={24} color="black" />
          <Text style={{ fontSize: 20, fontFamily: "outfit-regular" }}>
            Saved
          </Text>
        </TouchableOpacity>
      </View>
      {/* recipe contents */}
      <View>
        <FlatList
        refreshing={isFetching}
        onRefresh={recipesData}
          numColumns={2}
          data={recipies}
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
          keyExtractor={(item) =>
            item?.id?.toString() || Math.random().toString()
          }
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
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
