// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRHnqXIfnO7S-i1q7RBpXEaLP2QA26B20",
  authDomain: "login-form-a0e9c.firebaseapp.com",
  projectId: "login-form-a0e9c",
  storageBucket: "login-form-a0e9c.appspot.com",
  messagingSenderId: "920217204446",
  appId: "1:920217204446:web:d057645601a3c13323f44f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function updateUserProfile(user) {
  const userName = user.displayName;
  const userEmail = user.email;
  const userProfilePicture = user.photoURL;
  
  console.log(userEmail);
  
  document.getElementById("userName").textContent = userName;
  document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userProfilePicture").src = userProfilePicture;
  
  // Show the profile container with animation
  document.getElementById("profileContainer").style.opacity = '1';
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUserProfile(user);
  } else {
    alert("Create Account & login");
    // Redirect to registration page or login page
    window.location.href = "register.html";
  }
});
