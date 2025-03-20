import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useLogto } from "@logto/rn";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import Color from "@/services/Color";
import GlobalApi from "@/services/GlobalApi";
import { UseContext } from "@/context/UseContext";

export default function Landing() {
  const { userData, setUserData } = React.useContext(UseContext);
  const { signIn, signOut, isAuthenticated, getIdTokenClaims } = useLogto();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then(async (userInfo) => {
        // console.log("--", userInfo);

        if (userInfo?.email) {
          console.log("data of user : ", userInfo.email);

          const result = await GlobalApi.getUserByEmail(userInfo.email);
          console.log("data of user : ", userInfo.email);
          // console.log("data of user : ", result.data);
          //  inserting a data
          if (!result) {
            const data = {
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
            };
            // console.log("new user data : ", data);
            const res = await GlobalApi.CreateNewUser(data);
            // console.log("new user", res.data);
            setUserData(res.data);
            router.replace("/(tabs)/Home");
          } else {
            setUserData(result?.data[0]);
            router.replace("/(tabs)/Home");
          }
        }
      });
    }
  }, [isAuthenticated]);
  const imageList = [
    require("../assets/images/1.jpg"),
    require("../assets/images/p1.jpg"),
    require("../assets/images/2.jpg"),
    require("../assets/images/p2.jpg"),
    require("../assets/images/3.jpg"),
    require("../assets/images/4.jpg"),
    require("../assets/images/1.jpg"),
    require("../assets/images/5.jpg"),
    require("../assets/images/p1.jpg"),
    require("../assets/images/6.jpg"),
    require("../assets/images/p2.jpg"),
  ];
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View>
          <View>
            <Marquee
              speed={0.6}
              spacing={10}
              style={{
                transform: [{ rotate: "-5deg" }],
                marginTop: 10,
              }}
            >
              <View style={styles.container}>
                {imageList.map((image, index) => (
                  <Image key={index} source={image} style={styles.image} />
                ))}
              </View>
            </Marquee>
            <Marquee
              speed={0.4}
              spacing={10}
              style={{
                transform: [{ rotate: "-5deg" }],
              }}
            >
              <View style={styles.container}>
                {imageList.map((image, index) => (
                  <Image key={index} source={image} style={styles.image} />
                ))}
              </View>
            </Marquee>
            <Marquee
              speed={0.5}
              spacing={10}
              style={{
                transform: [{ rotate: "-5deg" }],
              }}
            >
              <View style={styles.container}>
                {imageList.map((image, index) => (
                  <Image key={index} source={image} style={styles.image} />
                ))}
              </View>
            </Marquee>
          </View>
        </View>
        <View
          style={{ backgroundColor: Color.WHITE, padding: 10, height: "100%" }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Food Maker AI
          </Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            🍴Find ,create & Enjoy delicious Recipies 🥘!
          </Text>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 16,
              textAlign: "center",
              color: Color.Color,
              marginTop: 10,
            }}
          >
            Find the best recipies from around the world and enjoy the best
            cooking experience.
          </Text>
          <TouchableOpacity
            //
            onPress={async () => signIn("exp://192.168.43.238:8081")}
          >
            <Text style={styles.button}>Get Started</Text>
          </TouchableOpacity>
          {/* <Button title="Sign out" onPress={async () => signOut()} /> */}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    width: 130,
    height: 130,
    margin: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: Color.PRIMARY,
    padding: 10,
    borderRadius: 15,
    marginTop: 100,
    textAlign: "center",
    color: Color.WHITE,
    fontFamily: "outfit-regular",
    fontSize: 20,
  },
});
