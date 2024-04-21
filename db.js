const firebaseConfig = {
    apiKey: "AIzaSyBqSVI28DNBwcU4avJlvikN5QqN4zx-K48",
    authDomain: "refi-n-save.firebaseapp.com",
    databaseURL: "https://refi-n-save-default-rtdb.firebaseio.com",
    projectId: "refi-n-save",
    storageBucket: "refi-n-save.appspot.com",
    messagingSenderId: "1085442028616",
    appId: "1:1085442028616:web:1dea9433deb27abb4e147d",
    measurementId: "G-YLTEXNM1D8"
};


firebase.initializeApp(firebaseConfig);


const database = firebase.database();

// Your existing code...

function storeResponse(response) {
    // Push response to Firebase database
    database.ref('responses').push(response)
        .then(() => {
            console.log("Response stored successfully in database:", response);
        })
        .catch(error => {
            console.error("Error storing response in database:", error);
        });
}

// Modified function to handle input validation and Firebase storage
function validateInputs() {
    if (currentQuestionIndex < questions.length - 3) {
        // For questions with options
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            alert("Please choose an option before proceeding.");
            return false;
        } else {
            // Store option response
            const questionNumber = questions[currentQuestionIndex].questionNumber;
            const response = { questionNumber, response: selectedOption.textContent };
            storeResponse(response);
        }
    } else {
        // For input fields
        if (currentQuestionIndex === questions.length - 3 && nameInput.value.trim() === '') {
            alert("Please enter your name before proceeding.");
            return false;
        } else if (currentQuestionIndex === questions.length - 2 && emailInput.value.trim() === '') {
            alert("Please enter your email before proceeding.");
            return false;
        } else if (currentQuestionIndex === questions.length - 1 && contactInput.value.trim() === '') {
            alert("Please enter your contact number before proceeding.");
            return false;
        } else {
            // Store personal information
            const questionNumber = questions[currentQuestionIndex].questionNumber;
            let response;
            switch (currentQuestionIndex) {
                case questions.length - 3:
                    response = { questionNumber, response: nameInput.value.trim() };
                    break;
                case questions.length - 2:
                    response = { questionNumber, response: emailInput.value.trim() };
                    break;
                case questions.length - 1:
                    response = { questionNumber, response: contactInput.value.trim() };
                    break;
            }
            storeResponse(response);
        }
    }
    return true;
}