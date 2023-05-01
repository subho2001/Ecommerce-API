
const express = require('express');
const Product = require('../models/products');

const router = express.Router();


router.post('/create', async(req, res) => {
  const data = req.body;
  const resource = new Product({
    id: data.id,
    name: data.name,
    quantity: data.quantity,
  });
  try{
    const savedResource = await resource.save();
    res.json(savedResource);
  } catch(error){
    res.status(400).json({message: error.message});
  }
});

router.get('/', async(req, res) => {
  try{
    const resource = await Product.find();
    res.json(resource);
  } catch(error){
    res.status(500).json({message: error.message});
  }
})

router.get('/getOne/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  try {
    const resource = await Product.findOne({id: id});
    if(resource){
      res.json(resource);
    }else{
      res.status(404).json({message: 'Resource not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.put('/update/:id', async(req, res) => {
  const {id} = req.params;
  const {name, quantity} = req.body;
  try {
    const updateResource = await Product.findOneAndUpdate(
      {id},
      {name, quantity},
      {new: true}
    );
    if(!updateResource){
      return res.status(404).json({message: 'Resource not found'});
    }
    res.json(updateResource);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.delete('/delete/:id', async(req, res) => {
  const {id} = req.params;
  try {
    const deletedResource = await Product.findOneAndDelete({id});
    if(!deletedResource) {
      return res.status(404).json({message: 'Resource not found'});
    }
    res.json({message: 'Resource deleted'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Get all products
// router.get('/', (req, res) => {
//   Product.find()
//     .then((products) => {
//       res.send(products);
//     })
//     .catch((error) => {
//       res.status(500).send('Error getting products:', error);
//     });
// });

// // Get a specific product by ID
// router.get('/getOne/:id', (req, res) => {
//   const productId = req.params.id;
//   Product.findById(productId)
//     .then((product) => {
//       if (!product) {
//         res.status(404).send('Product not found');
//       } else {
//         res.send(product);
//       }
//     })
//     .catch((error) => {
//       res.status(500).send('Error getting product:', error);
//     });
// });

// // Create a new product
// router.post('/create', (req, res) => {
//   const productData = req.body;
//   const product = new Product(productData);
//   product.save()
//     .then(() => {
//       res.send('Product added successfully');
//     })
//     .catch((error) => {
//       res.status(500).send('Error adding product:', error);
//     });
// });

// // Update an existing product by ID
// router.put('/update/:id', (req, res) => {
//   const productId = req.params.id;
//   const newProductData = req.body;
//   Product.findByIdAndUpdate(productId, newProductData)
//     .then(() => {
//       res.send('Product updated successfully');
//     })
//     .catch((error) => {
//       res.status(500).send('Error updating product:', error);
//     });
// });

// router.delete('/delete/:id', (req, res) => {
//   const productId = req.params.id;
//   Product.findByIdAndDelete(productId)
//     .then(() => {
//       res.send('Product deleted successfully');
//     })
//     .catch((error) => {
//       res.status(500).send('Error deleting product:', error);
//     })  
// });


module.exports = router;