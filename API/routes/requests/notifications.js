const admin = require('firebase-admin');

function initFirebase() {
    const serviceAccount = require('../../keys/pdp-api-25-11-firebase-adminsdk-k4vrs-43ea68ef09.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

initFirebase();

function sendPushToOneUser(notification) {
    const message = {
        token: notification.token,
        notification: {
            title: notification.data.title,
            body: notification.data.message,
        },
    };
    sendMessage(message);
}

module.exports = { sendPushToOneUser };

function sendMessage(message) {
    admin
        .messaging()
        .send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}
