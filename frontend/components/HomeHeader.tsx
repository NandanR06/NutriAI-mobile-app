import { View, Text, Image, Switch } from "react-native";
import React, { useContext, useState } from "react";
import { UseContext } from "@/context/UseContext";

export default function HomeHeader() {
  const { userData: user } = useContext(UseContext);
  const [isEnable, setIsEnable] = useState<boolean>(false);
  let data: string;

  // if (user.profile == " ") {
  //   data = user?.profile;
  // } else {
    data = require("../assets/images/profile.png");
  // }

  return (
    <View  style = {{flexDirection :'row', alignItems :"center",justifyContent :"space-between"}}>
      <View style={{ alignItems: "center", flexDirection: "row", gap: 8 }}>
        <Image
          source={require("../assets/images/profile.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
          Hello, 
          {/* {user.name} */}
          Nandan R
        </Text>
      </View>
      <View style = {{alignItems : "center", flexDirection : 'row'}}>
        <Text style = {{fontFamily : 'outfit-bold'}}>{isEnable ? "Veg" : "Non-Veg"}</Text>
        <Switch
          value={isEnable}
          onValueChange={() => setIsEnable((pre) => !pre)}
        />
      </View>
    </View>
  );
}
