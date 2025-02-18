const express = require('express');
const { Fido2Lib } = require('fido2-lib');
const app = express();
const fido2 = new Fido2Lib();

app.use(express.json());

let users = {}; // Store users' public keys (in real systems, use a database)

app.post('/webauthn/authentication', async (req, res) => {
    const userId = req.body.userId;
    const user = users[userId];
    
    if (!user) {
        return res.status(400).send('User not registered');
    }

    const options = await fido2.assertionOptions();
    // Store the challenge (in memory or DB) for later verification
    options.challenge = 'randomChallenge';  // You generate a secure challenge here
    res.json(options);
});

app.post('/webauthn/verify-authentication', async (req, res) => {
    try {
        const { id, rawId, response } = req.body;

        const user = users[id];
        if (!user) {
            return res.status(400).send('User not found');
        }

        const verification = await fido2.verifyAssertionResponse({
            response,
            publicKey: user.publicKey,  // This should be the registered public key
            challenge: 'randomChallenge', // Retrieve the correct challenge
        });

        if (verification) {
            res.status(200).send('Authentication successful');
        } else {
            res.status(400).send('Authentication failed');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
