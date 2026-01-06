const businessDao = require("../dao/business.dao");

const getBusiness = async () => {
  const business = await businessDao.getBusiness();
  if (!business) return null;
  return business;
};

const getBusinessById = async (bid) => {
  const business = await businessDao.getBusinessById(bid);
  if (!business) return null
  return business;
};

const createBusiness = async (businessData) => {
  const newBusiness = await businessDao.createBusiness(businessData);
  return newBusiness;
}

const addProduct = async (bid, productData) => {
  const business = await businessDao.getBusinessById(bid)
  business.products.push(productData);
  const updatedBusiness = await businessDao.addProduct(business._id, business);
  return updatedBusiness;
};

module.exports = {
  getBusiness,
  getBusinessById,
  createBusiness,
  addProduct,
};