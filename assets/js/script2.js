const checkbox = document.getElementById('accept');
const button = document.querySelector('.terzo-div button');
button.addEventListener("click",goToTest);

function goToTest(){
    if (checkbox.checked) {
        let target = document.getElementById("container-epicode");
        let secondario = document.querySelector(".secondario");
        secondario.remove();

        let choices = document.createElement("div");
        choices.id = "choices";
        for (let i = 0; i < 2; i++) {
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let pChoice = document.createElement("p");
            let pError = document.createElement("p");
            div1.classList.add("choice");
            div2.classList.add("choice");
            pChoice.classList.add("choice-p");
            pError.classList.add("error");
            pError.classList.add("hide");
            if (i == 0) {
                pChoice.innerText = "Choose how many questions you want to answer to (10 to 40)";
                pError.innerText = "You must enter a number between 10 and 40"
                pError.id = "input-error";
                let input = document.createElement("input");
                input.setAttribute("type", "number");
                div1.append(pChoice);
                div1.append(input);
                div1.append(pError);
                choices.append(div1);
            } else {
                pChoice.innerText = "Choose the difficulty";
                pError.innerText = "You must choose a difficulty";
                pError.id = "select-error";
                let select = document.createElement("select");
                let option1 = document.createElement("option");
                let option2 = document.createElement("option");
                let option3 = document.createElement("option");
                let option4 = document.createElement("option");
                option1.value = "";
                option1.innerText = "";
                option2.value = "easy";
                option2.innerText = "Easy";
                option3.value = "medium";
                option3.innerText = "Medium";
                option4.value = "hard";
                option4.innerText = "Hard";
                select.append(option1);
                select.append(option2);
                select.append(option3);
                select.append(option4);
                div2.append(pChoice);
                div2.append(select);
                div2.append(pError);
                choices.append(div2);
            }
        }

        let secondButtonDiv = document.createElement("div");
        let btn = document.createElement("button");
        secondButtonDiv.id = "second-button-div";
        btn.id = "second-button";
        btn.classList.add("button");
        btn.classList.add("inter");
        btn.innerText = "PROCEED";
        secondButtonDiv.append(btn);
        target.append(choices);
        target.append(secondButtonDiv);
    }

    let input = document.querySelector("input");
    let select = document.querySelector("select");
    let secondButton = document.getElementById("second-button");
    let choicesDiv = document.getElementById("choices");

    secondButton.addEventListener("click", () => {
        let questionsNumber = input.value;
        let difficulty = select.value;

        if (!questionsNumber || questionsNumber < 10 || questionsNumber > 40 || difficulty == "" ) {
            if (!questionsNumber || questionsNumber < 10 || questionsNumber > 40) {
                let inputError = document.getElementById("input-error");

                input.classList.add("red-border");
                inputError.classList.remove("hide");

                input.addEventListener("click", () => {
                    input.classList.remove("red-border");
                    inputError.classList.add("hide");
                });
            }

            if (!difficulty) {
                let selectError = document.getElementById("select-error");

                select.classList.add("red-border");
                selectError.classList.remove("hide");

                select.addEventListener("click", () => {
                    select.classList.remove("red-border");
                    selectError.classList.add("hide");
                });
            }
        } else {
            // RIMOZIONE SELETTORI NUMERO DI DOMANDE E DIFFICOLTA E BOTTONE
            choicesDiv.remove();
            secondButton.parentElement.remove();

            // GENERAZIONE DIV VUOTI PER DOMANDE E INFO QUIZ
            let containerEpicode = document.getElementById("container-epicode");
            let questionTitle = document.createElement("p");
            questionTitle.id = "question";
            questionTitle.classList.add("center");
            let answersDiv = document.createElement("div");
            answersDiv.id = "answers";
            let quizInfo = document.createElement("div");
            quizInfo.id = "quiz-info";
            containerEpicode.append(questionTitle);
            containerEpicode.append(answersDiv);
            containerEpicode.append(quizInfo);
            let questionCounter = document.createElement("p");
            questionCounter.id = "question-number";
            quizInfo.append(questionCounter);

            startTest(questionsNumber, difficulty);
        }
    });

}















// let input = document.querySelector("input");
// let select = document.querySelector("select");
// let secondButton = document.getElementById("second-button");
// let choicesDiv = document.getElementById("choices");

// secondButton.addEventListener("click", () => {
//   let questionsNumber = input.value;
//   let difficulty = select.value;

//   if (!questionsNumber || questionsNumber < 10 || questionsNumber > 40 || difficulty == "") {
//     if (!questionsNumber || questionsNumber < 10 || questionsNumber > 40) {
//       let inputError = document.getElementById("input-error");

