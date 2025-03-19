import axios from "axios";

const BASE_URL = "https://aigurulab.tech";

const GenerateImage = async (image: String, setRecipeImageInfo: any) => {
  const res = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: image,
      model: "sdxl", //'flux'
      aspectRatio: "1:1", //Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_IMAGE_GENERATER_API_KEY, // Your API Key
        "Content-Type": "application/json", // Content Type
      },
    }
  );
  let data = res.data.image; //Output Result: Base 64 Image
  setRecipeImageInfo(res.data.image);
  //   console.log("url of the food", res.data.image);
  return data;
};

export default {
  GenerateImage,
};
