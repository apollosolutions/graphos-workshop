// Initialize the default app
const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getDatabase } = require('firebase-admin/database');

const userIds = {
    'noPermissions': 'kROegJbVGmYlOq3JZK0cqEjvGYB2', // no@apolloworkshop.com
    'allPermissions': 'ZfkDAHi4JDVGyI4DB5K4HzhrSMm2' // yes@apolloworkshop.com
};

const app = initializeApp({
    credential: admin.credential.applicationDefault()
});

const setDemoClaims = async (uid) => {
    const baseClaims = {
        premium: true,
        scope: "order:items order:buyer account"
    };

    await getAuth()
        .setCustomUserClaims(uid, baseClaims)

    const record = await getAuth().getUser(uid);

    if (JSON.stringify(record.customClaims) === JSON.stringify(baseClaims)) {
        console.log(`successfully set claim for user ${record.email}`);
    } else {
        console.log(`claims did not persist to user (${record.email}), these were the claims ${record.customClaims}`);
    }
};

setDemoClaims(userIds.allPermissions);
