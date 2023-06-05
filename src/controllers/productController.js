import { ProductsModel } from "../DAO/models/products.model.js";

// GET PRODUCTS FROM DB
export const getProduct = async (req, res) =>{
    try {
        const data = await ProductsModel.find({});
        const limit = req.query.limit;
        const limitedData = limit ? data.slice(0, limit) : data
        res.status(200).json(limitedData)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


// GET PRODUCT FROM DB BY ID

export const getProductByid = async (req, res) =>{
    try {
        const pid = (req.params.pid);
        const filteredData = await ProductsModel.findOne({_id: pid})
        res.status(200).json(filteredData)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// CREATE NEW PRODUCT IN DB

export const createProduct = async (req, res) =>{
    try {
        let newProduct = req.body;
        const productCreated = await ProductsModel.create(newProduct)
        return res.json({
            status: "success",
            msg: "Product created",
            data: productCreated
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// UPDATE PRODUCT IN DB 

export const updateProduct = async (req, res) =>{
    try {
        const pid = req.params.pid
        const { code, ...updatedProduct} = req.body
        await ProductsModel.updateOne({_id: pid}, updatedProduct);
        return res.json({
            status: "success",
            msg: "product updated",
            data: updatedProduct
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// DELETE PRODUCT FROM DB 

export const deleteProduct = async (req, res) =>{
    try {
        const pid = req.params.pid;
        await ProductsModel.deleteOne({_id: pid})
        return res.header('X-Message', 'Product successfully deleted').status(204).json()
    } catch(err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}