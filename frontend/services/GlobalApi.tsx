import axios from "axios";

const axiosclient = axios.create({
  //172.16.18.164
  baseURL: "http://172.16.18.43/api",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
});

const getUserByEmail = async (email: string) => {
  try {
    const res = await axiosclient.get(
      `/user-lists?filter[email][$eq]=${email}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const CreateNewUser = async (data: any) => {
  try {
    const res = await axiosclient.post("/user-lists", { data });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error.message);
    }
    throw error;
  }
};

const catogories = async () => {
  try {
    const res = await axiosclient.get("/categories?populate=*");
    return res.data;
  } catch (error) {
    console.error("Error fetching catogories:", error);
    throw error;
  }
};

const postingRecipe = async (data: any) => {
  try {
    const res = await axiosclient.post("/recipes", { data: data });
    return res.data;
  } catch (error) {
    console.error("Error fetching catogories:", error);
    throw error;
  }
};

const updateUserCredits = async (userData: any, docId: any) => {
  try {
    const res = await axiosclient.put("/user-lists/" + docId, {
      userData: userData,
    });
    return res.data;
  } catch (error) {
    console.log("user id in update credits :", docId);
    console.error("Error updating user credits:", error);
    throw error;
  }
};

const RecipeByCatagory = async (data :any) => {
  try {
    const res = await axiosclient.get("/recipes?filters[category][$contains]=" +data );
    return res;
  } catch (error) {
    console.error("Error fetching RecipeByCatagory :", error);
    throw error;
  }
};

export default {
  getUserByEmail,
  CreateNewUser,
  catogories,
  postingRecipe,
  updateUserCredits,
  RecipeByCatagory,
};
