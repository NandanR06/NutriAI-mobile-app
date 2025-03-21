import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Color from "@/services/Color";
import HomeHeader from "@/components/HomeHeader";
import CreateRecipi from "@/components/CreateRecipi";
import CatogoriesList from "@/components/CatogoriesList";
import { useRouter } from "expo-router";
import GlobalApi from "@/services/GlobalApi";

export default function Home() {
  const [mainData, setMainData] = useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    paginationData();
  }, []);

  const paginationData = async () => {
    setLoading(true);
    const res = await GlobalApi.paginationData();
    // console.log("explore data", res.data);
    setMainData(res.data);
    setLoading(false);
  };
  return (

    <FlatList

    data={[]}
    renderItem={()=>null}
    ListHeaderComponent={
      <ScrollView
      style={{
        backgroundColor: Color.WHITE,
        height: "100%",
        padding: 20,
        marginLeft: -15,
      }}
    >
      {/* hedline */}
      <HomeHeader />
      {/* generating data */}
      <CreateRecipi />
      {/* section */}

    

      <CatogoriesList />

      <Text style={{fontFamily:"outfit-bold",fontSize :18,marginTop:20}}>Latest Recipes</Text>
        {/* list of the recipes */}
      <FlatList
         horizontal={true}
        data={mainData}
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
    </ScrollView>
    }
    
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
    width: 200,
    height: 120, // Slightly reduced for better layout
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
