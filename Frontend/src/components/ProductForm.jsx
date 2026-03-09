import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch, useSelector } from "react-redux";
import { resetProduct, setCategory, setDescription, setName, setPrice } from '../features/products/product';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getCategories } from '../hooks/category';
import Selector from './Selector';
import i18n from '../i18n';
import { addProduct } from '../hooks/products';
export default function ProductForm({ setFormOpen, fetchProducts }) {
    const [categories, setCategories] = useState([])
    const [validationErrors, setValidationErrors] = useState({});
    useEffect(() => {
        const fetchCategories = async () => {
            const resulte = await getCategories()
            setCategories(resulte)
            // console.log(resulte);

        }
        fetchCategories();
    }, [])
    // Translation hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    //validate form inputs
    const validateForm = () => {
        const errors = {};
        if (!product.name.en.trim()) {
            errors.nameEn = t('name') + ' ' + t('required');
        }
        if (!product.name.ar.trim()) {
            errors.nameAr = t('name') + ' ' + t('required');
        }
        if (product.price === null || product.price <= 0) {
            errors.price = t('price') + ' ' + t('required');
        }
        if (!product.categoryId) {
            errors.categoryId = t('category') + ' ' + t('required');
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }
    // add product function
    const handleAddProduct = async (e) => {
        e.preventDefault();
        //validation check
        if (!validateForm()) {
            return;
        }
        // Logic to add a new product
        const respose = await addProduct(product);
        // Refresh the product list after adding a new product
        await fetchProducts();
        // Close the form after adding
        setFormOpen(false);
        // Reset the form state
        dispatch(resetProduct());
    }
    //handle options to send it to selector
    const categoryOptions = categories.map((cat) => ({
        value: cat._id,
        label: cat.name[i18n.language]
    }));
    // console.log(categoryOptions);

    return (
        <FormLayout >
            <h2>{t('add')} {t('product')}</h2>
            {/* product name inputs */}
            <Input
                required={true}
                value={product.name.ar}
                placeholder={`${t('name')} - ${t('arabic')}`}
                type={'text'}
                label={` ${t('name')} - ${t('arabic')}`}
                onChange={(e) =>
                    dispatch(setName({ lang: "ar", value: e.target.value }))
                }
            />
            <p className={validationErrors.nameAr ? "error" : 'none'}>{validationErrors.nameAr}</p>
            <Input
                required={true}
                value={product.name.en}
                placeholder={`${t('name')} - ${t('english')}`}
                type={'text'}
                onChange={(e) =>
                    dispatch(setName({ lang: "en", value: e.target.value }))
                }
                label={` ${t('name')} - ${t('english')}`}
            />
            <p className={validationErrors.nameEn ? "error" : 'none'}>{validationErrors.nameEn}</p>
            {/* product description inputs */}
            <Input
                required={true}
                value={product.description.ar}
                placeholder={`${t('description')} - ${t('arabic')}`}
                type={'text'}
                label={` ${t('description')} - ${t('arabic')}`}
                onChange={(e) =>
                    dispatch(setDescription({ lang: "ar", value: e.target.value }))
                }
            />
            <p className={validationErrors.descriptionAr ? "error" : 'none'}>{validationErrors.descriptionAr}</p>
            <Input
                required={true}
                value={product.description.en}
                placeholder={`${t('description')} - ${t('english')}`}
                type={'text'}
                onChange={(e) =>
                    dispatch(setDescription({ lang: "en", value: e.target.value }))
                }
                label={` ${t('description')} - ${t('english')}`}
            />
            <p className={validationErrors.descriptionEn ? "error" : 'none'}>{validationErrors.descriptionEn}</p>
            {/* product price input */}
            <Input
                required={true}
                value={product.price}
                placeholder={`${t('price')}`}
                type={'number'}
                label={` ${t('price')}`}
                onChange={(e) => dispatch(setPrice(Number(e.target.value)))}

            />
            <p className={validationErrors.price ? "error" : 'none'} >{validationErrors.price}</p>
            {/* choose category  */}
            <Selector
                options={categoryOptions}
                placeholder={`${t('select')} ${t('category')}`}
                onChange={(selected) =>
                    dispatch(
                        setCategory(selected.value)
                    )
                }
                required={true}
            />
            <p className={validationErrors.categoryId ? "error" : 'none'}>{validationErrors.categoryId}</p>
            <Button
                style={'btn_primary'}
                type={'submit'}
                onClick={(e) => handleAddProduct(e)}
            >
                {t('add')} {t('product')}
            </Button>
        </FormLayout>
    )
}
