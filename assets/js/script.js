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
        choicesDiv.remove();
        secondButton.parentElement.remove();

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










function startTest (questionsNumber, difficulty) {
    let questions = [];
    let string = "https://opentdb.com/api.php?amount=number&category=18&difficulty=easy"
    let fetchString = string.replace("number", questionsNumber);
    fetchString = fetchString.replace("easy", difficulty);

    fetch(fetchString).then(res => res.json()).then(domande => {
        questions = domande.results;
        console.log(questions);
        let score = 0;
        let questionNumber = 0;
        let arrayDomande = [];

        generateQuestion(questions, questionsNumber, questionNumber, score, arrayDomande);
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
            }

            if (questionNumber < questions.length) {
                console.log(score);
                setTimeout(() => {
                    setTimeout(generateQuestion(questions, questionsNumber, questionNumber, score, arrayDomande));
                }, 1000);
            } else {
                return score;
            }
        } // FIN QUI CI SIAMO
    });
}