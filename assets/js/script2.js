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
        let questionNumber = 0; //FIN QUI CI SIAMO

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
        let row1 = document.createElement("div");
        let row2 = document.createElement("div");
        let answerButton1 = document.createElement("button");
        let answerButton2 = document.createElement("button");
        let answerButton3 = document.createElement("button");
        let answerButton4 = document.createElement("button");
        row1.classList.add("row");
        row2.classList.add("row");
        answerButton1.classList.add("answer");
        answerButton2.classList.add("answer");
        answerButton3.classList.add("answer");
        answerButton4.classList.add("answer");
        answerButton1.classList.add("center");
        answerButton2.classList.add("center");
        answerButton3.classList.add("center");
        answerButton4.classList.add("center");
        row1.append(answerButton1);
        row1.append(answerButton2);
        row2.append(answerButton3);
        row2.append(answerButton4);
        answersDiv.append(row1);
        answersDiv.append(row2);
        let answerButtons = document.querySelectorAll("#answers .row .answer");
        let array = [];

        // ASSEGNA RANDOMICAMENTE I PULSANTI ALLE RISPOSTE
        for (let i = 0; i < 4; i++) {
            if (i < 3) {
                answerButtons[random[arr]].innerHTML = questions[questionNumber][incorrect_answers][i];
            } else {
                answerButtons[random[arr]].innerHTML = questions[questionNumber][correct_answer];
            }
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
            for (let b2 of buttons) {
                b2.classList.remove("selected");
            }
            b.classList.add("selected");

            answerButton.addEventListener("click", () => {
                let selected = document.querySelector("#answers .row .answer.selected");
                if (selected.innerHTML === questions[questionNumber].correct_answer) {
                    selected.classList.add("correct");
                    score += 1;
                    questionNumber += 1; // FIN QUI CI SIAMO
                } else {
                    selected.classList.add("wrong");
                }

                if (questionNumber === questionsNumber - 1) {
                } else {
                    generateQuestion(questions, questionsNumber, questionNumber, score);
                }
            })
        })
    }
}

function random(arr) {
    let numeroRandom = Math.floor(Math.random() * 4);
    if (!arr.includes(numeroRandom)) {
        arr.push(numeroRandom);
        return numeroRandom;
    }

    return random(arr);
}