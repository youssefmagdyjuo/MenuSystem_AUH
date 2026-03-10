import { useEffect, useState } from 'react'
import { getProducts } from '../hooks/products';
import { useTranslation } from "react-i18next";
import i18n from '../i18n';
import Table from '../components/Table';
import PopUpLayout from '../components/PopUpLayout';
import Button from '../components/Button';
import ProductForm from '../components/ProductForm';
import { setFullData } from '../features/products/product';
import { useDispatch } from 'react-redux';
export default function Products() {
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const [openOptionsId, setOpenOptionsId] = useState(null);
    const dispatch = useDispatch();
    const [formOpen, setFormOpen] = useState(false);
    // Translation hook
    const { t } = useTranslation();
    // 1) fetch items from database
    const [items, setItems] = useState([]);
    const fetchProducts = async () => {
        const products = await getProducts();
        setItems(products);
        console.log(products)
        // console.log(products)
    }
    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts();
        }
        fetchData();
    }, [i18n.language])
    // 2) Map items to include only the current language's name and description, and extract unique categories
    const filteredItems = items.map(item => ({
        ...item,
        name: item.name[i18n.language],
        description: item.description[i18n.language],
        categoryName: item.categoryName[i18n.language]
    }))
    // 2) Extract unique categories from items
    const categories = [...new Set(filteredItems.map(item => item.categoryName))]
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
            <h1 className='title'>{t('products')}</h1>
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
                                tableName={category.name}
                                data={filteredItems.filter(item =>
                                    item.categoryName === category.name).map(item =>
                                    ({
                                        ...item, more:
                                            <>
                                                <i
                                                    onClick={() => openOptionsId == item._id ? setOpenOptionsId(null) : setOpenOptionsId(item._id)}
                                                    style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}
                                                    class="fa-solid fa-ellipsis" ></i>
                                                    {/* // Show options when "more" icon (...) is clicked */}
                                                <ul className={`moreOptions ${openOptionsId === item._id ? 'flex' : ''}`}>
                                                    {/* Edit option */}
                                                    <li
                                                        onClick={() => {
                                                            setFormOpen(true);
                                                            setFormMode('edit');
                                                            // Populate the form with the selected product's data
                                                            dispatch(setFullData(items.find(prod => prod._id === item._id)));
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-edit"></i>
                                                        {t('edit')}</li>
                                                        {/* Hide option */}
                                                    <li>
                                                        <i class="fa-solid fa-ban"></i>
                                                        {t('hide')}</li>
                                                        {/* Delete option */}
                                                    <li>
                                                        <i className="fa-solid fa-trash"></i>
                                                        {t('delete')}</li>
                                                </ul>
                                            </>

                                    }))} // Add "more" icon to each row
                                columns={Headers} />
                        </div>
                    ))
                }
            </div>
            <PopUpLayout open={formOpen}>
                <div className='close' onClick={() => {setFormOpen(false), setOpenOptionsId(null)}}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <ProductForm setFormOpen={setFormOpen} fetchProducts={fetchProducts} formMode={formMode} setOpenOptionsId={setOpenOptionsId} />
            </PopUpLayout>
        </>
    )
}
