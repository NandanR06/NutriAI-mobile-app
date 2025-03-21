import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import GlobalApi from "@/services/GlobalApi";
import { useRouter } from "expo-router";

export default function CatogoriesList() {
  const [catagories, setCatagories] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();


  useEffect(() => {
    catogoriesData();
  }, []);

  const catogoriesData = async () => {
    setLoading(true);
    const res = await GlobalApi.catogories();
    // console.log("catagories : ", res.data);
    setCatagories(res.data);
    setLoading(false);

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
      <View>
      <FlatList
         numColumns={5}
        refreshing={loading}
        onRefresh={catogoriesData}
        data={catagories}
        renderItem={({ item }: any) => (
          <TouchableOpacity onPress={()=>router.push({
            pathname:'/recipe_by_category',
            params :{catagoriesNmae : item?.name}
          })}
            style={{
            
              backgroundColor: "white",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",

            }}
          >
            <Image
              source={{ uri: item?.image?.url }}
              style={{ width: 50, height: 50 ,backgroundColor: "transparent",objectFit :"contain" }}
            />
            <Text style={{ fontFamily: "outfit-regular" }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      </View>
      
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