//       input.classList.add("red-border");
//       inputError.classList.remove("hide");

//       input.addEventListener("click", () => {
//         input.classList.remove("red-border");
//         inputError.classList.add("hide");
//       });
//     }

//     if (!difficulty) {
//       let selectError = document.getElementById("select-error");

//       select.classList.add("red-border");
//       selectError.classList.remove("hide");

//       select.addEventListener("click", () => {
//         select.classList.remove("red-border");
//         selectError.classList.add("hide");
//       });
//     }
//   } else {
//     // RIMOZIONE SELETTORI NUMERO DI DOMANDE E DIFFICOLTA E BOTTONE
//     choicesDiv.remove();
//     secondButton.parentElement.remove();

//     // GENERAZIONE DIV VUOTI PER DOMANDE E INFO QUIZ
//     let containerEpicode = document.getElementById("container-epicode");
//     let questionTitle = document.createElement("p");
//     questionTitle.id = "question";
//     questionTitle.classList.add("center");
//     let answersDiv = document.createElement("div");
//     answersDiv.id = "answers";
//     let quizInfo = document.createElement("div");
//     quizInfo.id = "quiz-info";
//     containerEpicode.append(questionTitle);
//     containerEpicode.append(answersDiv);
//     containerEpicode.append(quizInfo);
//     let questionCounter = document.createElement("p");
//     questionCounter.id = "question-number";
//     quizInfo.append(questionCounter);

//     startTest(questionsNumber, difficulty);
//   }
// });



























































function startTest(questionsNumber, difficulty) {
  let questions = [];
  let string = "https://opentdb.com/api.php?amount=number&category=18&difficulty=easy";
  let fetchString = string.replace("number", questionsNumber);
  fetchString = fetchString.replace("easy", difficulty);

  let score = 0;
  let questionNumber = 0;
  let arrayDomande = [];
  let arrayCompletoDomande = [];

  fetch(fetchString).then(res => res.json()).then(domande => {
    questions = domande.results;
    console.log(questions);

    for (let i = 0; i < questionsNumber; i++) {
      if (i < questionsNumber - 1) {
        generateObject(questions, i, arrayCompletoDomande);
        generateQuestionTemplate(arrayCompletoDomande, i, questionsNumber);
      }
    }



    // generateQuestion(questions, questionsNumber, questionNumber, score, arrayDomande);
  });
}

function generateObject(questions, i, arrayCompletoDomande) {
  class Domanda {
    constructor(tipo, domanda, rispostaEsatta, risposteSbagliate) {
      this.tipo = tipo
      this.domanda = domanda;
      this.rispostaEsatta = rispostaEsatta;
      this.risposteSbagliate = risposteSbagliate;
      this.rispostaUtente = "";
    }

    funzione() {
      arrayCompletoDomande.push(this);
    }
  }

  let question = new Domanda(questions[i].type, questions[i].question, questions[i].correct_answer, questions[i].incorrect_answers);
  question.funzione();
}






function generateQuestionTemplate(arrayCompletoDomande, i, questionsNumber) {
  // CERCO UN EVENTUALE PULSANTE E LO DISTRUGGO *?
  let proceedButton = document.getElementById("answer-button");
  if (proceedButton) proceedButton.remove();

  // AGGIUNTA TESTO DELLA DOMANDA
  let questionTitle = document.getElementById("question");
  questionTitle.innerHTML = arrayCompletoDomande[i].domanda;
  if (questionTitle.innerHTML.length > 60) {
    questionTitle.classList.add("small");
  }

  // EDIT TESTO CONTATORE DOMANDA
  let questionCounter = document.querySelector("#quiz-info #question-number");
  questionCounter.innerHTML = `QUESTION ${i + 1} <span>/ ${questionsNumber}</span>`;

  // RESET DIV DOMANDE
  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  // RISPOSTE RANDOMICHE
  let arrayCompletoRisposte = [];
  for (let j = 0; j < arrayCompletoDomande[i].risposteSbagliate.length + 1; j++) {
    if (j == arrayCompletoDomande[i].risposteSbagliate.length) {
      arrayCompletoRisposte[j] = arrayCompletoDomande[i].rispostaEsatta;
    } else {
      arrayCompletoRisposte[j] = arrayCompletoDomande[i].risposteSbagliate[j];
    }
  }
  let k = arrayRisposte.length, l, temp;
  while (--j > 0) {
    l = Math.floor(Math.random() * (k + 1));
    temp = arrayRisposte[l];
    arrayRisposte[l] = arrayRisposte[k];
    arrayRisposte[k] = temp;
  }

  // CREAZIONE DOMANDA
  if (arrayCompletoDomande[i].type === "multiple") {
    for (j = 0; j < arrayRisposte.length; j++) {
      // CREO I PULSANTI DELLE RISPOSTE
      let answerButton = document.createElement("button");
      answerButton.classList.add("answer");
      answerButton.classList.add("center");
      answerButton.innerHTML = arrayRisposte[j];
      answersDiv.append(answerButton);

      answerButton.addEventListener("click", () => {
        // RESETTO E RIASSEGNO LA SELEZIONE DELLA RISPOSTA
        let selectedAnswer = document.querySelector(".selected");
        if (selectedAnswer) selectedAnswer.classList.remove("selected");
        answerButton.classList.add("selected");
        arrayCompletoDomande[i].rispostaUtente = answerButton.innerHTML;
      });
    }
  } else {
    for (j = 0; j < 2; j++) {
      // CREO I PULSANTI DELLE RISPOSTE
      let answerButton = document.createElement("button");
      answerButton.classList.add("answer");
      answerButton.classList.add("center");
      if (j == 0) {
        answerButton.innerHTML = "True"
      } else {
        answerButton.innerHTML = "False";
      }
      answersDiv.append(answerButton);

      answerButton.addEventListener("click", () => {
        // RESETTO E RIASSEGNO LA SELEZIONE DELLA RISPOSTA
        let selectedAnswer = document.querySelector(".selected");
        if (selectedAnswer) selectedAnswer.classList.remove("selected");
        answerButton.classList.add("selected");
        arrayCompletoDomande[i].rispostaUtente = answerButton.innerHTML;
      });
    }
  }
}




















