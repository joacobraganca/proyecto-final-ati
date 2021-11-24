const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User', require('../../models/users'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUserValidation, loginValidation } = require('../validation');
const { cleanIdNumber } = require('ciuy');
const axios = require('axios');
const { validCi } = require('../utils');
const verify = require('../verifyToken');

router.post('/register', async (req, res) => {
    //Validacion de los datos
    const err = registerUserValidation(req.body);
    if (err.error) return res.status(400).send(err.error.details[0].message);

    //Valido cedula
    response = await validCi(req.body.document, User);
    if (response && response.status == 400) {
        return res.status(400).send(response.message);
    }
    cleanCi = cleanIdNumber(req.body.document);

    //Encripto la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //Creo usuario
    const user = new User({
        name: req.body.name,
        password: hashedPassword,
        document: cleanCi,
        roleAdmin: req.body.roleAdmin,
        assignedHealthHome: req.body.assignedHealthHome,
        tokenNotification: req.body.tokenNotification,
    });
    try {
        //Intento crear el usuario
        //const usuaurioGuardado =
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRETA);
        res.header('Authorization', token);
        res.status(200).send(user);
    } catch (err) {
        //Envio el error
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req, res) => {
    //Validadocumentón de los datos
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Valida documento de que el email esté registrado en la base
    const user = await User.findOne({
        document: cleanIdNumber(req.body.document),
    });

    if (!user) return res.status(400).send('El documento/contraseña no es correcto.');

    //Corroboro si la contraseña es correcta
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('El documento/contraseña no es correcto.');

    try {
        if (user.tokenNotification !== req.body.tokenNotification) {
            await user.updateOne({
                tokenNotification: req.body.tokenNotification,
            });
        }
    } catch (err) {
        //Envio el error
        res.status(400).send(err);
    }

    //Creo y asigno el token
    const userSend = new User({
        _id: user._id,
        name: user.name,
        roleAdmin: user.roleAdmin,
        assignedHealthHome: user.assignedHealthHome,
        tokenNotification: user.tokenNotification,
    });
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRETA);
    res.header('Authorization', token);
    res.send(userSend);
});

router.put('', verify, async (req, res) => {
    if (!req.body._id) {
        return res.status(400).send('El _id es requerido.');
    }

    await User.findOneAndUpdate(
        { _id: req.body._id },
        { tokenNotification: req.body.tokenNotification },
        { new: true },
        (error, results) => {
            if (error) {
                return res.status(400).send(error);
            } else {
                return res.status(200).send(results);
            }
        },
    );
});

//Get de nurses por healthHomeId
router.get('/homeId', verify, async (req, res) => {
    const user = await User.find({ assignedHealthHome: req.query._id });

    if (!user.length) return res.status(404).send('No existen enfermeras para esa casa de salud.');
    else return res.status(200).send(user.filter((nurse) => nurse.roleAdmin === false));
});

//! NOTIFICATION
async function sendNotification(notifications) {
    let response = false;
    const axiosPostNotification = axios.create({
        mode: 'cors',
        method: 'post',
        headers: {
            host: 'exp.host',
            accept: 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json',
        },
    });
    await axiosPostNotification
        .post('https://exp.host/--/api/v2/push/send', notifications)
        .then((resp) => {
            console.log(resp);
            response = true;
        })
        .catch((error) => {
            console.error(error);
            response = false;
        });
    return response;
}

module.exports = router;
