import { Redirect } from "expo-router";
import React from "react";
import {  View,Text } from "react-native";

 export default function Index() {

  return (
     <View
       style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       <Redirect href="/Landing" />
    </View>
  );
 }



