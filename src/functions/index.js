const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

exports.getUsers = functions.https.onRequest((req, res) => (
    cors(req, res, async() => {
        //checking if the user send another req method except for GET
        if (req.method !== 'GET') return res.status(401).json({ message: 'not allowed' });
        
        try {
            const userRef = admin.firestore().collection('users');
            let users = [];

            const userSnapshot = await userRef.get();

            userSnapshot.docs.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() })
            });

            res.status(201).json(users);
        } catch (error) {
            res.status(error.code).json({ message: "something went wrong: " + error.message });
        }
    })
));

exports.voteNominee = functions.https.onRequest((req, res) => (
    cors(req, res, async () => {
        //checking if the user send another req method except for GET
        if (req.method !== 'POST') return res.status(401).json({ message: 'not allowed' });
        
        const userId = req.body.userId;
        const positionId = req.body.positionId;
        const nomineeId = req.body.nomineeId;

        const nomineeRef = admin.firestore().collection('nominees').doc(nomineeId);
        const nomineeSnap = await nomineeRef.get();
        const userRef = admin.firestore().collection('users').doc(userId);
        const userSnap = await userRef.get();

        if (!userSnap.exists) return res.status().json({ message: 'not an authenticated user' });

        //throwing error user has already voted in that position
        if (userSnap.data().votedFor.includes(positionId)) return res.status(401).json({ message: 'You have already voted for this position' });
        
        //updating user
        await userRef.update({
            votedFor: [...userSnap.data().votedFor, positionId]
        });
        // updating position totalVotes
        await admin.firestore().collection('positions').doc(positionId).update({
            totalVotes: admin.firestore.FieldValue.increment(1)
        });
        // updating nominee votes
        await nomineeRef.update({
            votes: admin.firestore.FieldValue.increment(1)
        });
        
        res.status(201).json({
            message: 'Success in voting',
            user: { id: userSnap.id, ...userSnap.data() },
            nominee: { id: nomineeSnap.id, ...nomineeSnap.data() }
        });       
    })
));

// auth trigger
exports.newUserSignUp = functions.auth.user().onCreate(user => {
    // for background triggers you must return a value/promise
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        votedFor: []
    })
});