function generateQuestion(questions, questionsNumber, questionNumber, score, arrayDomande) {
  // CREO IL BUTTON PER L'INVIO DELLA RISPOSTA
  proceedButton = document.createElement("button");
  let quizInfo = document.getElementById("quiz-info");
  proceedButton.id = "answer-button";
  proceedButton.classList.add("button");
  proceedButton.classList.add("inter");
  proceedButton.innerText = "PROCEED";
  quizInfo.append(proceedButton);

  // RESETTO IL TIMER
  let timer = document.getElementById("seconds");
  let seconds = 60;
  let timeEnded = false;
  timer.innerText = seconds;
  let timerInterval = setInterval(() => {
    seconds--;
    timer.innerText = seconds;
    if (seconds == 0) {
      timeEnded = true;
      proceedButton.click();
    }
  }, 1000);

  // VEDO SE LA RISPOSTA E GIUSTA, POI SE CI SONO ALTRE DOMANDE GENERO UNA NUOVA DOMANDA, ALTRIMENTI PROCEDO ALLA PAGINA SUCCESSIVA
  proceedButton.addEventListener("click", () => {
    let selected = document.querySelector(".answer.selected");

    if (selected) {
      if (selected.innerHTML == questions[questionNumber].correct_answer) {
        selected.classList.add("correct");
        score += 1;
        questionNumber += 1;
      } else {
        selected.classList.add("wrong");
        questionNumber += 1;

        // let correctAnswer = questions[questionNumber].correct_answer;
        // let answers = document.querySelector(".answer");
        // for (let answer of answers) {
        //     if (answer.innerText == correctAnswer) answer.classList.add("correct");
        // }
      }

      if (questionNumber < questions.length) {
        console.log(score);
        clearInterval(timerInterval);
        setTimeout(() => {
          setTimeout(generateQuestion(questions, questionsNumber, questionNumber, score, arrayDomande));
        }, 1000);
      } else {
        clearInterval(timerInterval);
        return score;
      }
    } // FIN QUI CI SIAMO

    if (timeEnded) {
      if (selected) {
        if (selected.innerHTML == questions[questionNumber].correct_answer) {
          selected.classList.add("correct");
          score += 1;
          questionNumber += 1;
        } else {
          selected.classList.add("wrong");
          questionNumber += 1;
        }

        if (questionNumber < questions.length) {
          console.log(score);
          clearInterval(timerInterval);
          setTimeout(() => {
            setTimeout(generateQuestion(questions, questionsNumber, questionNumber, score, arrayDomande));
          }, 1000);
        } else {
          clearInterval(timerInterval);
          return score;
        }
      } else {
        questionNumber += 1;
        if (questionNumber < questions.length) {
          console.log(score);
          clearInterval(timerInterval);
          setTimeout(() => {
            setTimeout(generateQuestion(questions, questionsNumber, questionNumber, score, arrayDomande));
          }, 1000);
        } else {
          clearInterval(timerInterval);
          return score;
        }
      }
    }
  });
}

// FARE UN PUSH DI OGNI DOMANDA IN UN ARRAY ESTERNO, INSERITO DENTRO IL FETCH (PER SOSTITUIRE IL RETURN);