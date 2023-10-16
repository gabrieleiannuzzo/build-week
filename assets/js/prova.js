// TIPS:
// / Usa una variabile globale per registrare il punteggio dell'utente
// / Crea una variabile "questionNumber" per tenere traccia del numero (o posizione) della domanda presentata all'utente
// / Quando "questionNumber" è maggiore delle domande disponibili, a quel punto l'applicazione dovrà mostrare il punteggio
// / Comincia salvando le domande in una variabile (o reperiscile dall'URL fornito usando AJAX e fetch)
// / Parti con l'implementazione semplice, poi passa agli extra e ad abbellire l'interfaccia 
// / Fai test completi: controlla la console periodicamente per verificare che non ci siano errori e che il flusso di dati sia quello che ti aspetti

// EXTRA:
// / Dai un feedback sulla risposta al momento del click (corretta o sbagliata)
// / Permetti all'utente di selezionare la difficoltà del quiz prima di iniziare e il numero di domande che desidera ricevere.
// ( Se hai implementato l'applicazione usando l'URL fornito, puoi ottenere i dati che ti servono in modo semplice, 
// usando query parameters in questo modo: https://opentdb.com/api.php?amount=20&category=18&difficulty=easy e modificarne il numero di domande e difficoltà )





window.onload = function () {
    // TIPS:
    
    // Mostra la prima domanda con il testo e i radio button.
    // Quando l'utente seleziona una risposta, passa alla domanda successiva dell'array e sostituisci quella precedentemente visualizzata con quella corrente,
    // salvando le risposte dell'utente in una variabile
  };






  // Se stai mostrando una domanda alla volta, aggiungi semplicemente un punto alla variabile del punteggio che hai precedentemente creato SE la risposta selezionata è === correct_answer