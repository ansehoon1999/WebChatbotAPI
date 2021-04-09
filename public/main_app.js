console.log(firebase);

var provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();


auth.onAuthStateChanged(user => {
  if(user) {
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
  } else {
      whenSignedIn.hidden = true;
      whenSignedOut.hidden = false;
  }
});
