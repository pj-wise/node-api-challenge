const express = require('express');

const router = express.Router();

const projectRoutes = require('./projects.js');
const actionRoutes = require('./actions.js')

router.use('/projects', projectRoutes);
router.use('/actions', actionRoutes);

module.exports = router;

