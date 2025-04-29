// UploadToCloudinary.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import LoadingDialoug from "@/components/LoadingDialoug";
import Color from "@/services/Color";
import { router } from "expo-router";
import Aimodel from "@/services/Aimodel";
import Promt from "@/services/Promt";
import { useRouter } from "expo-router";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useRef } from "react";
import ImageGenerater from "@/services/ImageGenerater";
import GlobalApi from "@/services/GlobalApi";
import { UseContext } from "@/context/UseContext";


interface Recipe {
  recipeName: string;
  description: string;
}

export default function VisionCameraScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
  const [permission, setPermission] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<any[]>([]);
  const [recipeImageInfo, setRecipeImageInfo] = useState<string>("");
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [openLoading, setopenLoading] = useState<boolean>(false);
  const [recipeFullInfo, setRecipeFullInfo] = useState<any>([]);
    const { userData, setUserData } = useContext(UseContext);
  
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        Alert.alert(
          "Permission required",
          "We need camera permission to continue"
        );
      }
    })();
  }, []);

  const captureImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setImageUri(image.uri);
      setPermission(true);

      // await uploadToCloudinary(image.uri);
    }
  };

  const permissionToUpload = async () => {
    await uploadToCloudinary(imageUri as string);
    await generateRecipe();
  };

  const generateRecipe = async () => {
    setLoading(true);

    try {
      const res = await Aimodel.chatbot(
        `${cloudinaryUrl} ,${Promt.GENERATE_OPTION_PROMPT_URL}`
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
          image: cloudinaryUrl,
          userEmail: userData?.email,
        };
        
          const res = await GlobalApi.postingRecipe(data);
          // console.log( "saved data in the database : : ",res.data);
          const fullData = res.data;
          return fullData;
          
      };
  const uploadToCloudinary = async (uri: string) => {
    setUploading(true);
    const data = new FormData();

    data.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any);

    data.append("upload_preset", "nutry_Food");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhsrizzay/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const json = await res.json();
      if (json.secure_url) {
        setCloudinaryUrl(json.secure_url);
        console.log("Image uploaded to Cloudinary:", json.secure_url);
        // Alert.alert("Upload Success", "Image uploaded to Cloudinary");
      } else {
        throw new Error("Upload failed: " + JSON.stringify(json));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      Alert.alert("Error", "Failed to upload image");
    }

    setUploading(false);
  };

  return (
    <View style={styles.container1}>
      {uploading && <LoadingDialoug visible={uploading} />}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {/* {cloudinaryUrl && (
        <View style={{ marginTop: 10 }}>
          <Button
            title="Open Cloudinary Image"
            onPress={() => {
              Alert.alert("Cloudinary URL", cloudinaryUrl);
            }}
          />
        </View>
      )} */}
      <View
        style={{
          marginTop: 20,
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        

        {permission && (
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              paddingHorizontal: 30,

              backgroundColor: "green",
              borderRadius: 5,
            }}
            onPress={permissionToUpload}
          >
            <Text
              style={{
                color: Color.WHITE,
                fontSize: 16,
                fontFamily: "outfit-bold",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* ---------------------------active sheet for the 3 information of the data  ----------------------- */}
      <View>
        <LoadingDialoug visible={loading} />
        <ActionSheet ref={actionSheetRef}>
          <View style={styles.actionContiner}>
            <Text style={styles.actionHeader}>Select Recipes</Text>
            <View>
              {recipeList.map((item: Recipe) => (
                <TouchableOpacity
                   onPress={() => generateRecipeInfo(item.recipeName)}
                  key={item.recipeName}
                  style={styles.actionRecipes}
                >
                  <Text style={styles.actionRecipe}>{item.recipeName}</Text>
                  <Text style={styles.actionDiscription}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ActionSheet>
      </View>
      <TouchableOpacity
          onPress={captureImage}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            backgroundColor: "#007BFF",
            borderRadius: 5,
          }}
        >
          {!permission ? (
            <Text style={{ color: "#fff", fontSize: 16 }}>Capture Image</Text>
          ) : (
            <Text style={{ color: "#fff", fontSize: 16 }}> ReCapture</Text>
          )}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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

  container1: {
    display: "flex",
    margin: 7,
    marginTop: 20,
    // backgroundColor: Color.SECONDARY,
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
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 400,
    borderRadius: 10,
  },
});
