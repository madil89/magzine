const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp();
const listUsers = () => {
  return admin.auth().listUsers().then((userList) => {
    return (userList);
  });
};
exports.getUsers = functions.runWith({enforceAppCheck: true})
    .https.onCall((data, context) => {
      if (context.app == undefined) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function must be called from an App Check verified app.");
      }

      if (context.auth.token.admin) {
        return listUsers();
      } else {
        throw new functions.https.HttpsError("permission-denied",
            "You don't have admin permission");
      }
    });

exports.addCustomClaims = functions.runWith({enforceAppCheck: true})
    .https.onCall((data, context) => {
      if (context.app == undefined) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function must be called from an App Check verified app.");
      }

      const {uid, customClaims} = data;
      if (context.auth.token.admin) {
        return admin.auth().setCustomUserClaims(uid, customClaims)
            .then(() => {
              return listUsers();
            })
            .catch((error) => {
              return {
                error: error.message, customClaims: customClaims, uid: uid,
              };
            });
      } else {
        throw new Error("You don't have admin permission");
      }
    });
