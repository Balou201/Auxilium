/* Import de la police Google Fonts pour un style plus moderne */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

:root {
    --primary-color: #4CAF50; /* Vert */
    --secondary-color: #FFC107; /* Jaune */
    --background-color: #e0f7fa; /* Bleu clair */
    --card-background: #ffffff; /* Blanc */
    --text-color: #333333;
    --shadow-light: rgba(0, 0, 0, 0.1);
    --shadow-heavy: rgba(0, 0, 0, 0.2);
    --correct-color: #4CAF50; /* Vert pour la bonne réponse */
    --incorrect-color: #F44336; /* Rouge pour la mauvaise réponse */
}

body {
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background: linear-gradient(135deg, var(--background-color), #b2ebf2);
    color: var(--text-color);
}

.container {
    text-align: center;
    background-color: var(--card-background);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px var(--shadow-light);
    max-width: 600px;
    width: 90%;
    transition: transform 0.3s ease-in-out;
}

.container:hover {
    transform: translateY(-5px);
}

h1 {
    font-size: 2.5em;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--primary-color);
    text-shadow: 1px 1px 2px var(--shadow-light);
}

.question {
    font-size: 3em;
    font-weight: 600;
    margin-bottom: 30px;
    color: var(--text-color);
    letter-spacing: 2px;
}

#reponse {
    padding: 12px 20px;
    width: 250px;
    font-size: 1.5em;
    border-radius: 10px;
    border: 2px solid #ddd;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px var(--shadow-light);
}

#reponse:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
}

button {
    padding: 12px 30px;
    font-size: 1.2em;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    text-transform: uppercase;
    margin-top: 20px;
}

button:active {
    transform: translateY(2px);
}

#valider {
    background-color: var(--primary-color);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
}

#valider:hover {
    background-color: #43a047;
}

#nouvelle-question {
    background-color: var(--secondary-color);
    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
}

#nouvelle-question:hover {
    background-color: #ffb300;
}

.resultat {
    margin-top: 25px;
    font-size: 1.7em;
    font-weight: bold;
    min-height: 50px; /* Assure que l'espace est réservé */
}

.resultat.correct {
    color: var(--correct-color);
}

.resultat.incorrect {
    color: var(--incorrect-color);
}

.technique-aide {
    margin-top: 15px;
    font-style: italic;
    font-size: 1em;
    color: #666;
    animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
