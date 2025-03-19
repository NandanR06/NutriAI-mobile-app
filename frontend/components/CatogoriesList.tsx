import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import GlobalApi from "@/services/GlobalApi";
import { useRouter } from "expo-router";

export default function CatogoriesList() {
  const [catagories, setCatagories] = React.useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    catogoriesData();
  }, []);

  const catogoriesData = async () => {
    const res = await GlobalApi.catogories();
    // console.log("catagories : ", res.data);
    setCatagories(res.data);
  };
  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 18,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Catogories
      </Text>
      <FlatList
        numColumns={5}
        style={{ flexWrap: "wrap", flexDirection: "row" }}
        data={catagories}
        renderItem={({ item }: any) => (
          <TouchableOpacity onPress={()=>router.push({
            pathname:'/recipe_by_category',
            params :{catagoriesNmae : item?.name}
          })}
            style={{
              flex: 1,
              margin: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item?.image?.url }}
              style={{ width: 60, height: 60, objectFit: "contain" ,backgroundColor: "transparent" }}
            />
            <Text style={{ fontFamily: "outfit-regular" }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const style = StyleSheet.create({
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
