import React from 'react'
import { capitalizeWords } from '../hooks/products'
import { useTranslation } from 'react-i18next';
// import { useTranslation } from "react-i18next";

export default function Table({ tableName, data, columns }) {
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
                                    row[col.key] ? t('isAvailable') : t('notAvailable') 
                                    :capitalizeWords(row[col.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
