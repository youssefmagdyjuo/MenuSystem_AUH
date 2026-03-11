import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch, useSelector } from "react-redux";
import { resetCategory, setDescription, setName } from '../features/categories/category';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { addCategory, updateCategory } from '../hooks/category';

export default function CategoryFormComponent({ setFormOpen, fetchCategories, formMode ,setOpenOptionsId}) {
    const [validationErrors, setValidationErrors] = useState({});
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    const validateForm = () => {
        const errors = {};
        if (!category.name.en.trim()) {
            errors.nameEn = t('name') + ' ' + t('required');
        }
        if (!category.name.ar.trim()) {
            errors.nameAr = t('name') + ' ' + t('required');
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        await addCategory(category);
        await fetchCategories();
        setFormOpen(false);
        dispatch(resetCategory());
    }
    const handleUpdateCategory = async (e,id) => {
        e.preventDefault();        
        if (!validateForm()) {
            return;
        }
        // Logic to update the category
        await updateCategory(id, category);
        // Refresh the category list after updating
        await fetchCategories();
        // Close the form after updating
        setFormOpen(false);
        // Reset the form state        
        dispatch(resetCategory());
        // Close options menu if open after updating
        setOpenOptionsId(null);
    }
    return (
        <FormLayout>
            <h2>{t('add')} {t('category')}</h2>
            <Input
                required={true}
                value={category.name.ar}
                placeholder={`${t('name')} - ${t('arabic')}`}
                type={'text'}
                label={`${t('name')} - ${t('arabic')}`}
                onChange={(e) =>
                    dispatch(setName({ lang: "ar", value: e.target.value }))
                }
            />
            <p className={validationErrors.nameAr ? "error" : 'none'}>{validationErrors.nameAr}</p>
            <Input
                required={true}
                value={category.name.en}
                placeholder={`${t('name')} - ${t('english')}`}
                type={'text'}
                label={`${t('name')} - ${t('english')}`}
                onChange={(e) =>
                    dispatch(setName({ lang: "en", value: e.target.value }))
                }
            />
            <p className={validationErrors.nameEn ? "error" : 'none'}>{validationErrors.nameEn}</p>
            <Input
                value={category.description.ar}
                placeholder={`${t('description')} - ${t('arabic')}`}
                type={'text'}
                label={`${t('description')} - ${t('arabic')}`}
                onChange={(e) =>
                    dispatch(setDescription({ lang: "ar", value: e.target.value }))
                }
            />
            <p className={validationErrors.descriptionAr ? "error" : 'none'}>{validationErrors.descriptionAr}</p>
            <Input
                value={category.description.en}
                placeholder={`${t('description')} - ${t('english')}`}
                type={'text'}
                label={`${t('description')} - ${t('english')}`}
                onChange={(e) =>
                    dispatch(setDescription({ lang: "en", value: e.target.value }))
                }
            />
            <p className={validationErrors.descriptionEn ? "error" : 'none'}>{validationErrors.descriptionEn}</p>
            <Button
                style={'btn_primary'}
                type={'submit'}
            onClick={(e) => formMode === 'edit' ? handleUpdateCategory(e, category.id) : handleAddCategory(e)}
            >
                {
                    formMode === 'edit'
                        ? <><i style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} className="fa-solid fa-pen-to-square"></i> {`${t('edit')} `}</>
                        :
                        <><i style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} className="fa-solid fa-circle-plus"></i> {t('add')} {t('category')}</>
                }
            </Button>
        </FormLayout>
    )
}
