import { useEffect, useState } from 'react'
import { getProducts } from '../hooks/products';
import { useTranslation } from "react-i18next";
import i18n from '../i18n';
import Table from '../components/Table';

export default function Products() {
    // Translation hook
    const { t } = useTranslation();
    // 1) fetch items from database
    const [items, setItems] = useState([]);
    useEffect(() => {
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
        { key: "more", label: t('more') },
    ]
    return (
        <>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <button className='btn btn_primary' onClick={() => alert('Add Product')}>
                    <i class="fa-solid fa-circle-plus"></i> {`${t('add')}  ${t('product')}`}
                </button>
            </div>
            <div className='products_table'>
                {
                    categories.map(category => (
                        <div key={category.id}>
                            <Table
                                manageable={true}
                                tableName={category.name}
                                data={items.filter(item =>
                                    item.categoryName === category.name)}
                                columns={Headers} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}
