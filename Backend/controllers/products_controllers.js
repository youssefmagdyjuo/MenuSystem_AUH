const { getAllProducts, addProduct, updateProduct, deleteOneProduct } = require('../services/product_service');
// GET METHOD FETCH ALL PRODUCTS
const getProducts_controller = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json({
            results: products.length,
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: err.message
        });
        console.log(err);

    }
}
// ADD A NEW PRODUCT
const addProduct_controller = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const newProduct = {
            name,
            price,
            description,
            category,
            isAvailable: true
        }
        const result = await addProduct(newProduct);
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding product",
            error: error.message
        });
    }
}
// UPDATE A PRODUCT
const updateProduct_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await updateProduct(id, updateData);
        res.json({
            success: true,
            message: "Product updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message
        });
    }
}
// DELETE A PRODUCT
const deleteProduct_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteOneProduct(id);
        res.json({
            success: true,
            message: "Product deleted successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message
        });
    }
}

module.exports = {
    getProducts: getProducts_controller,
    addProduct: addProduct_controller,
    updateProduct: updateProduct_controller,
    deleteProduct: deleteProduct_controller
}