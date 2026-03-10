import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NavBar() {
    const { t } = useTranslation();
    return (
        <div className="navbar_container">
                <div className="navbar_logo">
                    <img src="/auhLogo.png" alt="AUH Logo" />
                    <p>AUH Menu System v1.0</p>
                </div>
                <ul className="navbar_links">
                    <li>
                        <Link to="/"> {t("menu")} </Link>
                    </li>
                    <li>
                        <Link to="/products"> {t("products")} </Link>
                    </li>
                    <li>
                        <Link to="/categories"> {t("categories")} </Link>
                    </li>
                    <li>
                        <Link to="/users"> {t("users")} </Link>
                    </li>
                    
                </ul>
                <div></div>
        </div>
    )
}
