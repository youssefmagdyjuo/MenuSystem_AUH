import React from 'react'
import { capitalizeWords } from '../hooks/products'
// import { useTranslation } from "react-i18next";

export default function Table({ tableName, data, columns, manageable }) {
    // const { t } = useTranslation();
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
                            <td key={col.key}>{capitalizeWords(row[col.key])}</td>
                        ))}
                        {/* // If the table is manageable, add an extra cell with a "more" icon */}
                        {/* {manageable && <td style={{cursor:'pointer', textAlign:'center'}}><i class="fa-solid fa-ellipsis"></i></td>} */}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
