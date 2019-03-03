const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const { accountSid, authToken, phoneNumber } = require('../config/twilio');

const client = new twilio(accountSid, authToken);

router.put('/api/twilio/notify', (req, res) => {
    let { parentNumber } = req.body;

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
                throw new Error(err);
            });

    } catch(err) {
        return res.status(500).json({
            success: false,
            msg: 'Server error, failed to send text message to parent'
        });
    }
});

module.exports = router;
