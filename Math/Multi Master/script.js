document.addEventListener('DOMContentLoaded', () => {
    const questionEl = document.getElementById('question');
    const reponseInput = document.getElementById('reponse');
    const validerBtn = document.getElementById('valider');
    const resultatEl = document.getElementById('resultat');
    const nouvelleQuestionBtn = document.getElementById('nouvelle-question');
    const techniqueAideEl = document.getElementById('technique-aide');

    let nombre1, nombre2, bonneReponse;
    const erreursParNombre = {}; 
    const seuilErreurs = 3;

    function genererQuestion() {
        nombre1 = Math.floor(Math.random() * 12) + 1;
        nombre2 = Math.floor(Math.random() * 12) + 1;
        bonneReponse = nombre1 * nombre2;

        questionEl.textContent = `${nombre1} x ${nombre2} = ?`;
        reponseInput.value = '';
        resultatEl.textContent = '';
        techniqueAideEl.innerHTML = '';
        reponseInput.focus();

        validerBtn.style.display = 'inline-block';
        nouvelleQuestionBtn.style.display = 'none';
    }

    function verifierReponse() {
        const reponseUtilisateur = parseInt(reponseInput.value);

        if (reponseUtilisateur === bonneReponse) {
            resultatEl.textContent = `Vrai ! ${bonneReponse}`;
            resultatEl.className = 'resultat correct';
            erreursParNombre[nombre1] = 0;
            erreursParNombre[nombre2] = 0;
        } else {
            resultatEl.textContent = `Faux. La bonne réponse était ${bonneReponse}.`;
            resultatEl.className = 'resultat incorrect';

            erreursParNombre[nombre1] = (erreursParNombre[nombre1] || 0) + 1;
            erreursParNombre[nombre2] = (erreursParNombre[nombre2] || 0) + 1;

            if (erreursParNombre[nombre1] >= seuilErreurs) {
                afficherAide(nombre1, nombre2);
            } else if (erreursParNombre[nombre2] >= seuilErreurs) {
                afficherAide(nombre2, nombre1);
            }
        }

        validerBtn.style.display = 'none';
        nouvelleQuestionBtn.style.display = 'inline-block';
    }

    function afficherAide(nombreDifficile, autreNombre) {
        let astuce = '';

        switch (nombreDifficile) {
            case 1:
                astuce = `Multiplier par 1, c'est facile ! Le résultat est toujours le nombre lui-même : **${autreNombre}**`;
                break;
            case 2:
                astuce = `Multiplier par 2, c'est comme faire une addition : **${autreNombre} + ${autreNombre} = ${autreNombre * 2}**`;
                break;
            case 3:
                astuce = `Pour multiplier par 3, tu peux faire : **2 x ${autreNombre} + ${autreNombre} = ${2 * autreNombre + autreNombre}**`;
                break;
            case 4:
                astuce = `Pour multiplier par 4, tu peux doubler deux fois : **${autreNombre} x 2 = ${autreNombre * 2}** puis **${autreNombre * 2} x 2 = ${autreNombre * 4}**`;
                break;
            case 5:
                astuce = `Pour multiplier par 5, tu peux faire : **${autreNombre} x 10 / 2 = ${autreNombre * 10 / 2}**`;
                break;
            case 6:
                astuce = `Pour multiplier par 6, tu peux faire : **5 x ${autreNombre} + ${autreNombre} = ${5 * autreNombre + autreNombre}**`;
                break;
            case 7:
                astuce = `Pour multiplier par 7, tu peux faire : **5 x ${autreNombre} + 2 x ${autreNombre} = ${5 * autreNombre + 2 * autreNombre}**`;
                break;
            case 8:
                astuce = `Pour multiplier par 8, tu peux doubler trois fois : **${autreNombre} x 2 = ${autreNombre * 2}**, **${autreNombre * 2} x 2 = ${autreNombre * 4}** puis **${autreNombre * 4} x 2 = ${autreNombre * 8}**`;
                break;
            case 9:
                astuce = `Pour multiplier par 9, tu peux faire : **10 x ${autreNombre} - ${autreNombre} = ${10 * autreNombre - autreNombre}**`;
                break;
            case 10:
                astuce = `Pour multiplier par 10, il suffit d'ajouter un zéro à la fin : **${autreNombre}0**`;
                break;
            case 11:
                if (autreNombre <= 9) {
                    astuce = `Pour multiplier par 11, il suffit de répéter le chiffre : **${autreNombre}${autreNombre}**`;
                } else {
                    astuce = `Pour multiplier par 11, tu peux faire : **10 x ${autreNombre} + ${autreNombre} = ${10 * autreNombre + autreNombre}**`;
                }
                break;
            case 12:
                astuce = `Pour multiplier par 12, tu peux faire : **10 x ${autreNombre} + 2 x ${autreNombre} = ${10 * autreNombre + 2 * autreNombre}**`;
                break;
        }

        if (astuce) {
            techniqueAideEl.innerHTML = `<p>Astuce :</p><p>${astuce}</p>`;
            techniqueAideEl.className = 'technique-aide';
        }
    }

    validerBtn.addEventListener('click', verifierReponse);
    nouvelleQuestionBtn.addEventListener('click', genererQuestion);

    reponseInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifierReponse();
        }
    });

    genererQuestion();
});
