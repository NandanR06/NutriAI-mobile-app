import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Color from "@/services/Color";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CreateRecipi from "@/components/CreateRecipi";

export default function RecipeDetails() {
  const { recipeDetails } = useLocalSearchParams();
  const recipeData = recipeDetails ? JSON.parse(recipeDetails as string) : {};

  // console.log("details of the card:", recipeDetails);

  const imageUrl = recipeData?.image
    ?.replace("/o/", "/o/")
    ?.replace(/\/ai-guru-lab-images\//, "/ai-guru-lab-images%2F");

  return (
    <ScrollView>
      <View style={style.container}>
        {/* Image Section */}
        <View>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: "100%",
              height: 270,
              objectFit: "cover",
              marginTop: 10,
              borderRadius: 20,
            }}
          />
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
              {recipeData.recipeName}
            </Text>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 17, marginTop: 3 }}>
              Description
            </Text>
            <Text style={{ fontFamily: "outfit-regular", fontSize: 15, color: "gray" }}>
              {recipeData.description}
            </Text>
          </View>

          {/* Nutrition Info */}
          <View style={style.infoRow}>
            <View style={style.infoBox}>
              <Entypo name="leaf" size={24} color="green" />
              <View>
                <Text style={{ fontFamily: "outfit-bold" }}>
                  {recipeData?.calories} cal
                </Text>
                <Text style={{ fontFamily: "outfit-regular" }}>Calories</Text>
              </View>
            </View>

            <View style={style.infoBox}>
              <Ionicons name="people-sharp" size={24} color="green" />
              <View>
                <Text style={{ fontFamily: "outfit-bold" }}>
                  {recipeData?.serveTo} serve
                </Text>
                <Text style={{ fontFamily: "outfit-regular" }}>Servings</Text>
              </View>
            </View>

            <View style={style.infoBox}>
              <MaterialCommunityIcons name="clock" size={24} color="green" />
              <View>
                <Text style={{ fontFamily: "outfit-bold" }}>
                  {recipeData?.cookTime} min
                </Text>
                <Text style={{ fontFamily: "outfit-regular" }}>Cook Time</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <View style={style.row}>
            <Text style={style.sectionTitle}>Ingredients</Text>
            <Text style={style.sectionTitle}>
              {recipeData?.ingredients?.length} Items
            </Text>
          </View>

          {recipeData?.ingredients?.map((item: any, index: number) => (
            <View key={index} style={style.ingredientRow}>
              {/* Left Section */}
              <View style={style.row}>
                <Text style={style.iconBox}>{item?.icon}</Text>
                <Text style={style.ingredientText}>{item?.ingredient}</Text>
              </View>
              {/* Right Section */}
              <Text style={style.ingredientText}>{item?.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Steps Section */}
        <View>
          <Text style={style.sectionTitle}>Steps</Text>
          {recipeData?.steps?.map((item: string, index: number) => (
            <View key={index} style={style.stepBox}>
              <Text style={style.stepNumber}>{index + 1}.</Text>
              <Text style={style.stepText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Final Section */}
        <Text style={style.finalText}>Let's make your recipe</Text>
        <CreateRecipi />
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    height: "100%",
    backgroundColor: "white",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.SECONDARY,
    borderRadius: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontFamily: "outfit-bold",
    fontSize: 17,
    marginTop: 3,
  },
  ingredientRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  ingredientText: {
    fontFamily: "outfit-regular",
    fontSize: 17,
    marginTop: 3,
  },
  iconBox: {
    fontSize: 17,
    marginTop: 3,
    backgroundColor: Color.SECONDARY,
    borderRadius: 20,
    padding: 5,
  },
  stepBox: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 20,
    flexDirection: "row",
    padding: 13,
    marginBottom: 10,
    alignItems: "center",
    gap: 10,
    paddingRight: 20,
  },
  stepNumber: {
    fontSize: 17,
    backgroundColor: Color.SECONDARY,
    borderRadius: 10,
    padding: 5,
  },
  stepText: {
    fontFamily: "outfit-regular",
    borderRadius: 10,
    padding: 5,
    paddingRight: 20,
    fontSize: 17,
  },
  finalText: {
    fontFamily: "outfit-bold",
    fontSize: 17,
    marginTop: 6,
    marginBottom: 3,
    textAlign: "center",
  },
});

