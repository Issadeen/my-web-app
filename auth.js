// Your Firebase configuration
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Set timeout for inactivity
let timeout;
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes
const WARNING_TIME = 3 * 60 * 1000; // 3 minutes

function startTimer() {
    timeout = setTimeout(function() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful, redirect to index.html
            window.location.href = "index.html";
        }).catch(function(error) {
            // An error occurred.
            console.error('Error during sign out:', error);
        });
    }, INACTIVITY_LIMIT);
}

function resetTimer() {
    clearTimeout(timeout);
    startTimer();
    hideWarning();
}

function showWarning() {
    // Display warning to user
    modal.style.display = "block";
}

function hideWarning() {
    // Hide warning from user
    modal.style.display = "none";
}

window.onload = resetTimer;
document.onmousemove = resetTimer;
document.onkeypress = resetTimer;

// Check user authentication status
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        // User is not signed in, redirect to index.html
        window.location.href = "index.html";
    } else {
        console.log('User is signed in. UID:', user.uid);
    }
});

// Show warning 3 minutes before session ends
setTimeout(showWarning, INACTIVITY_LIMIT - WARNING_TIME);

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}