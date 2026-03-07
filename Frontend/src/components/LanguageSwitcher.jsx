import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLanguage = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    return (
        <div 
        style={{ right: i18n.language === "ar" ? "auto" : "20px", left: i18n.language === "ar" ? "20px" : "auto" }}
        className="language_switcher" 
        onClick={toggleLanguage} data-html2canvas-ignore>
            {i18n.language === "en"
                ? <img src="/icons8-egypt-48.png" alt="Arabic" />
                : <img src="/icons8-great-britain-48.png" alt="English" />
            }
        </div>
    );
};