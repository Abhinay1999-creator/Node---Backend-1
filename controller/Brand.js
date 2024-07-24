const { Brand } = require('../model/Brand')

exports.fetchBrands = async (req, res) => {
    try {
        const brand = await Brand.find({}).exec();
        res.status(200).json(brand);
    } catch (err) {
        res.status(400).json(err)
    }
}