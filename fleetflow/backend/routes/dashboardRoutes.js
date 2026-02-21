const express = require('express');
const { 
  getManagerDashboard, 
  getDispatcherDashboard, 
  getSafetyDashboard, 
  getFinancialDashboard 
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/manager', protect, authorize('manager'), getManagerDashboard);
router.get('/dispatcher', protect, authorize('dispatcher', 'manager'), getDispatcherDashboard);
router.get('/safety', protect, authorize('safety_officer', 'manager'), getSafetyDashboard);
router.get('/financial', protect, authorize('financial_analyst', 'manager'), getFinancialDashboard);

module.exports = router;
