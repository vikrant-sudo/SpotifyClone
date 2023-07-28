const express = require('express');
const router = express.Router();
const axios = require('axios');
const { async } = require('rxjs');

// GET /api/users
router.get('/', async(req, res) => {
  console.log(req.query)
  const imageUrl = req.query.playlistImageUrl;
  
  try {
    const response = await axios.get(imageUrl,{ responseType: 'arraybuffer' });
    const imageData = response.data;

    // Logic to handle the response from the external URL
    res.json(imageData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the image data' });
  }
});




// Export the router
module.exports = router;