/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deletePaidWorkDetails = functions.database.ref('/workDetails/{key}')
    .onUpdate((change, context) => {
        const newValue = change.after.val();

        // Check if paid is true
        if (newValue.paid) {
            const now = Date.now();
            const timePassed = Math.floor((now - newValue.paidTimestamp) / 1000); // Time passed in seconds
            let timeLeft = 60 - timePassed; // Remaining time in seconds

            // If time left is less than or equal to zero, delete the data
            if (timeLeft <= 0) {
                return change.after.ref.remove();
            }
        }

        // If paid is not true or time left is more than zero, do nothing
        return null;
    });
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
