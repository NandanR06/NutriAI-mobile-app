import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function Tablayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                source={require("../../assets/images/home.webp")}
                style={{
                  width: size,
                  height: size,
                  opacity: focused ? 1 : 0.4,
                }}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                source={require("../../assets/images/explore.png")}
                style={{
                  width: size,
                  height: size,
                  opacity: focused ? 1 : 0.4,
                }}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Foodmaker"
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                source={require("../../assets/images/FoodMaker_Logo.jpg")}
                style={{
                  width: size,
                  height: size,
                  opacity: focused ? 1 : 0.4,
                  borderRadius : 25,
                }}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                source={require("../../assets/images/profile.png")}
                style={{
                  width: size,
                  height: size,
                  opacity: focused ? 1 : 0.4,
                }}
              />
            );
          },
        }}
      />
      
    </Tabs>
  );
}
