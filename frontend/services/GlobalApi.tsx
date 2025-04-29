import axios from "axios";

const axiosclient = axios.create({
  //172.16.18.164
  baseURL: "http://192.168.81.60:1337/api",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
});

const getUserByEmail = async (email: string) => {
  try {
    const res = await axiosclient.get(
      `/user-lists?filters[email][$eq]=${email}`
    );

    console.log("res in get user by email :", res.data);

    return res.data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching user:", error.message);
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

const RecipeByCatagory = async (data: any) => {
  try {
    const res = await axiosclient.get(
      "/recipes?filters[category][$contains]=" + data
    );
    return res;
  } catch (error) {
    console.error("Error fetching RecipeByCatagory :", error);
    throw error;
  }
};

const exploreData = async () => {
  try {
    const res = await axiosclient.get("/recipes?sort[1]=id:desc");
    return res.data;
  } catch (error) {
    console.error("Error fetching exploread data ::: :", error);
    throw error;
  }
};

const paginationData = async () => {
  try {
    const res = await axiosclient.get(
      "/recipes?sort[1]=id:desc&pagination[page]=1&pagination[pageSize]=10"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching exploread data ::: :", error);
    throw error;
  }
};

const getRecipeByEmail = async (email: string) => {
  try {
    const res = await axiosclient.get(
      `/recipes?filters[userEmail][$eq]=${email}`
    );
    // console.log("res in getRecipeByEmail api :", res.data.data);

    return res.data.data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching  getRecipeByEmail:", error.message);
    throw error;
  }
};

const putSaverRecipeByUser = async (data: any, id: any) => {
  try {
    const res = await axiosclient.put("/recipes/" + id, { data });
    return res.data
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching  saverRecipeByUser:", error.message);
    throw error;
  }
};
const sevedRecipeByUser = async (email: string) => {
  try {
    const res = await axiosclient.get(
      `/recipes?filters[savedUsers][$contains]=${email}`
    );
    return res.data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching sevedRecipeByUser :", error.message);
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
  exploreData,
  paginationData,
  getRecipeByEmail,
  putSaverRecipeByUser,
  sevedRecipeByUser,
};
