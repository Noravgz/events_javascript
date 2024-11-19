// fonctionnalité 1 affiche clique quand on appuie sur le footer de la page html
const footer = document.querySelector('footer');
// fonctionnalité 1 bis quand on clique sur le footer il va y avoir un compteur à chaque fois qu'on appuie sur le footer
let clickcount = 0; // initialise le compteur 
footer.addEventListener("click", () =>{
    clickcount++; // incrémente le compteur
    console.clear(); // efface la console pour que mon clique et mon compteur soit sur la même ligne
    console.log("clique"); // affiche clique dans la console 
    console.log(`clique numéro ${clickcount}`); // affiche clique avec un compteur à chaque fois qu'on clique sur le footer
});


// fonctionnalité 2 quand on clique sur le bouton l'élément html portant l'id navbarHeader perds sa class collapse. Et quand on re clique dessus on le réajoute
const button = document.querySelector('.navbar-toggler'); // Sélectionner le div avec la classe "box"
const navbarHeader = document.getElementById('navbarHeader'); // Bouton pour basculer la classe

button.addEventListener('click', () => {
    // Si "collapse" est appliqué, il sera retiré. Sinon, il sera ajouté.
    navbarHeader.classList.toggle('collapse');
});


// fonctionnalité 3 si on clique sur le bouton "Edit" de la première card le texte de la card va se mettre en rouge de manière irréversible (sauf si on recharge la page)
const buttonEdit = document.querySelector('.btn-outline-secondary'); // sélectionne le button edit de ma classe "btn-outline-secondary"
const cardtext = document.querySelector('.card-text'); // sélectionne la classe "card-text"

buttonEdit.addEventListener("click", changetext);

function changetext(){
    cardtext.style.color ='red'; //pointe mon cardtext et on lui ajoute une couleur rouge
}


// fonctionnalité 4 si on clique sur le bouton edit de la deuxième card le texte va se mettre en vert. Si on  re-clique dessus il redevient comme avant
const buttonEdit2 = document.querySelectorAll('.btn-outline-secondary')[1]; // sélectionne le button edit de ma classe "btn-outline-secondary"
const cardtext2 = document.querySelectorAll('.card-text')[1]; // sélectionne la classe "card-text"

// Ajouter un événement pour le bouton "Edit" de la deuxième carte
buttonEdit2.addEventListener("click", () => {
    toggleTextColor(cardtext2); // Appeler la fonction pour alterner la couleur du texte
});

function toggleTextColor(cardtext) {
    if (cardtext.style.color ==='green') { // si le texte est en vert on le remets en noir
        cardtext.style.color ='black'; // remets le texte en noir
    } else {
    // sinon on change la couleur du texte en vert
    cardtext.style.color ='green';
    }
}


// fonctionnalité 5 si on fait un double clique sur la navbar en haut, tout bootstrap disparait comme si on avait oublié de mettre le CDN qui la relie au fichier CSS.
// si on refais un double clique tout redevient à la normale

// Variable pour compter les clics
let clickcounter = 0;

// Fonction pour activer/désactiver le lien CDN
function toggleCDN() {
const link = document.querySelector('link[rel="stylesheet"]'); // Sélectionner le lien <link> avec rel="stylesheet"

clickcounter++; // Incrémenter le compteur de clics

if (clickcounter % 2 === 0) {
    // Si le nombre de clics est pair, réactiver le CDN
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    console.log('CDN réactivé');
  } else {
    // Si le nombre de clics est impair, désactiver le CDN
    link.href = ''; // Vider l'attribut href désactive le CDN
    console.log('CDN désactivé');
  }
}

// Ajouter l'écouteur d'événement sur la navbar
const navbar = document.querySelector('#navbarHeader');
navbarHeader.addEventListener('dblclick', toggleCDN);



// fonctionnalité 6 si on passe la souris sur le bouton "View" d'une card celle-ci va se réduire.
// le texte disparait, l'image n'apparaîtra qu'à 20% de sa taille d'origine et les boutons "Edit/View" restent visibles.
// si on repasse la souris, la card redevient normale
const buttonsView = document.querySelectorAll('.btn-success'); // sélectionne tout les boutons Edit de ma classe "btn-success"

for (let i = 0; i < buttonsView.length; i++) {
    const buttonView = buttonsView[i]; // Sélectionne un bouton "View" à chaque itération
    const card = buttonView.closest('.card'); // sélectionne la carte qui contient le bouton
    const cardImage = card.querySelector('.card-img-top'); // sélectionne la classe "card-img-top"
    const cardText = card.querySelector('.card-text');

    // Ajouter les événements pour réduire et restaurer la carte
    buttonView .addEventListener('mouseover', () => reduceCard(cardImage, cardText, card)); // mouseover = on passe la souris dessus sa réduit
    buttonView.addEventListener('mouseup', () => restoreCard(cardImage, cardText, card));  // mouseout = on passe la souris dessus sa redevient normale
}

