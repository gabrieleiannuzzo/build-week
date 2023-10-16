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
        secondButton.remove();

        let containerEpicode = document.getElementById("container-epicode");
        let template1 = document.getElementsByTagName("template")[0];
        let questionTitle = template1.content.firstElementChild.cloneNode(true);
        let template2 = document.getElementsByTagName("template")[1];
        let answersDiv = template2.content.firstElementChild.cloneNode(true);
        let template3 = document.getElementsByTagName("template")[2];
        let quizInfo = template3.content.firstElementChild.cloneNode(true);
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
        let score = 0;
        let questionNumber = 0;

        generateQuestion(questions, questionsNumber, questionNumber, score);
    });
}

function generateQuestion (questions, questionsNumber, questionNumber, score) {
    questionNumber += 1;

    let questionTitle = document.getElementById("question");
    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    questionTitle.innerText = question[questionNumber - 1].question;

    if (questions[questionNumber].type === "multiple") {
        let row = document.createElement("div");
        let answerButton = document.createElement("button");
        row.classList.add("row");
        answerButton.classList.add("answer");
        answerButton.classList.add("center");
        row.append(answerButton);
        row.append(answerButton);
        answersDiv.append(row);
        answersDiv.append(row);
        let answerButtons = document.querySelectorAll("#answers .row .answer");
        let array = [];

        for (let i = 0; i < 4; i++) {
            if (i < 3) {
                answerButtons[random[arr]].innerText = questions[questionNumber - 1].incorrect_answers[i];
            } else {
                answerButtons[random[arr]].innerText = questions[questionNumber - 1].correct_answer
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
}

function random(arr) {
    let numeroRandom = Math.floor(Math.random() * 76) + 1;
    if (!arr.includes(numeroRandom)) {
        arr.push(numeroRandom);
        return numeroRandom;
    }

    return random(arr);
}
















let score = 0;
let questionNumber = 1;
let answers = document.querySelectorAll(".row .answer");
let answerButton = document.getElementById("answer-button");

for (let answer of answers) {
    answer.addEventListener("click", () => {
        answerButton.addEventListener("click", () => {
            if (true) {
                answer.classList.add("correct");
            } else {
                answer.classList.add("wrong");
            }

            for (a of answers) {
                a.classList.remove("selected");
            }

            answer.classList.add("selected");
        });
    });
}