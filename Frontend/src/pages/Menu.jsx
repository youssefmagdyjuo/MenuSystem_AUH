import React from 'react'
import Table from '../components/Table'
import { useTranslation } from "react-i18next";
import { getProducts } from '../hooks/products'
import i18n from '../i18n';

export default function Menu() {
    // Translation hook
    const { t } = useTranslation();
    // 1) fetch items from database
    const [items, setItems] = React.useState([]);
    React.useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setItems(products);
            console.log(products)
        }
        fetchProducts();
    }, [i18n.language])

    // 2) Extract unique categories from items
    const categories = [...new Set(items.map(item => item.categoryName))]
        .map((cat, index) => ({ id: index, name: cat }))

    // 3) Define table headers
    const Headers = [
        { key: "name", label: t('name') },
        { key: "description", label: t('description') },
        { key: "price", label: t('price') },
    ]

    // Handle menu download as PDF
    const handleDownload = async () => {
        // Implement download logic here
        const html2pdf = await import('html2pdf.js')
        const element = document.getElementById('menu-page')
        html2pdf.default(element, {
            margin: 10,
            filename: 'AUH Menu.pdf',
            html2canvas: { scale: 10 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
    }
    return (
        <div id='menu-page'>
            <div className="header">
                <img src="/auhLogo.png" alt="" className='logo' />
                <div>
                    <h1>Alexandria Urology Hospital - AUH</h1>
                    <button
                        className='btn btn_primary'
                        data-html2canvas-ignore
                        onClick={handleDownload}> <i class="fa-solid fa-download"></i> {t('download')} {t('menu')} 
                    </button>
                </div>
            </div>
            {
                categories.map(category => (
                    <div key={category.id}>
                        <Table tableName={category.name} data={items.filter(item => item.categoryName === category.name)} columns={Headers} />
                    </div>
                ))
            }

        </div>
    )
}
