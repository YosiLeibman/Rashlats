const express = require('express');
const router = express.Router();

// Donate page
router.get('/', function(req, res){
      res.render('uploadchooser', {
      });
});

router.get('/:folder', function(req, res){
    res.render('uploads', {
        folder: req.params.folder
    });
});
module.exports = router;