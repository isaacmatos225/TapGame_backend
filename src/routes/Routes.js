const express = require('express');
const TapControlllers = require('../controllers/TapControllers');
const router = express.Router();

router.post('/signup', TapControlllers.signup);
router.post('/signin', TapControlllers.signin);
router.get('/ranking', TapControlllers.ranking);
//router.get('/list/:id', TapControlllers.getid);
//router.delete('/delete/:id', TapControlllers.deleteid);
router.put('/user/:id', TapControlllers.updateid); //update dos dados do usuario
router.put('/user/:nick/score/:score', TapControlllers.score);


module.exports = router;