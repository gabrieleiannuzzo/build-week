let arrayCompletoDomande = [];

class Domanda {
  constructor (domanda, rispostaEsatta, risposteSbagliate, rispostaUtente) {
    this.domanda = domanda;
    this.rispostaEsatta = rispostaEsatta;
    this.risposteSbagliate = risposteSbagliate;
    this.rispostaUtente = rispostaUtente;
  }

  funzione () {
    arrayCompletoDomande.push(this);
  }
}

let question = new Domanda("ciao", "come", ["stai", "oggi"], 4);
question.funzione();
console.log(question);
console.log(arrayCompletoDomande);