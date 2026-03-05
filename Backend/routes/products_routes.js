const router = require('express').Router()
const {getProducts,addProduct,updateProduct,deleteProduct} = require('../controllers/products_controllers')
router.route('/')
.get(getProducts)
.post(addProduct)

router.route('/:id')
.put(updateProduct)
.delete(deleteProduct)
module.exports = router;