function reduceCard(cardImage, cardText, card) {
    if (cardImage.style.transform === 'scale(0.2)') return; // Empêche une répétition

    cardImage.style.transform = 'scale(0.2)';
    cardImage.style.transition = 'transform 0.9s ease'; // Ajoute une transition fluide
    cardText.style.display = 'none';    // Masquer le texte

    // Les boutons restent visibles
    const buttons = card.querySelectorAll('.btn');
    buttons.forEach(button => button.style.visibility = 'visible');
}

function restoreCard(cardImage, cardText, card) {
    if (cardImage.style.transform === 'scale(1)') return; // Empêche une répétition

    // Restaurer la taille de l'image
    cardImage.style.transform = 'scale(1)';
    cardImage.style.transition = 'transform 0.9s ease';  // Transition fluide pour le retour
    cardText.style.display = 'block';   // Restaurer le texte

    
    // Les boutons restent visibles
    const buttons = card.querySelectorAll('.btn');
    buttons.forEach(button => button.style.visibility = 'visible');
}


// fonctionnalité 7 si on clique sur le bouton gris ==>, la dernière card (en bas à droite) va passer en premier (en haut à gauche)
function movecards () {
    let moveButton = document.querySelector('.btn-secondary.my-2');       // Le bouton avec la classe '.btn-secondary.my-2' est récupéré dans la variable moveButton.
    let cardContainer = document.querySelector('.album .container .row');   // Sélection des conteneur des cartes qui sont dans album, container et row
    
    // Ajout d'un événement "click" sur le bouton pour lancer la fonction lorsque l'utilisateur clique dessus.
    moveButton.addEventListener('click', () =>{
    // Récupère toutes les cartes dans le conteneur
    let cards = cardContainer.querySelectorAll('.col-md-4');

    // Prend la dernière carte
    let lastCard = cards[cards.length - 1];
    // Déplace la dernière carte en premier dans le conteneur
    cardContainer.insertBefore(lastCard, cardContainer.firstElementChild);
    });
};
// Appelle la fonction pour activer l'événement
movecards();


// fonctionnalité 8 si on clique sur le bouton bleu <== la première card passe en dernière 
function replacecards () {
    let moveButton = document.querySelector('.btn-primary.my-2');       // Le bouton avec la classe '.btn-secondary.my-2' est récupéré dans la variable moveButton.
    let cardContainer = document.querySelector('.album .container .row');   // Sélection des conteneur des cartes qui sont dans album, container et row
    
    // Ajout d'un événement "click" sur le bouton pour lancer la fonction lorsque l'utilisateur clique dessus.
    moveButton.addEventListener('click', (event) =>{
        event.preventDefault(); // Empêche le comportement par défaut du lien (la navigation)
    // Récupère toutes les cartes dans le conteneur
    let cards = cardContainer.querySelectorAll('.col-md-4');

    // Prend la première carte
    let firstCard = cards[0];
    // Déplace la première carte à la fin du conteneur
    cardContainer.appendChild(firstCard);
    });
};
// Appelle la fonction pour activer l'événement
replacecards();


//fonctionnalité 9 se déclenchera si le logo de la page (JS & Events) est sélectionné et qu'on appuie sur une touche spécifique du clavier

// Sélectionner l'élément contenant le logo
let logo = document.querySelector('.navbar-brand'); // Sélectionne l'élément contenant la classe navbar-brand
let body = document.querySelector('body'); // Sélectionne le <body> pour appliquer les classes

// Ajout du 'tabindex' au logo <strong> pour qu'il puisse recevoir les événements clavier

let strong = logo.querySelector('strong');
strong.setAttribute('tabindex', '0'); // Le rend focusable pour capter l'événement keypress

logo.addEventListener('keypress', function(event) {
    body.className = '';

    // quand on presse la touche "a" l'ensemble de la page va être condensé sur 4 colonnes Bootsrap à gauche de l'écran
    if (event.key === 'a') {
    body.classList.add('col-4', 'offset-md-0');
    }

    // quand on presse la touche "y", l'ensemble de la page va être condensé en 4 colonnes au milieu de l'écran
    if (event.key === 'y') {
    body.classList.add('col-4', 'offset-md-4');
    }

    // quand on presse la touche "p", l'ensemble de la page va être condensé en 4 colonnes Bootsrap à droite de l'écran
    if (event.key === 'p') {
    body.classList.add('col-4', 'offset-md-8');
    }

    // quand on presse la touche "b" tout redevient normal
    if (event.key === 'b') {
    body.classList.add('');
    }
});

