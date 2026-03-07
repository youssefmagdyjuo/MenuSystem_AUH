import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                menu: "Menu",
                products: "Products",
                product: "Product",
                price: "Price (L.E)",
                category: "Category",
                categories: "Categories",
                download: "Download",
                name: "Name",
                description: "Description",
                users: "Users",
                more: "More",
                add:"Add",
                new: "New"

            }
        },
        ar: {
            translation: {
                menu: "القائمة",
                products: "المنتجات",
                product: "منتج",
                price: "السعر (ج.م)",
                category: "التصنيف",
                categories: "التصنيفات",
                download: "تنزيل ",
                name: "الاسم",
                description: "الوصف",
                users: "المستخدمون",
                more: "المزيد",
                add:"إضافة",
                new: "جديد"
            }
        }
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;