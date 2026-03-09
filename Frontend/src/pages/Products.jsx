import { useEffect, useState } from 'react'
import { getProducts } from '../hooks/products';
import { useTranslation } from "react-i18next";
import i18n from '../i18n';
import Table from '../components/Table';
import PopUpLayout from '../components/PopUpLayout';
import Button from '../components/Button';
import ProductForm from '../components/ProductForm';
export default function Products() {

    const [formOpen, setFormOpen] = useState(false);
    // Translation hook
    const { t } = useTranslation();
    // 1) fetch items from database
    const [items, setItems] = useState([]);
    const fetchProducts = async () => {
        const products = await getProducts();
        setItems(products);
        // console.log(products)
    }
    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts();
        }
        fetchData();
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
            {/* Add Product Button */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Button
                    style={'btn_primary'}
                    onClick={() => setFormOpen(true)}
                >
                    <i style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} class="fa-solid fa-circle-plus"></i> {`${t('add')}  ${t('product')}`}
                </Button>
            </div>
            <div className='products_table'>
                {
                    categories.map(category => (
                        <div key={category.id}>
                            <Table
                                manageable={true}
                                tableName={category.name}
                                data={items.filter(item =>
                                    item.categoryName === category.name).map(item =>
                                    ({
                                        ...item, more:
                                            <i 
                                            style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }} 
                                            class="fa-solid fa-ellipsis" ></i>
                                    }))} // Add "more" icon to each row
                                columns={Headers} />
                        </div>
                    ))
                }
            </div>
            <PopUpLayout open={formOpen}>
                <div className='close' onClick={() => setFormOpen(false)}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <ProductForm setFormOpen={setFormOpen} fetchProducts={fetchProducts} />
            </PopUpLayout>
        </>
    )
}
