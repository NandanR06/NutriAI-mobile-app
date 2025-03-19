import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/rn";
import { UseContext } from "@/context/UseContext";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function RootLayout() {
  const [fontLoader] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });
  const [userData, setUserData] = React.useState<any>(null);

  const config: LogtoConfig = {
    endpoint: "https://o1rm5a.logto.app/",
    appId: "r7n426pi20r1rz8i358uy",
    scopes: [UserScope.Email],
  };
  // setUserData({
  //   picture:"",
  //   name:"Nandan R",
  //   email : "nandan6102003@gmail.com",
  //   credits :4
  // })


  return (
    <UseContext.Provider value={{ userData, setUserData }}>
      <LogtoProvider config={config}>
        <Stack>
          <Stack.Screen name="Landing" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="recipe_by_category/index"
            options={{
              headerTransparent: true,
              headerTitle: "",
              headerBackTitle: "",
              headerTintColor: "black",
              headerStyle: {
                backgroundColor: "white",
              },
            }}
          />
          <Stack.Screen
            name="details_of_card/index"
            options={{
              headerTransparent: true,
              headerTitle: "details",
              headerBackTitle: "",
              headerTintColor: "black",
              headerStyle: {
                backgroundColor: "white",
              },
              headerRight: () => (
                <Ionicons name="share-sharp" size={24} color="black" />
              ),
            }}
          />
        </Stack>
      </LogtoProvider>
    </UseContext.Provider>
  );
}
