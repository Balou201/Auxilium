document.addEventListener('DOMContentLoaded', () => {
    const questionEl = document.getElementById('question');
    const reponseInput = document.getElementById('reponse');
    const validerBtn = document.getElementById('valider');
    const resultatEl = document.getElementById('resultat');
    const nouvelleQuestionBtn = document.getElementById('nouvelle-question');

    let nombre1, nombre2, bonneReponse;

    function genererQuestion() {
        nombre1 = Math.floor(Math.random() * 10) + 1; // Nombres de 1 à 10
        nombre2 = Math.floor(Math.random() * 10) + 1;
        bonneReponse = nombre1 * nombre2;

        questionEl.textContent = `${nombre1} x ${nombre2} = ?`;
        reponseInput.value = '';
        resultatEl.textContent = '';
        reponseInput.focus();

        validerBtn.style.display = 'inline-block';
        nouvelleQuestionBtn.style.display = 'none';
    }

    function verifierReponse() {
        const reponseUtilisateur = parseInt(reponseInput.value);

        if (reponseUtilisateur === bonneReponse) {
            resultatEl.textContent = `Vrai ! ${bonneReponse}`;
            resultatEl.className = 'resultat correct';
        } else {
            resultatEl.textContent = `Faux. La bonne réponse était ${bonneReponse}.`;
            resultatEl.className = 'resultat incorrect';
        }

        validerBtn.style.display = 'none';
        nouvelleQuestionBtn.style.display = 'inline-block';
    }

    validerBtn.addEventListener('click', verifierReponse);
    nouvelleQuestionBtn.addEventListener('click', genererQuestion);

    // Permet de valider avec la touche Entrée
    reponseInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifierReponse();
        }
    });

    // On lance la première question au chargement de la page
    genererQuestion();
});
