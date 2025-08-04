document.addEventListener('DOMContentLoaded', () => {
    let verbes = [];
    const pronoms = ["je", "tu", "il", "nous", "vous", "ils"];

    // Liens de navigation
    const lienAccueil = document.getElementById('lien-accueil');
    const lienExercice = document.getElementById('lien-exercice');
    const sectionAccueil = document.getElementById('section-accueil');
    const sectionExercice = document.getElementById('section-exercice');

    // Éléments de la section d'accueil
    const formAjout = document.getElementById('form-ajout');
    const verbeInfinitifInput = document.getElementById('verbe-infinitif');
    const conjugaisonsInputs = pronoms.reduce((acc, p) => {
        acc[p] = document.getElementById(`conjugaison-${p}`);
        return acc;
    }, {});
    const listeUl = document.getElementById('liste-ul');
    const boutonReset = document.getElementById('bouton-reset');

    // Éléments de la section d'exercice
    const boutonDemarrer = document.getElementById('bouton-demarrer');
    const zoneConfiguration = document.getElementById('zone-configuration');
    const zoneExerciceContenu = document.getElementById('zone-exercice-contenu');
    const consigneExercice = document.getElementById('consigne-exercice');
    const exerciceMultipleDiv = document.getElementById('exercice-multiple');
    const exerciceUniqueDiv = document.getElementById('exercice-unique');
    const messageFeedback = document.getElementById('message-feedback');
    const boutonSuivant = document.getElementById('bouton-suivant');
    const conjugaisonsExerciceInputs = pronoms.reduce((acc, p) => {
        acc[p] = document.getElementById(`input-${p}`);
        return acc;
    }, {});
    const boutonSoumettreComplet = document.getElementById('bouton-soumettre-complet');
    const inputUnique = document.getElementById('input-unique');
    const boutonSoumettreUnique = document.getElementById('bouton-soumettre-unique');

    // Variables pour l'exercice
    let verbeCourant;
    let typeExerciceCourant;
    let pronomCourant;

    // Fonctions de chargement/sauvegarde
    function chargerVerbes() {
        const verbesSauvegardes = localStorage.getItem('conjugaisonVerbes');
        if (verbesSauvegardes) {
            verbes = JSON.parse(verbesSauvegardes);
            afficherVerbes();
        }
    }

    function sauvegarderVerbes() {
        localStorage.setItem('conjugaisonVerbes', JSON.stringify(verbes));
    }

    // Fonctions d'affichage
    function afficherVerbes() {
        listeUl.innerHTML = '';
        verbes.forEach((verbe, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<div><strong>${verbe.infinitif}</strong><br>
                Je: ${verbe.je}, Tu: ${verbe.tu}, Il: ${verbe.il}, Nous: ${verbe.nous}, Vous: ${verbe.vous}, Ils: ${verbe.ils}</div>`;
            
            const boutonSupprimer = document.createElement('button');
            boutonSupprimer.textContent = 'Supprimer';
            boutonSupprimer.addEventListener('click', () => {
                supprimerVerbe(index);
            });
            li.appendChild(boutonSupprimer);
            listeUl.appendChild(li);
        });
    }

    // Gestion de la navigation
    lienAccueil.addEventListener('click', (e) => {
        e.preventDefault();
        sectionAccueil.style.display = 'block';
        sectionExercice.style.display = 'none';
        afficherVerbes();
    });

    lienExercice.addEventListener('click', (e) => {
        e.preventDefault();
        sectionAccueil.style.display = 'none';
        sectionExercice.style.display = 'block';
        zoneConfiguration.style.display = 'block';
        zoneExerciceContenu.style.display = 'none';
    });

    // Gestion de l'ajout et du reset
    formAjout.addEventListener('submit', (e) => {
        e.preventDefault();
        const nouveauVerbe = {
            infinitif: verbeInfinitifInput.value.trim(),
            je: conjugaisonsInputs.je.value.trim(),
            tu: conjugaisonsInputs.tu.value.trim(),
            il: conjugaisonsInputs.il.value.trim(),
            nous: conjugaisonsInputs.nous.value.trim(),
            vous: conjugaisonsInputs.vous.value.trim(),
            ils: conjugaisonsInputs.ils.value.trim()
        };

        if (nouveauVerbe.infinitif) {
            verbes.push(nouveauVerbe);
            sauvegarderVerbes();
            afficherVerbes();
            formAjout.reset();
        }
    });

    boutonReset.addEventListener('click', () => {
        if (confirm("Êtes-vous sûr de vouloir réinitialiser la liste de verbes ?")) {
            localStorage.removeItem('conjugaisonVerbes');
            verbes = [];
            afficherVerbes();
        }
    });

    function supprimerVerbe(index) {
        if (confirm(`Voulez-vous vraiment supprimer le verbe "${verbes[index].infinitif}" ?`)) {
            verbes.splice(index, 1);
            sauvegarderVerbes();
            afficherVerbes();
        }
    }

    // Logique des exercices
    boutonDemarrer.addEventListener('click', () => {
        if (verbes.length === 0) {
            alert("Veuillez ajouter des verbes pour démarrer un exercice.");
            return;
        }
        
        zoneConfiguration.style.display = 'none';
        zoneExerciceContenu.style.display = 'block';
        messageFeedback.textContent = '';
        boutonSuivant.style.display = 'none';
        
        commencerExerciceAleatoire();
    });

    function commencerExerciceAleatoire() {
        const indexVerbe = Math.floor(Math.random() * verbes.length);
        verbeCourant = verbes[indexVerbe];
        
        const typeExo = Math.random() < 0.5 ? 'complet' : 'unique';
        typeExerciceCourant = typeExo;

        if (typeExo === 'complet') {
            preparerExerciceComplet();
        } else {
            preparerExerciceUnique();
        }
    }

    function preparerExerciceComplet() {
        exerciceMultipleDiv.style.display = 'block';
        exerciceUniqueDiv.style.display = 'none';
        consigneExercice.textContent = `Conjugue le verbe "${verbeCourant.infinitif}" au présent.`;
        
        pronoms.forEach(p => {
            conjugaisonsExerciceInputs[p].value = '';
            conjugaisonsExerciceInputs[p].disabled = false;
        });
    }

    function preparerExerciceUnique() {
        exerciceMultipleDiv.style.display = 'none';
        exerciceUniqueDiv.style.display = 'block';
        
        const indexPronom = Math.floor(Math.random() * pronoms.length);
        pronomCourant = pronoms[indexPronom];
        
        consigneExercice.textContent = `Conjugue le verbe "${verbeCourant.infinitif}" au présent avec le pronom "${pronomCourant}".`;
        inputUnique.value = '';
    }

    boutonSoumettreComplet.addEventListener('click', () => {
        let toutEstCorrect = true;
        const reponsesUtilisateur = {};
        
        pronoms.forEach(p => {
            reponsesUtilisateur[p] = conjugaisonsExerciceInputs[p].value.trim().toLowerCase();
        });

        pronoms.forEach(p => {
            const bonneReponse = verbeCourant[p].toLowerCase();
            const estCorrect = reponsesUtilisateur[p] === bonneReponse;
            
            if (!estCorrect) {
                toutEstCorrect = false;
                conjugaisonsExerciceInputs[p].value = bonneReponse;
                conjugaisonsExerciceInputs[p].style.backgroundColor = '#f8d7da'; // Couleur d'erreur
            } else {
                conjugaisonsExerciceInputs[p].style.backgroundColor = '#d4edda'; // Couleur de succès
            }
            conjugaisonsExerciceInputs[p].disabled = true;
        });

        if (toutEstCorrect) {
            messageFeedback.textContent = "Correct !";
            messageFeedback.style.color = "green";
        } else {
            messageFeedback.textContent = `Incorrect. Voici la bonne conjugaison.`;
            messageFeedback.style.color = "red";
        }
        boutonSuivant.style.display = 'block';
    });

    boutonSoumettreUnique.addEventListener('click', () => {
        const reponseUtilisateur = inputUnique.value.trim().toLowerCase();
        const bonneReponse = verbeCourant[pronomCourant].toLowerCase();
        
        if (reponseUtilisateur === bonneReponse) {
            messageFeedback.textContent = "Correct !";
            messageFeedback.style.color = "green";
        } else {
            messageFeedback.textContent = `Incorrect. La bonne conjugaison est "${verbeCourant[pronomCourant]}".`;
            messageFeedback.style.color = "red";
        }
        boutonSuivant.style.display = 'block';
        inputUnique.disabled = true;
    });

    boutonSuivant.addEventListener('click', () => {
        commencerExerciceAleatoire();
    });
    
    chargerVerbes();
});
