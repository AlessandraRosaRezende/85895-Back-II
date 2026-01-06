const businessService = require("../services/business.service");

const getBusiness = async (req, res) => {
  try {
    const business = await businessService.getBusiness();
    if (!business) return res.status(404).send({ status: "error", error: "No businesses found" });
    return res.status(200).send({ status: "success", result: business });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const getBusinessById = async (req, res) => {
  try {
    const { bid } = req.params;
    if (bid.length !== 24) return res.status(400).send({ status: "error", error: "Invalid business ID format" });
    const business = await businessService.getBusinessById(bid);
    if (!business) return res.status(404).send({ status: "error", error: "Business not found" });
    return res.status(200).send({ status: "success", result: business });    
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const createBusiness = async (req, res) => {
  try {
    const businessData = req.body;
    const newBusiness = await businessService.createBusiness(businessData);
    return res.status(201).send({ status: "success", result: newBusiness });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { bid } = req.params;
    const productData = req.body;
    const business = await businessService.getBusinessById(bid);
    if (!business) return res.status(404).send({ status: "error", message: "Business not found" });
    const updatedBusiness = await businessService.addProduct(business._id, productData);
    res.send({ status: "success", result: updatedBusiness });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

module.exports = {
  getBusiness,
  getBusinessById,
  createBusiness,
  addProduct,
};
