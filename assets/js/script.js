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

        //GENERAZIONE TIMER
        let header = document.getElementById("header-epicode");
        let externalDiv = document.createElement("div");
        let internalDiv = document.createElement("div");
        let write1 = document.createElement("p");
        let seconds = document.createElement("p");
        let write2 = document.createElement("p");
        externalDiv.id = "external-div";
        internalDiv.id = "internal-div";
        internalDiv.classList.add("center");
        write1.classList.add("write");
        write2.classList.add("write");
        seconds.id = "seconds";
        write1.innerText = "SECONDS";
        write2.innerText = "REMAINING";
        header.append(externalDiv);
        externalDiv.append(internalDiv);
        internalDiv.append(write1);
        internalDiv.append(seconds);
        internalDiv.append(write2);

        startTest(questionsNumber, difficulty);
    }
});










function startTest (questionsNumber, difficulty) {
    let questions = [];
    let string = "https://opentdb.com/api.php?amount=number&category=18&difficulty=easy";
    let fetchString = string.replace("number", questionsNumber);
    fetchString = fetchString.replace("easy", difficulty);

    let score = 0;
    let questionNumber = 0;
    let arrayDomande = [];

    fetch(fetchString).then(res => res.json()).then(domande => {
        questions = domande.results;
        console.log(questions);
        generateQuestion(questions, questionsNumber, questionNumber, score, arrayDomande);

        console.log(score);
    });
}








function generateQuestion (questions, questionsNumber, questionNumber, score, arrayDomande) {
    // CERCO UN EVENTUALE PULSANTE E LO DISTRUGGO
    let proceedButton = document.getElementById("answer-button");
    if (proceedButton) proceedButton.remove();

    // AGGIUNTA TESTO DELLA DOMANDA
    let questionTitle = document.getElementById("question");
    questionTitle.innerHTML = questions[questionNumber].question;
    if(questionTitle.innerHTML.length > 60) {
        questionTitle.classList.add("small");
    }

    // EDIT TESTO CONTATORE DOMANDA
    let questionCounter = document.querySelector("#quiz-info #question-number");
    questionCounter.innerHTML = `QUESTION ${questionNumber + 1} <span>/ ${questionsNumber}</span>`;

    // RESET DIV DOMANDE
    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    // RISPOSTE RANDOMICHE
    let arrayRisposte = [];
    for (let i = 0; i < questions[questionNumber].incorrect_answers.length + 1; i++) {
        if (i == questions[questionNumber].incorrect_answers.length) {
            arrayRisposte[i] = questions[questionNumber].correct_answer;
        } else {
            arrayRisposte[i] = questions[questionNumber].incorrect_answers[i];
        }
    }
    let j = arrayRisposte.length, k, temp;
    while(--j > 0){
        k = Math.floor(Math.random()*(j+1));
        temp = arrayRisposte[k];
        arrayRisposte[k] = arrayRisposte[j];
        arrayRisposte[j] = temp;
    }

    // CREAZIONE DOMANDA
    if (questions[questionNumber].type === "multiple") {
        for (i = 0; i < arrayRisposte.length; i++) {
            // CREO I PULSANTI DELLE RISPOSTE
            let answerButton = document.createElement("button");
            answerButton.classList.add("answer");
            answerButton.classList.add("center");
            answerButton.innerHTML = arrayRisposte[i];
            answersDiv.append(answerButton);

            answerButton.addEventListener("click", () => {
                // RESETTO E RIASSEGNO LA SELEZIONE DELLA RISPOSTA
                let selectedAnswer = document.querySelector(".selected");
                if (selectedAnswer) selectedAnswer.classList.remove("selected");
                answerButton.classList.add("selected");
                arrayDomande[questionNumber] = answerButton.innerHTML;
            });
        }
    } else {
        for (i = 0; i < 2; i++) {
            // CREO I PULSANTI DELLE RISPOSTE
            let answerButton = document.createElement("button");
            answerButton.classList.add("answer");
            answerButton.classList.add("center");
            if (i == 0) {
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
                arrayDomande[questionNumber] = answerButton.innerHTML;
            });
        }
    }

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
            } else  {
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
                } else  {
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
                } else  {
                    clearInterval(timerInterval);
                    return score;
                }
            }
        }
    });
}

// FARE UN PUSH DI OGNI DOMANDA IN UN ARRAY ESTERNO, INSERITO DENTRO IL FETCH (PER SOSTITUIRE IL RETURN);