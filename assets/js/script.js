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
        let prosegui = document.createElement("button");
        prosegui.id = "answer-button";
        prosegui.classList.add("button");
        prosegui.classList.add("inter");
        prosegui.innerText = "PROCEED";
        quizInfo.append(prosegui);

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

        generateQuestion(questions, questionsNumber, questionNumber, score);
    });
}

function generateQuestion (questions, questionsNumber, questionNumber, score) {
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

    // CREAZIONE DOMANDA
    if (questions[questionNumber].type === "multiple") {
        let array = [];
        let arr = [];
        for (let i = 0; i < questions[questionNumber].incorrect_answers.length + 1; i++) {
            // CREO I PULSANTI DELLE RISPOSTE
            let answerButton = document.createElement("button");
            answerButton.classList.add("answer");
            answerButton.classList.add("center");
            answersDiv.append(answerButton);

            let numeroRandom = random(array, questions[questionNumber].incorrect_answers.length);
            if (numeroRandom == questions[questionNumber].incorrect_answers.length) {
                answerButton.innerHTML = questions[questionNumber].correct_answer;
            } else {
                answerButton.innerHTML = questions[questionNumber].incorrect_answers[numeroRandom - 1];
            }

            answerButton.addEventListener("click", () => {
                // RESETTO E RIASSEGNO LA SELEZIONE DELLA RISPOSTA
                let selectedAnswer = document.querySelector(".selected");
                if (selectedAnswer) selectedAnswer.classList.remove("selected");
                answerButton.classList.add("selected");

                let proceedButton = document.getElementById("answer-button");
            });
        }
    } else {
        let label1 = document.createElement("label");
        let label2 = document.createElement("label");
        label1.innerHTML = '<input type="radio" name="selection" value="true"> True';
        label2.innerHTML = '<input type="radio" name="selection" value="false"> False';
        answersDiv.append(label1);
        answersDiv.append(label2);
    }

    let buttons = document.querySelectorAll("#answers .row .answer");
    let inputs = document.querySelectorAll("#answers label input");
    let answerButton = document.getElementById("answer-button");

    for (let b of buttons) {
        b.addEventListener("click", () => {
            let selectedAnswer = document.querySelector(".selected");
            if (selectedAnswer) selectedAnswer.classList.remove("selected");

            b.classList.add("selected");

            answerButton.addEventListener("click", proceed());

            function proceed () {
                let selected = document.querySelector("#answers .row .answer.selected");

                if (selected.innerHTML === questions[questionNumber].correct_answer) {
                    selected.classList.add("correct");
                    score += 1;
                    questionNumber += 1; // FIN QUI CI SIAMO
                } else if (selected.innerHTML === questions[questionNumber].incorrect_answers[0] || selected.innerHTML === questions[questionNumber].incorrect_answers[1] || selected.innerHTML === questions[questionNumber].incorrect_answers[2]) {
                    selected.classList.add("wrong");
                    questionNumber += 1;
                }

                if (questionNumber < questionsNumber - 1) {
                    answerButton.removeEventListener("click", proceed());
                    setTimeout(generateQuestion(questions, questionsNumber, questionNumber, score), 2000);
                } else {
                }
            }
        });
    }

    // for (i of inputs) {
    //     i.addEventListener("click", () => {
    //         let selctedInput = document.querySelector("#answers label input.selectedInput");
    //         if (selctedInput) selectedInput.classList.remove("selectedInput");

    //         i.classList.add("selectedInput");

    //         answerButton.addEventListener("click", proceedInput());

    //         function proceedInput () {
    //             let selectedInput2 = document.querySelector("#answers label input.slected");
    //             console.log(selectedInput2);

    //             // if (selectedInput2.innerHTML === questions[questionNumber].correct_answer)
    //         }
    //     })
    // }
}

function random(arr, numero) {
    let numeroRandom = Math.floor(Math.random() * numero + 1);
    if (!arr.includes(numeroRandom)) {
        arr.push(numeroRandom);
        return numeroRandom;
    }

    return random(arr);
}