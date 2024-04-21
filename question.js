const questions = [
  {
    questionNumber: 1,
    question: "Are You Looking To Save Money On Your Home Loan?",
    options: ["Yes", "No"]
  },
  {
    questionNumber: 2,
    question: "Are You Considering Refinancing Your Home Loan?",
    options: ["Yes", "No"]
  },
  {
    questionNumber: 3,
    question: "What Are You Looking For In A Mortgage Broker?",
    options: ["Amazing Customer Service", "Competitive Rates", "Quick Loan Approvals"]
  },
  {
    questionNumber: 4,
    question: "How Much Is Your Current Home Loan?",
    options: ["Less Than $500,000", "More Than $500,000", "Not Sure"]
  },
  {
    questionNumber: 5,
    question: "Please enter your name",
    options: []
  },
  {
    questionNumber: 6,
    question: "Please enter your email",
    options: []
  },
  {
    questionNumber: 7,
    question: "Please enter your contact number",
    options: []
  }
];

let currentQuestionIndex = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const contactInput = document.getElementById('contactInput');
const nextButton = document.getElementById('nextBtn');
const prevButton = document.getElementById('prevBtn');

function showQuestion() {
  const question = questions[currentQuestionIndex];
  if (currentQuestionIndex >= 4 && currentQuestionIndex <= 6) {
    optionsElement.innerHTML = '';
    questionElement.innerHTML = `<p>Question ${question.questionNumber}</p><p>${question.question}</p>`;
    switch (currentQuestionIndex) {
      case 4:
        nameInput.style.display = 'block';
        emailInput.style.display = 'none';
        contactInput.style.display = 'none';
        break;
      case 5:
        nameInput.style.display = 'none';
        emailInput.style.display = 'block';
        contactInput.style.display = 'none';
        break;
      case 6:
        nameInput.style.display = 'none';
        emailInput.style.display = 'none';
        contactInput.style.display = 'block';
        break;
    }
  } else {
    nameInput.style.display = 'none';
    emailInput.style.display = 'none';
    contactInput.style.display = 'none';
    questionElement.innerHTML = `<p>Question ${question.questionNumber}</p><p>${question.question}</p>`;
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option');
      button.addEventListener('click', () => {
        const response = { questionNumber: question.questionNumber, response: option };
        storeResponse(response);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          alert("End of quiz!");
        }
      });
      optionsElement.appendChild(button);
    });
  }
}

function storeResponse(response) {
  console.log("Storing response in database:", response);
}

function validateInputs() {
  if (currentQuestionIndex < questions.length - 3) {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) {
      alert("Please choose an option before proceeding.");
      return false;
    }
  } else {
    if (currentQuestionIndex === questions.length - 3 && nameInput.value.trim() === '') {
      alert("Please enter your name before proceeding.");
      return false;
    } else if (currentQuestionIndex === questions.length - 2 && emailInput.value.trim() === '') {
      alert("Please enter your email before proceeding.");
      return false;
    } else if (currentQuestionIndex === questions.length - 1 && contactInput.value.trim() === '') {
      alert("Please enter your contact number before proceeding.");
      return false;
    }
  }
  return true;
}


nextButton.addEventListener('click', () => {
  if (validateInputs()) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      document.getElementById("nextBtn").addEventListener("click", function() {
        window.location.href = "page3.html";

      });
       

    }
  }
});

prevButton.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  } else {
    alert("This is the first question!");
  }
});

showQuestion();
