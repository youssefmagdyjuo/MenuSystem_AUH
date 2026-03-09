import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import Layout from './pages/Layout';
import Products from './pages/Products';
import Categories from './pages/Categories';
function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Router>
      {/* Language Switcher */}
        <LanguageSwitcher />
      <Routes>
        <Route element={<Layout />} >
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
          <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
  )
}

export default App
