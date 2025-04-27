const {
  createDeliveryService,
  assignDriverService,
  updateStatusService,
  getDeliveryByIdService,
  getAvailableDriversService,
  updateDriverLocationService,
  getDeliveryByOrderIdService
} = require("../services/delivery-service");
const Driver = require("../models/driver");

const createDeliveryCtrl = async (req, res) => {
  try {
    const delivery = await createDeliveryService(req.body);
    res.status(201).json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const assignDriverCtrl = async (req, res) => {
  try {
    const updated = await assignDriverService(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStatusCtrl = async (req, res) => {
  try {
    const updated = await updateStatusService(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDeliveryCtrl = async (req, res) => {
  try {
    const delivery = await getDeliveryByIdService(req.params.id);
    res.json(delivery);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getDeliveryByOrderCtrl = async (req, res) => {
  try {
    const delivery = await getDeliveryByOrderIdService(req.params.oid);
    res.json(delivery);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getAvailableDriversCtrl = async (req, res) => {
  try {
    const drivers = await getAvailableDriversService();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDriverLocationCtrl = async (req, res) => {
  try {
    const updated = await updateDriverLocationService(
      req.params.id,
      req.body.coordinates
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createDriverCtrl = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    res.status(201).json(await driver.save());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createDeliveryCtrl,
  assignDriverCtrl,
  updateStatusCtrl,
  getDeliveryCtrl,
  getAvailableDriversCtrl,
  updateDriverLocationCtrl,
  createDriverCtrl,
  getDeliveryByOrderCtrl
};
