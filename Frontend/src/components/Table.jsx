import React from 'react'
import {capitalizeWords} from '../hooks/products'
// import { useTranslation } from "react-i18next";

export default function Table({tableName,data, columns,manageable}) {
        // const { t } = useTranslation();
    return (
        <table>
            <caption>{capitalizeWords(tableName)}</caption>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>{capitalizeWords(row[col.key])}</td>
                        ))}
                        {manageable && <td>...</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
