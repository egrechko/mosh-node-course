const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Welcome to the courses API. To learn how to use the API please visit docs.api.io 💩');
});

module.exports = router;