import React from 'react'
import { capitalizeWords, updateProduct } from '../hooks/products'
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { editCategoryAvailability } from '../hooks/category';
// import { useTranslation } from "react-i18next";

export default function Table({tableType, tableName, data, columns, fetchCategories, fetchProducts }) {
    const { t } = useTranslation();
    return (
        <table>
            <caption>{capitalizeWords(tableName)}</caption>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col) => (
                            <td key={col.key}>
                                {col.label === t('isAvailable') ?
                                    // row[col.key] ? t('isAvailable') : t('notAvailable')
                                    <Input
                                        onChange={async () => {
                                            if (tableType === 'categories') {
                                                await editCategoryAvailability(row.id, { isAvailable: !row[col.key] });
                                                await fetchCategories();
                                            } else if (tableType === 'products') {
                                                await updateProduct(row._id, { isAvailable: !row.isAvailable });
                                                await fetchProducts();
                                            }
                                        }}
                                        type="checkbox"
                                        checked={
                                            tableType === 'categories' ? row[col.key] 
                                            : tableType === 'products' ? row.isAvailable
                                            : false
                                        }
                                    />
                                    : capitalizeWords(row[col.key] ? row[col.key] : row[col.key.split('.')[0]][col.key.split('.')[1]])}

                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
