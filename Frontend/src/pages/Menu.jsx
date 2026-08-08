import React, { useState } from 'react'
import Table from '../components/Table'
import { useTranslation } from "react-i18next";
import { getProducts } from '../hooks/products'
import i18n from '../i18n';
import Loader from '../components/Loader';

export default function Menu({userType='guest'}) {
    const [loading, setLoading] = useState(true);
    // Translation hook
    const { t } = useTranslation();
    // 1) fetch items from database
    const [items, setItems] = React.useState([]);
    React.useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setItems(products);
            if (products.length > 0) setLoading(false);
        }
        fetchProducts();
    }, [i18n.language])
    // 2) Map items to include only the current language's name and description, and extract unique categories
    const filteredItems = items
        .filter(item => item.isAvailable) // Filter to include only available items
        .map(item => ({
            ...item,
            name: item.name[i18n.language],
            description: item.description[i18n.language],
            categoryName: item.categoryName[i18n.language]
        }))
    // 3) Extract unique categories from items
    const categories = [...new Set(filteredItems.map(item => item.categoryName))]
        .map((cat, index) => ({ id: index, name: cat }))

    // 4) Define table headers
    const Headers = [
        { key: "name", label: t('name') },
        { key: "description", label: t('description') },
    ]
if (userType === 'staff') {
    Headers.push({ key: "price.staff", label: `${t('price')} -  ${t('staff')}` })
}else if (userType === 'guest') {
    Headers.push({ key: "price.guest", label: `${t('price')} -  ${t('guest')}` })
}
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
                    <h1 className='text-[var(--blue-color)] '>Alexandria Hospital - AUH</h1>
                    <h1 className='text-[var(--green-color)]'>مستشفى الأسكندرية</h1>
                    <div className='flex justify-between items-center '>
                        <div className='flex flex-col text-[var(--blue-color)] w-24'>
                            <p>0000</p>
                            <p className='text'>{t('hot_line')}</p>
                        </div>
                        <button
                            className='btn btn_primary'
                            data-html2canvas-ignore
                            onClick={handleDownload}> <i class="fa-solid fa-download"></i> {t('download')}   {t('menu')}
                        </button>
                        <div className='flex flex-col text-[var(--blue-color)] w-24'>
                            <p>7028</p>
                            <p>{t('cafeteria')}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                loading ? <Loader />
                    : filteredItems.length > 0 ? categories.map(category => (
                        <div key={category.id}>
                            <Table tableName={category.name} data={filteredItems.filter(item => item.categoryName === category.name)} columns={Headers} />
                        </div>
                    )) : <h2 style={{ textAlign: 'center', marginTop: '5rem' }}>{t('no_items')}</h2>
            }

        </div>
    )
}
