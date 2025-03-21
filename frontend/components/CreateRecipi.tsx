import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import Color from "@/services/Color";
import Button from "./Button";
import Aimodel from "@/services/Aimodel";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LoadingDialoug from "./LoadingDialoug";
import Promt from "@/services/Promt";
import ImageGenerater from "@/services/ImageGenerater";
import GlobalApi from "@/services/GlobalApi";
import { UseContext } from "@/context/UseContext";
import { useRouter } from "expo-router";

interface Recipe {
  recipeName: string;
  description: string;
}

export default function CreateRecipi() {
  const [inputVal, setInputVal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openLoading, setopenLoading] = useState<boolean>(false);
  const [recipeFullInfo, setRecipeFullInfo] = useState<any>([]);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [recipeList, setRecipeList] = useState<any[]>([]);
  const [recipeImageInfo, setRecipeImageInfo] = useState<string>("");
  const { userData, setUserData } = useContext(UseContext);
  const router = useRouter();

  // generating the recipe list
  const generateRecipe = async () => {
    setLoading(true);

    try {
      const res = await Aimodel.chatbot(
        `${inputVal} ,${Promt.GENERATE_OPTION_PROMPT}`
      );

      if (!res || typeof res !== "string") {
        throw new Error("Network error please try again");
      }

      // Find JSON portion in response
      const jsonStart = res.indexOf("[");
      const jsonEnd = res.lastIndexOf("]") + 1;

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("Malformed JSON detected.");
      }

      const validJson = res
        .substring(jsonStart, jsonEnd)
        .replace(/,\s*}/g, "}") // Fix trailing commas
        .replace(/,\s*]/g, "]"); // Fix array-ending commas

      // Attempt to parse the cleaned JSON
      let parsedData;
      try {
        parsedData = JSON.parse(validJson);
      } catch (error) {
        console.error("JSON Parsing Error:", error);
        throw new Error("Invalid JSON structure.");
      }

      // Ensure parsed data is an array
      if (!Array.isArray(parsedData)) {
        throw new Error("Parsed JSON is not an array.");
      }

      setRecipeList(parsedData);
      // console.log("AI Raw Response in recipeList:", recipeList);
      // Set the cleaned recipe list
      actionSheetRef.current?.show();
    } catch (error) {
      console.error("Error in AI response handling:", error);
      Alert.alert("⚠️ Error processing AI data.");
    } finally {
      setLoading(false);
    }
  };

  // generating the full information of the recipe information
  const generateRecipeInfo = async (option: any) => {
    actionSheetRef.current?.hide();
    setopenLoading(true);
    const promt = `Recipe name :${option.recipeName} and Discription: ${option.description} and ${Promt.GENERATE_COMPLETE_RECIPE} `;

    try {
      const res = await Aimodel.chatbot(promt);

      if (!res || typeof res !== "string") {
        throw new Error("Network error please try again");
      }

      // Find JSON portion in response
      const jsonStart = res.indexOf("[");
      const jsonEnd = res.lastIndexOf("]") + 1;

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("Malformed JSON detected.");
      }

      const validJson = res
        .substring(jsonStart, jsonEnd)
        .replace(/,\s*}/g, "}") // Fix trailing commas
        .replace(/,\s*]/g, "]"); // Fix array-ending commas

      // Attempt to parse the cleaned JSON
      let parsedData;
      try {
        parsedData = JSON.parse(validJson);
      } catch (error) {
        console.error("JSON Parsing Error:", error);
        throw new Error("Invalid JSON structure.");
      }

      // Ensure parsed data is an array
      if (!Array.isArray(parsedData)) {
        throw new Error("Parsed JSON is not an array.");
      }

      setRecipeFullInfo(parsedData);
      // console.log("AI Raw Response in recipeFullInfo :", recipeFullInfo);
      let imageInfo: string = parsedData[0]?.imagePrompt || " ";
      if (imageInfo === " ") Alert.alert("Network error please try again");
      // ();
      // console.log("image Discription : ", imageInfo);

      ImageGenerater.GenerateImage(imageInfo, setRecipeImageInfo);
      // console.log("image url : ", recipeImageInfo);
      
      // saving the data in the data base
     const res1 = await saveData(recipeFullInfo, recipeImageInfo);
     console.log("data saved in the database ::::: ", res1);
     router.push({
      pathname: "/details_of_card",
      params: {recipeDetails:JSON.stringify(res1)},
    });

      // console.log("recipi data fill", recipeFullInfo);
      // Set the cleaned recipe list
    } catch (error) {
      console.error("Error in AI response handling:", error);
      Alert.alert("⚠️ Error processing AI data.");
    } finally {
      setopenLoading(false);
    }
  };

  // save  the data in the data base
  const saveData = async (jsondata: any, imageURL: string) => {
    const data = {
      calories: jsondata[0].calories,
      cookTime: jsondata[0].cookTime,
      description: jsondata[0].description,
      imagePrompt: jsondata[0].imagePrompt,
      recipeName: jsondata[0].recipeName,
      serveTo: jsondata[0].serveTo,
      steps: jsondata[0].steps,
      category: jsondata[0].category,
      ingredients: jsondata[0].ingredients,
      image: imageURL,
      userEmail: userData?.email,
    };
    // console.log("data to be saved in the database : ", data);
    

    // console.log("context data :", userData);

    // if (
    //   userData &&
    //   typeof userData?.credits === "number" &&
    //   userData.credits > 0
    // ) {
    //   const userUpdateInfo = {
    //     picture: userData.picture,
    //     name: userData.name,
    //     email: userData.email,
    //     prefrence: userData.prefrence,
    //     credits: userData.credits - 1,
    //   };
      // const updatedCredits = Math.max(userData.credits - 1, 0); // Prevent negative values

      const res = await GlobalApi.postingRecipe(data);
      // console.log( "saved data in the database : : ",res.data);
      const fullData = res.data;
      return fullData;
      // fetching the user id from the context
      // setUserData(userUpdateInfo);

      //  updating the credits of the user
      // const res2 = await GlobalApi.updateUserCredits(
      //   userUpdateInfo,
      //   userData?.documentId
      // );
      // console.log("user Credit updated :", res2);

      
    // } else {
    //   console.log("user Credits are full");
    // }

    // console.log("context data :", userData);
    // console.log("userUpdateInfo :", userUpdateInfo);
    // console.log("userId :", userId);

    //  console.log("saved data in database : ", res);
    //  console.log('dummy data : ', data);
  };

  return (
    <View style={style.container}>
      <Image style={style.pan} source={require("../assets/images/pan.png")} />
      <Text style={style.text}>Worm up your Store,and let's get Cooking!</Text>
      <Text style={style.subText}>Make something for your LOVE</Text>
      <TextInput
        onChangeText={(val) => {
          setInputVal(val);
        }}
        style={style.textInput}
        multiline={true}
        numberOfLines={3}
        placeholder="What you want to cook today?"
      />
      <Button
        lable={"Generate Recipe"}
        icon={"sparkles"}
        loading={loading}
        onpress={() => {
          console.log("Generate Recipe", inputVal);
          generateRecipe();
        }}
      />

      {/* loading content */}

      <LoadingDialoug visible={openLoading} />
      {/* action tabs for the recipes */}
      <ActionSheet ref={actionSheetRef}>
        <View style={style.actionContiner}>
          <Text style={style.actionHeader}>Select Recipes</Text>
          <View>
            {recipeList.map((item: Recipe) => (
              <TouchableOpacity
                onPress={() => generateRecipeInfo(item)}
                key={item.recipeName}
                style={style.actionRecipes}
              >
                <Text style={style.actionRecipe}>{item.recipeName}</Text>
                <Text style={style.actionDiscription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ActionSheet>
    </View>
  );
}

const style = StyleSheet.create({
  actionRecipe: {
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  actionDiscription: {
    fontFamily: "outfit-regular",
  },
  actionRecipes: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 8,
  },
  actionContiner: {
    padding: 20,
    margin: 5,
  },
  actionHeader: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },

  container: {
    display: "flex",
    margin: 7,
    marginTop: 20,
    backgroundColor: Color.SECONDARY,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "100%",
  },
  pan: {
    width: 50,
    height: 50,
  },
  text: {
    marginTop: 10,
    fontFamily: "outfit-regular",
    textAlign: "center",
    fontSize: 20,
  },
  subText: {
    fontFamily: "outfit-regular",
    textAlign: "center",
  },
  textInput: {
    marginTop: 5,
    backgroundColor: Color.WHITE,
    textAlignVertical: "top",
    width: "100%",
    borderRadius: 15,
    height: 120,
    padding: 15,
    fontSize: 16,
  },
});
