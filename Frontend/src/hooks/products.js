import axios from 'axios';
import i18n from '../i18n';
// Utility function to capitalize the first letter of each word in a string
export const capitalizeWords = (text) => {
    // If the text is not a string or if the current language is Arabic, return it as is (since Arabic doesn't use capitalization)
    if (typeof text !== "string" || i18n.language === "ar") return text;
    return text
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};


// Function to fetch products from the backend API
export const getProducts = async () => {
    try {
        const lang = i18n.language || "en";
        const response = await axios.get(`/v1/api/products?lang=${lang}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};



