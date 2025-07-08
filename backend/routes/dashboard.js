const express = require('express');
const router = express.Router();
const Tower = require('../models/Tower'); // ✅ MongoDB model for towers
const User = require('../models/user');   // ✅ MongoDB model for users

router.get('/', async (req, res) => {
  try {
    // 1. Fetch all towers
    const towers = await Tower.find({});
    const totalTowers = towers.length;
    const totalApartments = towers.reduce(
      (sum, t) => sum + (parseInt(t.apartments) || 0),
      0
    );

    // 2. Fetch users and count by role
    const users = await User.find({});
    const owners = users.filter(u => u.isOwner === true).length;
    const tenants = users.filter(u => u.isOwner === false).length;

    // 3. Calculate unsold = total apartments - sold (owners)
    const unsoldApartments = totalApartments - (owners + tenants);

    // 4. Dummy Maintenance Dues (update as per your schema later)
    const maintenanceDues = users.filter(u => u.maintenanceDue === true).length || 0;

    res.json({
      totalTowers,
      totalApartments,
      unsoldApartments,
      owners,
      tenants,
      maintenanceDues,
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
