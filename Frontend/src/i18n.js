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
                new: "New",
                arabic: "Arabic",
                english: "English",
                select: "Select",
                required: "Required",
                edit: "Edit",
                hide: "Hide",
                delete: "Delete"

            }
        },
        ar: {
            translation: {
                menu: "القائمة",
                products: "المنتجات",
                product: "منتج",
                price: "السعر (ج.م)",
                category: "تصنيف",
                categories: "التصنيفات",
                download: "تنزيل ",
                name: "الاسم",
                description: "الوصف",
                users: "المستخدمون",
                more: "المزيد",
                add:"إضافة",
                new: "جديد",
                arabic: "العربية",
                english: "الإنجليزية",
                select: "اختر",
                required:"مطلوب",
                edit: "تعديل",
                hide: "إخفاء",
                delete: "حذف"
            }
        }
    },
    lng: savedLanguage,
    debug: false,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;