import React, { useEffect, useState } from 'react'
import { getCategories } from '../hooks/category'
import i18n from '../i18n'
import Table from '../components/Table'
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import PopUpLayout from '../components/PopUpLayout';
import CategoryForm from '../components/CategoryForm';

export default function Categories() {
    const [formOpen, setFormOpen] = useState(false);
    // Translation hook
    const { t } = useTranslation();
    const [categories, setCategories] = useState([])
    const fetchCategories = async () => {
        const resulte = await getCategories()
        setCategories(resulte)

    }
    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories();
        }
        fetchData();
    }, [i18n.language])
    //handle options to send it to selector
    const filteredCategoriesByLanguage = categories.map((cat) => ({
        id: cat._id,
        name: cat.name[i18n.language],
        description: cat.description[i18n.language]
    }));
    const Headers = [
        { key: "name", label: t('name') },
        { key: "description", label: t('description') },
        { key: "more", label: t('more') },
    ]
    return (
        <div>
            <h1 className='title'>{t('categories')}</h1>
            {/* Add Product Button */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Button
                    style={'btn_primary'}
                    onClick={() => setFormOpen(true)}
                >
                    <i style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} class="fa-solid fa-circle-plus"></i> {`${t('add')}  ${t('category')}`}
                </Button>
            </div>
            <Table data={filteredCategoriesByLanguage.map(item =>
            ({
                ...item, more:
                    <i
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}
                        class="fa-solid fa-ellipsis" ></i>
            }))} // Add "more" icon to each row} 
                columns={Headers} />
            <PopUpLayout open={formOpen}>
                <div className='close' onClick={() => setFormOpen(false)}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <CategoryForm setFormOpen={setFormOpen} fetchCategories={fetchCategories} />
            </PopUpLayout>
        </div>
    )
}
