import React from 'react'
import Table from '../components/Table'
export default function Menu() {
    /*
    ==with backend logic==
    1) fetch items from database
    2) add categories to items by category id
*/
    // Sample menu items ==test==
    const items = [
        { name: "Espresso", desc: "Strong coffee", price: "45", category: "Hot Drinks" },
        { name: "Cappuccino", desc: "Coffee with milk", price: "60", category: "Hot Drinks" },
        { name: "Latte", desc: "Smooth espresso and steamed milk", price: "70", category: "Hot Drinks" },
        { name: "Americano", desc: "Espresso with hot water", price: "50", category: "Hot Drinks" },
        { name: "Macchiato", desc: "Espresso marked with foam", price: "60", category: "Hot Drinks" },
        { name: "Mocha", desc: "Coffee with chocolate", price: "80", category: "Hot Drinks" },
        { name: "Flat White", desc: "Espresso with velvety milk", price: "75", category: "Hot Drinks" },
        { name: "Iced Coffee", desc: "Chilled espresso", price: "60", category: "Cold Drinks" },
        { name: "Iced Latte", desc: "Cold milk coffee", price: "70", category: "Cold Drinks" },
        { name: "Cold Brew", desc: "Smooth cold coffee", price: "65", category: "Cold Drinks" },
        { name: "Iced Mocha", desc: "Cold chocolate coffee", price: "80", category: "Cold Drinks" },
        { name: "Matcha Latte", desc: "Green tea with milk", price: "90", category: "Cold Drinks" },
        { name: "Cheesecake", desc: "Creamy dessert", price: "120", category: "Desserts" },
        { name: "Tiramisu", desc: "Italian layered dessert", price: "130", category: "Desserts" },
        { name: "Chocolate Cake", desc: "Rich dark chocolate", price: "110", category: "Desserts" },
        { name: "Brownie", desc: "Fudgy chocolate square", price: "100", category: "Desserts" },
        { name: "Croissant", desc: "Buttery pastry", price: "50", category: "Pastries" },
        { name: "Donut", desc: "Sweet glazed circle", price: "35", category: "Pastries" },
        { name: "Muffin", desc: "Blueberry muffin", price: "55", category: "Pastries" },
        { name: "Bagel", desc: "Toasted bagel with cream cheese", price: "65", category: "Pastries" },
        { name: "Sandwich", desc: "Turkey and cheese", price: "150", category: "Sandwiches" },
        { name: "BLT", desc: "Bacon, lettuce, tomato", price: "140", category: "Sandwiches" },
        { name: "Panini", desc: "Grilled Italian sandwich", price: "160", category: "Sandwiches" },
        { name: "Caesar Salad", desc: "Fresh with croutons", price: "170", category: "Salads" },
        { name: "Greek Salad", desc: "Feta and olives", price: "180", category: "Salads" },
        { name: "Spinach Salad", desc: "With warm bacon", price: "175", category: "Salads" },
        { name: "Orange Juice", desc: "Fresh squeezed", price: "50", category: "Beverages" },
        { name: "Apple Juice", desc: "Pure apple juice", price: "45", category: "Beverages" },
        { name: "Smoothie", desc: "Strawberry banana", price: "85", category: "Beverages" },
        { name: "Iced Tea", desc: "Refreshing tea", price: "40", category: "Beverages" },
        { name: "Mineral Water", desc: "Sparkling water", price: "25", category: "Beverages" },
        { name: "Herbal Tea", desc: "Chamomile blend", price: "40", category: "Hot Drinks" },
    ]
    // Define table headers
    const Headers = [
        { key: "name", label: "Name" },
        { key: "desc", label: "Description" },
        { key: "price", label: "Price (L.E)" },
    ]
    // Extract unique categories from items
    const categories = [...new Set(items.map(item => item.category))]
        .map((cat, index) => ({ id: index, name: cat }))

    // Handle menu download as PDF
    const handleDownload = async () => {
        // Implement download logic here
        const html2pdf = await import('html2pdf.js')
        const element = document.getElementById('menu-page')
        html2pdf.default(element, {
            margin: 10,
            filename: 'AUH Menu.pdf',
            html2canvas: { scale: 10 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
    }
    return (
        <div id='menu-page'>
            <div className="header">
                <img src="/auhLogo.png" alt="" className='logo' />
                <div>
                    <h1>Alexandria Urology Hospital (AUH)</h1>
                    <button
                        className='btn btn_primary'
                        data-html2canvas-ignore
                        onClick={handleDownload}> <i class="fa-solid fa-download"></i> Download Menu
                    </button>
                </div>
            </div>
            {
                categories.map(category => (
                    <div key={category.id}>
                        <Table tableName={category.name} data={items.filter(item => item.category === category.name)} columns={Headers} />
                    </div>
                ))
            }

        </div>
    )
}
