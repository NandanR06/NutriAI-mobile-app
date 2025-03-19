import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Color from "@/services/Color";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Button({
  lable,
  onpress,
  icon = "",
  loading = false,
}: any) {
  return (
    <View>
      <TouchableOpacity onPress={onpress} disabled={loading}>
        <Text
          style={{
            display :'flex',
            backgroundColor: Color.PRIMARY,
            paddingHorizontal: 73,
            paddingVertical: 10,
            width: "100%",
            borderRadius: 15,
            marginTop: 10,
          textAlign: "center",
            color: Color.WHITE,
            fontFamily: "outfit-regular",
            fontSize: 20,
          }}
        >
          <View>
            {loading ? (
              <ActivityIndicator color={Color.WHITE} style = {{marginBottom: -4}} />
            ) : (
              <Ionicons name={icon} size={20} color="white"  style = {{marginBottom: -4}}/>
            )}
          </View>
          <Text>{loading ? "  Generating....." : lable}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
