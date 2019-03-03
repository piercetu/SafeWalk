const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const { accountSid, authToken, phoneNumber } = require('../config/twilio');

const client = new twilio(accountSid, authToken);

router.post('/api/twilio/notify', (req, res) => {
    let { parentNumber } = req.body;

    console.log(req.body);
    try {
        client.messages.create({
            body: 'Hello your child is not at school',
            to: parentNumber,
            from: phoneNumber
        })
            .then(message => {
                return res.status(200).json({
                    success: true,
                    msg: message
                });
            })
            .catch(err => {
                return res.status(400).json({
                    success: false,
                    msg: 'Server error, failed to send text message to parent'
                });
            });

    } catch(err) {
        return res.status(500).json({
            success: false,
            msg: 'Server error, failed to send text message to parent'
        });
    }
});

module.exports = router;
