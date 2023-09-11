const { initializeApp } = require('firebase/app');
const { signInWithEmailAndPassword, getAuth } = require('firebase/auth');

function Base64DecodeUrl(str){
    str = (str + '===').slice(0, str.length + (str.length % 4));
    return str.replace(/-/g, '+').replace(/_/g, '/');
}

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
    const noUserCredential = await signInWithEmailAndPassword(auth, 'no@apolloworkshop.com', 'apolloworkshop');
    const yesUserCredential = await signInWithEmailAndPassword(auth, 'yes@apolloworkshop.com', 'apolloworkshop');

    // console.log(await yesResp.user.getIdToken())
    // console.log(await auth.currentUser.getIdToken())
    // yesUserCredential.user.
    console.log(`
===== Token Generated ======
yes@apolloworkshop.com
-------------------------
${yesUserCredential.user.stsTokenManager.accessToken}
-------------------------

-------------------------
no@apolloworkshop.com
-------------------------
${noUserCredential.user.stsTokenManager.accessToken}
-------------------------
===========================
`)
}

exec();
