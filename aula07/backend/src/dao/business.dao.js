const businessModel = require('../models/business.model');

const getBusiness = async () => {
  const business = await businessModel.find();
  return business;
}

const getBusinessById = async (id) => {
  const business = await businessModel.findById(id);
  return business;
}

const createBusiness = async (businessData) => {
  const newBusiness = await businessModel.create(businessData);
  return newBusiness;
}

const addProduct = async (id, productData) => {
  const updatedBusiness = await businessModel.findByIdAndUpdate({ _id: id }, { $set: productData }, { new: true });
  return updatedBusiness;
};

module.exports = {
  getBusiness,
  getBusinessById,
  createBusiness,
  addProduct,
};