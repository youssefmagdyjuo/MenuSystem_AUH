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
//update category
export const updateCategory = async (id, category) => {
    try {
        await axios.put(`/v1/api/categories/${id}`, category);
    } catch (error) {
        console.log(error)
    }
}
// edit Category Availability
export const editCategoryAvailability = async (id, isAvailable) => {
    try {
        await axios.put(`/v1/api/categories/availablity/${id}`, isAvailable);
    } catch (error) {
        console.log(error)
    }
}
//delete category
export const deleteCategory = async (id) => {
    try {
        await axios.delete(`/v1/api/categories/${id}`);
    } catch (error) {
        console.log(error)
    }
}
