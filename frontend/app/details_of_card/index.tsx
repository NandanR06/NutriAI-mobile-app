import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function recipeDetails() {
  const { recipeDetails } = useLocalSearchParams();
  const recipeData = JSON.parse(recipeDetails as string);

  return (
    <View>
      {/* image intro starts here */}
      <View>
        <Image
          source={{
            uri: recipeData.image.replace(
              "ai-guru-lab-images/",
              "ai-guru-lab-images%2f"
            ),
          }}
        />
        <View>
          <Text>{recipeData?.recipeName}</Text>
          <Text>{recipeData?.description}</Text>
        </View>

        <View>
          <View>{recipeData?.calories} cal</View>
        </View>
      </View>
      {/* image intro ends herer */}
      {/* --------------------------------------------------------------------------------- */}
      {/* ingradients info starts here  */}
      <View>
        {recipeData?.ingredients.map((item: any, index: any) => (
          <View>
            {/* left data */}
            <View>
              <Text>{item?.icon}</Text>
              <Text>{item?.ingredient}</Text>
            </View>
            {/* right data */}
            <View>
              <Text>{item?.quantity}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* ingradients info ends here  */}

      {/* ----------------------------------------------------------------- */}
      {/* steps starts here  */}
      <View>
        {recipeData?.steps.map((item: any) => (
          <View
            style={{ borderWidth: 2, borderColor: "gray", borderRadius: 20 }}
          >
            {item}
          </View>
        ))}
      </View>
      {/* steps ends here  */}
    </View>
  );
}

const style = StyleSheet.create({
  container: {},
  introContainer: {},
  image: {},
  nameDec: {},
  intobottomInfo: {},
});
