const router = require('express').Router();
const User = require('../models/User');

router.get('/getusers', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/adduser', async (req, res) => {
    const {name, email, password } = req.body;
    const user = { name, email, password }
    const newUser = new User(user);
    const newUser2 = await newUser.save();
    res.send(newUser2);
});

// Actualizar datos de usuario
router.put('/userupdate/:id', async (req, res) => {
    const userId = req.params.id;
    const {name, email, password } = req.body;
    const user = {
        name,
        email,
        password
    }
    const userUpdated = await User.findByIdAndUpdate(userId, user);
    res.send(userUpdated);
});

router.delete('/userdelete/:id', async (req, res) => {
    
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    res.send(userDeleted);
});

module.exports = router;

