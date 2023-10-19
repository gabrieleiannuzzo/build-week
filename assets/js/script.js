const checkbox = document.getElementById('accept');
const button = document.querySelector('.terzo-div button');
let checkMark = document.getElementById("checkmark");
button.addEventListener("click",goToTest);

checkbox.addEventListener("change", () => {
    if (checkMark.innerHTML == "") {
        checkMark.innerHTML = '<i class="fas fa-check"></i>';
    } else {
        checkMark.innerHTML = "";
    }
})

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

            // GENERO IL PULSANTE
            let proceedButton = document.createElement("button");
            quizInfo = document.getElementById("quiz-info");
            proceedButton.id = "answer-button";
            proceedButton.classList.add("button");
            proceedButton.classList.add("inter");
            proceedButton.innerText = "PROCEED";
            quizInfo.append(proceedButton);

            startTest(questionsNumber, difficulty);
        }
    });

}

function startTest (questionsNumber, difficulty) {
    let questions = [];
    let string = "https://opentdb.com/api.php?amount=number&category=18&difficulty=easy";
    let fetchString = string.replace("number", questionsNumber);
    fetchString = fetchString.replace("easy", difficulty);

    let questionNumber = 0;
    let arrayDomande = [];

    fetch(fetchString).then(res => res.json()).then(domande => {
        questions = domande.results;
        console.log(questions);
        generateQuestion(questions, questionsNumber, questionNumber, arrayDomande);
    });
}

function generateQuestion (questions, questionsNumber, questionNumber, arrayDomande) {
    // CERCO UN EVENTUALE PULSANTE E LO DISTRUGGO
    let proceedButton = document.getElementById("answer-button");
    if (proceedButton) proceedButton.remove();

    // GENERO IL TIMER

    let oldTimer = document.getElementById("external-div");
    if (oldTimer) oldTimer.remove();
    
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
    seconds.id = "seconds";
    write2.classList.add("write");
    write1.innerText = "SECONDS";
    seconds.innerText = "60";
    write2.innerText = "REMAINING";
    internalDiv.append(write1);
    internalDiv.append(seconds);
    internalDiv.append(write2);
    externalDiv.append(internalDiv);
    header.append(externalDiv);

    let timer = 5;
    let timeEnded = false;
    seconds.innerText = timer;
    let timerInterval = setInterval(() => {
        timer--;
        seconds.innerText = timer;
        if (timer == 0) {
            timeEnded = true;
            proceedButton.click();
        }
    }, 1000);

    // AGGIUNTA FUNZIONALITA PER CLICK ESTERNO
    let container = document.getElementById("container-epicode");
    function gestisciClickEsterno (event) {
        if (!container.contains(event.target)) {
            container.classList.add("blur");
        }
    }

    // container.addEventListener("click", gestisciClickEsterno);

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
                questionNumber += 1;
            } else {
                selected.classList.add("wrong");
                questionNumber += 1;

                let answerButtons = document.querySelectorAll("#answers .answer");
                for (let answer of answerButtons) {
                    if (answer.innerHTML == questions[questionNumber - 1].correct_answer) answer.classList.add("correct");
                }
            }

            if (questionNumber < questions.length) {
                clearInterval(timerInterval);
                setTimeout(() => {
                    setTimeout(generateQuestion(questions, questionsNumber, questionNumber, arrayDomande));
                }, 1000);
            } else  {
                clearInterval(timerInterval);
                setTimeout(() => {
                    setTimeout(goToResults(questions, arrayDomande));
                }, 1000);
            }
        } // FIN QUI CI SIAMO

        if (timeEnded) {
            if (selected) {
                if (selected.innerHTML == questions[questionNumber].correct_answer) {
                    selected.classList.add("correct");
                    questionNumber += 1;
                } else {
                    selected.classList.add("wrong");
                    questionNumber += 1;

                    let answerButtons = document.querySelectorAll("#answers .answer");
                    for (let answer of answerButtons) {
                        if (answer.innerHTML == questions[questionNumber - 1].correct_answer) answer.classList.add("correct");
                    }
                }
    
                if (questionNumber < questions.length) {
                    clearInterval(timerInterval);
                    setTimeout(() => {
                        setTimeout(generateQuestion(questions, questionsNumber, questionNumber, arrayDomande));
                    }, 1000);
                } else  {
                    clearInterval(timerInterval);
                    setTimeout(() => {
                        setTimeout(goToResults(questions, arrayDomande));
                    }, 1000);
                }
            } else {
                questionNumber += 1;
                if (questionNumber < questions.length) {
                    clearInterval(timerInterval);
                    setTimeout(() => {
                        setTimeout(generateQuestion(questions, questionsNumber, questionNumber, arrayDomande));
                    }, 1000);
                } else  {
                    clearInterval(timerInterval);
                    setTimeout(() => {
                        setTimeout(goToResults(questions, arrayDomande));
                    }, 1000);
                }
            }
        }
    });
}

