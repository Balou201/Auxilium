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
    const selectVerbe = document.getElementById('select-verbe');
    const selectPronom = document.getElementById('select-pronom');
    const boutonDemarrer = document.getElementById('bouton-demarrer');
    const zoneConfiguration = document.getElementById('zone-configuration');
    const zoneExerciceContenu = document.getElementById('zone-exercice-contenu');
    const consigneExercice = document.getElementById('consigne-exercice');
    const inputReponse = document.getElementById('input-reponse');
    const boutonSoumettre = document.getElementById('bouton-soumettre');
    const messageFeedback = document.getElementById('message-feedback');
    const boutonSuivant = document.getElementById('bouton-suivant');

    // Variables pour l'exercice
    let verbeCourant;
    let pronomCourant;

    // Fonctions de chargement/sauvegarde
    function chargerVerbes() {
        const verbesSauvegardes = localStorage.getItem('conjugaisonVerbes');
        if (verbesSauvegardes) {
            verbes = JSON.parse(verbesSauvegardes);
            afficherVerbes();
            peuplerSelecteurs();
        }
    }

    function sauvegarderVerbes() {
        localStorage.setItem('conjugaisonVerbes', JSON.stringify(verbes));
    }

    // Fonctions d'affichage
    function afficherVerbes() {
        listeUl.innerHTML = '';
        verbes.forEach((verbe) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${verbe.infinitif}</strong>: <br>
                Je: ${verbe.je}, Tu: ${verbe.tu}, Il: ${verbe.il}, Nous: ${verbe.nous}, Vous: ${verbe.vous}, Ils: ${verbe.ils}`;
            listeUl.appendChild(li);
        });
    }

    function peuplerSelecteurs() {
        selectVerbe.innerHTML = '<option value="">Choisir un verbe...</option>';
        selectPronom.innerHTML = '<option value="">Choisir un pronom...</option>';
        
        verbes.forEach(verbe => {
            const option = document.createElement('option');
            option.value = verbe.infinitif;
            option.textContent = verbe.infinitif;
            selectVerbe.appendChild(option);
        });

        pronoms.forEach(pronom => {
            const option = document.createElement('option');
            option.value = pronom;
            option.textContent = pronom;
            selectPronom.appendChild(option);
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
        peuplerSelecteurs();
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
            peuplerSelecteurs();
        }
    });

    // Logique des exercices
    boutonDemarrer.addEventListener('click', () => {
        const verbeInfinitif = selectVerbe.value;
        const pronom = selectPronom.value;

        if (verbeInfinitif && pronom) {
            commencerExercice(verbeInfinitif, pronom);
        } else {
            alert('Veuillez choisir un verbe et un pronom pour l\'exercice.');
        }
    });

    function commencerExercice(verbeInfinitif, pronom) {
        verbeCourant = verbes.find(v => v.infinitif === verbeInfinitif);
        pronomCourant = pronom;

        if (!verbeCourant) {
            alert("Verbe non trouvé.");
            return;
        }

        zoneConfiguration.style.display = 'none';
        zoneExerciceContenu.style.display = 'block';
        messageFeedback.textContent = '';
        boutonSuivant.style.display = 'none';
        
        consigneExercice.textContent = `Conjugue le verbe "${verbeCourant.infinitif}" au présent avec le pronom "${pronom}"`;
        inputReponse.value = '';
    }

    boutonSoumettre.addEventListener('click', () => {
        const reponseUtilisateur = inputReponse.value.trim();
        const bonneReponse = verbeCourant[pronomCourant];
        
        if (reponseUtilisateur.toLowerCase() === bonneReponse.toLowerCase()) {
            messageFeedback.textContent = "Bonne réponse ! 🎉";
            messageFeedback.style.color = "green";
        } else {
            messageFeedback.textContent = `Mauvaise réponse. La bonne conjugaison est "${bonneReponse}".`;
            messageFeedback.style.color = "red";
        }
        boutonSuivant.style.display = 'block';
    });

    boutonSuivant.addEventListener('click', () => {
        // Redémarrer l'exercice avec un verbe/pronom aléatoire ou retourner à la configuration
        alert("Exercice terminé ! On va recommencer.");
        zoneConfiguration.style.display = 'block';
        zoneExerciceContenu.style.display = 'none';
    });
    
    chargerVerbes();
});
