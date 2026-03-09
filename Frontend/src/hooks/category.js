import axios from "axios"
//fetch all categories
export const getCategories = async () => {
    try {
        const response = await axios.get(`/v1/api/categories`);
        return response.data.data;
    } catch (error) {
        console.log(error)

    }
}
//add new category
export const addCategory = async (category) => {
    try {
        await axios.post(`/v1/api/categories`, category);
    } catch (error) {
        console.log(error)
    }
}
