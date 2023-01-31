const adminServices = require('../services/admin.service');

const getUsers = async (_req, res) => {
  const { type, message } = await adminServices.getUsers();
  
  return res.status(type).json(message);
};

const postUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { type, message } = await adminServices.postUser({ name, email, password, role });
  
  return res.status(type).json(message);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;  
  const { type, message } = await adminServices.deleteUser(id);
  
  return res.status(type).json(message);
};

module.exports = { 
  getUsers,
  postUser,
  deleteUser,
};
