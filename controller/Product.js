const { Product } = require('../model/Product')

exports.createProduct = async (req, res) => {
    const product = new Product(req.body);

    try {
        const doc = await product.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.fetchAllProducts = async (req, res) => {
   
    let query = Product.find({});

    let totalCountquery = Product.find({});

    if (req.query.category) {
        query = query.find({ category: req.query.category });
        totalCountquery = totalCountquery.find({ category: req.query.category });
    }

    if (req.query.brand) {
        query = query.find({ brand: req.query.brand })
        totalCountquery = totalCountquery.find({ brand: req.query.brand })
    }

    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
    }

    const totalDocs = await totalCountquery.estimatedDocumentCount().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const doc = await query.exec();
        res.set('X-Total-Count', totalDocs)
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.fetchAllProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(err)
    }
}


exports.updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(err)
    }
}