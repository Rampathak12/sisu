import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzo8LvRBfFFBeruoRTOJpXMzE0vNRpDVw",
  authDomain: "chilldcare-8da7f.firebaseapp.com",
  projectId: "chilldcare-8da7f",
  storageBucket: "chilldcare-8da7f.firebasestorage.app",
  messagingSenderId: "829019516603",
  appId: "1:829019516603:web:5dbd129648ff985ebf839e",
  measurementId: "G-MFHGR6HV89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Elements
const healthDataForm = document.getElementById("health-data-form");
const childNameInput = document.getElementById("child-name");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiInput = document.getElementById("bmi");
const bloodPressureInput = document.getElementById("blood-pressure");
const healthDataTable = document.getElementById("health-data-table").getElementsByTagName('tbody')[0];

// Submit form data to Firestore
healthDataForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, "healthData"), {
      name: childNameInput.value,
      height: heightInput.value,
      weight: weightInput.value,
      bmi: bmiInput.value,
      bloodPressure: bloodPressureInput.value
    });
    alert("Data submitted successfully!");
    loadHealthData();  // Reload data after submit
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});

// Fetch and display health data
async function loadHealthData() {
  const querySnapshot = await getDocs(collection(db, "healthData"));
  healthDataTable.innerHTML = "";  // Clear previous data
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = healthDataTable.insertRow();
    row.insertCell(0).textContent = data.name;
    row.insertCell(1).textContent = data.height;
    row.insertCell(2).textContent = data.weight;
    row.insertCell(3).textContent = data.bmi;
    row.insertCell(4).textContent = data.bloodPressure;
  });
}

// Load health data on page load
loadHealthData();
