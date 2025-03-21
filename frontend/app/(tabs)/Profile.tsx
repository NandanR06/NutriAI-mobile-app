import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

import { UseContext } from "@/context/UseContext";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useLogto } from "@logto/rn";
export default function Profile() {
  const { userData } = React.useContext(UseContext);
  const router = useRouter();
  const { signOut } = useLogto();
  const navigation = useNavigation();


  const choiceOption =async (item: any) => {
    if (item.path === "Logout") {
      console.log("logout");
     await signOut();
     navigation.reset({
      index: 0,
      routes: [{ name: 'Landing' as never }],
    });
    } else {
      router.replace(item.path);
    }
  };
  const Option = [
    {
      name: "Create new Recipe",
      icon: <Entypo name="star" size={24} color="black" />,
      path: "/(tabs)/Home",
    },
    {
      name: "My Recipes",
      icon: <MaterialCommunityIcons name="food" size={24} color="black" />,
      path: "/(tabs)/Foodmaker",
    },
    {
      name: "Browse More Recipes",
      icon: <Ionicons name="fast-food" size={24} color="black" />,
      path: "/(tabs)/Explore",
    },

    {
      name: "Logout",
      icon: <MaterialCommunityIcons name="logout" size={24} color="black" />,
      path: "Logout",
    },
  ];
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25, padding: 30 }}>
        Profile
      </Text>

      <View
        style={{ padding: 20, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          style={{ width: 80, height: 80 }}
          source={require("../../assets/images/profile.png")}
        />
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 20, paddingTop: 10 }}
        >
          {userData?.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit-regular", color: "gray", fontSize: 15 }}
        >
          {userData?.email}
        </Text>
      </View>
      <View>
        <FlatList
          data={Option}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                choiceOption(item);
              }}
              style={{
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                {item.icon}
              </Text>
              <Text style={{ fontFamily: "outfit-regular", fontSize: 20 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
