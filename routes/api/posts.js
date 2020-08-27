const express = require('express')
const router = express.Router()


// @route       GET api/posts/test
// @description Tests posts route
// @access      public route
router.get('/test',(req,res) => res.json({msg:'Posts Works'}))

module.exports = router;