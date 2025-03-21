import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import GlobalApi from "@/services/GlobalApi";
import RecipeCard from "@/components/RecipeCard";

export default function RecipeByCatagory() {
  const catagoryName = useGlobalSearchParams().catagoriesNmae;
  const [recipe, setRecipi] = useState<any>([]);

  useEffect(() => {
    const recipe = async () => {
      const res = await GlobalApi.RecipeByCatagory(catagoryName);
      // const data = res.data.data;
      // console.log("RecipeByCatagory", res.data.data);
      setRecipi(res.data.data);
      // console.log("RecipeByCatagory", res.data.data);
    };
    recipe();
  }, [catagoryName]);

  return (
    <View
      style={{
        paddingTop: 50,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 22,
          marginTop: 10,
          marginBottom: 10,
          paddingLeft :20
        }}
      >
        Browse {catagoryName} recipe
      </Text>

      <View >
        <RecipeCard item={recipe} />
        {/* <Text>RecipeByCatagory</Text> */}
      </View>
    </View>
  );
}