function goToResults (questions, arrayDomande) {
    let risposteCorrette = 0;
    let domandeTotali = questions.length;

    for (let i = 0; i < arrayDomande.length; i++) {
        if (arrayDomande[i] == questions[i].correct_answer) {
            risposteCorrette += 1;
        }
    }

    let timer = document.getElementById("external-div");
    let question = document.getElementById("question");
    let answers = document.getElementById("answers");
    let quizInfo = document.getElementById("quiz-info");
    timer.remove();
    question.remove();
    answers.remove();
    quizInfo.remove();

    let target = document.getElementById("container-epicode");
    let templateResults = document.getElementById("template-results");
    let clone = document.importNode(templateResults.content, true);
    target.append(clone);

    calculatePercentage(risposteCorrette, domandeTotali);
}

function calculatePercentage (risposteCorrette, domandeTotali) {
    let correctPercentage = ((risposteCorrette / domandeTotali) * 100).toFixed(1);
    let wrongPercentage = (100 - correctPercentage).toFixed(1);

    if (correctPercentage < 60) {
        let titleCircle = document.getElementById("title-circle");
        let textBlue = document.getElementById("text-blue");
        let textCircle = document.getElementById("text-circle-certificate");

        titleCircle.innerText = "Bad job";
        textBlue.innerText = "You didn't pass the exam";
        textCircle.innerText = "Michele is furious with you. During the next lesson you will be obliged to create some pages without using &lt;div> tags";

        titleCircle.classList.add("not-passed");
        textBlue.classList.add("not-passed");
    }

    const myChart = document.querySelector(".my-chart");
    const chartData = {
        labels: ["sbagliate", "corrette"],
        data: [domandeTotali - risposteCorrette, risposteCorrette],
        backgroundColor: ["#c2128d", "#00ffff"],
    }

    new Chart (myChart, {
        type: "doughnut",
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: "Domande",
                    data: chartData.data,
                    backgroundColor: chartData.backgroundColor,
                }
            ]
        },

        options: {
            borderWidth: 0,
            borderRadius: 0,
            weight: 10,
            cutout: 105,
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });

    let correctP = document.getElementById("percentuale-correct");
    let wrongP = document.getElementById("percentuale-wrong");
    let correctNumberP = document.getElementById("questions-correct");
    let wrongNumberP = document.getElementById("questions-wrong");

    correctP.innerText = correctPercentage + "%";
    wrongP.innerText = wrongPercentage + "%";
    correctNumberP.innerText = risposteCorrette + "/" + domandeTotali + " questions";
    wrongNumberP.innerText = (domandeTotali - risposteCorrette) + "/" + domandeTotali + " questions";

    let button = document.querySelector(".rate-button");
    button.addEventListener("click", goToReview);
}

function goToReview () {
    let containerTitle = document.getElementById("container-title");
    let answerText = document.getElementById("answer-text");
    let rateButton = document.querySelector(".rate-button");
    containerTitle.remove();
    answerText.remove();
    rateButton.remove();

    let target = document.getElementById("container-epicode");
    let templateReview = document.getElementById("template-review");
    let clone = document.importNode(templateReview.content, true);
    target.append(clone);
    console.log(clone);

    let stars = document.querySelectorAll(".stelle svg");
    console.log(stars);
    for (let star of stars) {
        star.addEventListener("mouseenter", () => {
            star.classList.add("onhover");
            let sibling = star.previousElementSibling;
            while(sibling) {
                sibling.classList.add("onhover");
                sibling = sibling.previousElementSibling;
            }
        });

        star.addEventListener("mouseleave", () => {
            for (let i of stars) i.classList.remove("onhover");
        });

        star.addEventListener("click", () => {
            if (star.classList.contains("onclick") && !(star.nextElementSibling.classList.contains("onclick"))) {
                for (i of stars) {
                    i.classList.remove("onclick");
                    i.classList.remove("onhover");
                }
            } else {
                for (i of stars) {
                    if (i.classList.contains("onclick")) {
                        i.classList.remove("onclick");
                    }
                }
                star.classList.add("onclick");
                let sibling = star.previousElementSibling;
                while(sibling) {
                    sibling.classList.add("onclick");
                    sibling = sibling.previousElementSibling;
                }
            }
        })
    }
}

// aggiungere stile al timer
// verificare domande e innerHTML
// aggiungere blur e timer se si clicca fuori dalla pagina
// aggiungere easter egg all'ultimo pulsante
// accorciare il codice dove si può