// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRHnqXIfnO7S-i1q7RBpXEaLP2QA26B20",
    authDomain: "login-form-a0e9c.firebaseapp.com",
    databaseURL: "https://login-form-a0e9c-default-rtdb.firebaseio.com",
    projectId: "login-form-a0e9c",
    storageBucket: "login-form-a0e9c.appspot.com",
    messagingSenderId: "920217204446",
    appId: "1:920217204446:web:d057645601a3c13323f44f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();

document.getElementById("google-btn").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in successfully:", user);

            // Redirect to userdata.html
            window.location.href = "./userdata.html"; // Ensure this path is correct
        })
        .catch((error) => {
            console.error("Error during sign-in:", error.message);
            alert("Failed to sign in. Please try again.");
        });
});



function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    
    // Retrieve user information
    const userProfile = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl(),
    };
  
    // Save to local storage
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  
    // Redirect to userdata.html
    window.location.href = "userdata.html";
  }
  
