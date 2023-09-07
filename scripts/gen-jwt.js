const { initializeApp } = require('firebase/app');
const { signInWithEmailAndPassword, getAuth } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyBGEWuarfRs4vVIzbdPj7EU_h3tMAVO_e4",
    authDomain: "federation-workshop.firebaseapp.com",
    projectId: "federation-workshop",
    storageBucket: "federation-workshop.appspot.com",
    messagingSenderId: "823878303408",
    appId: "1:823878303408:web:2528091fd116f22d91c575"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const exec = async () => {
    const noResp = await signInWithEmailAndPassword(auth, 'no@apolloworkshop.com', 'apolloworkshop');
    const yesResp = await signInWithEmailAndPassword(auth, 'yes@apolloworkshop.com', 'apolloworkshop');
    console.log(yesResp)
    console.log(`
===== Token Generated ======
yes@apolloworkshop.com
-------------------------
${yesResp.user.stsTokenManager.accessToken}
-------------------------

-------------------------
no@apolloworkshop.com
-------------------------
${noResp.user.stsTokenManager.accessToken}
-------------------------
===========================
`)
}

exec();
