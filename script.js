let donnees = [];
let detailCategorieGrid = document.getElementById('detailCategorieGrid');
let containerProduit = document.getElementById('containerProduit');
let commande = [];
let containerCommande = document.getElementById('containerCommande');


fetch('mcdo.json')
    .then(function (reponse) {
        if (!reponse.ok) {
            throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");
        }
        console.log("Fichier json chargé");
        return reponse.json();
    })

    .then(function (data) {
        donnees = data;
        homePage();
    })

    .catch(function (error) {
        console.error("Erreur lors du chargement du fichier JSON: ", error);
    });

function homePage() {
    afficherPage("accueilBorne");
    let accueil = document.getElementById("accueilBorne");

    let contenu = `<div class="start-order" onclick="openChoixService()">
			<div class="titre">
				<h1>McDonald's</h1>
			</div>
			<div class="fullscreen-home">
				<img src="assets/images/backgroung-mcdo.avif" alt="Image de fond McDonald's">
			</div>
			<div class="bottom-msg">
				<p><span class="mcdo">M</span>Appuyez sur l'écran<span class="mcdo">M</span></p>
			</div>
		</div>`;

    accueil.innerHTML = contenu;
}

function openChoixService() {
    afficherPage("choixService");

    let choixService = document.getElementById("choixService");
    let contenu = `<main>
			<section class="service">

				<!--Info gerer en js c'est a dire ajout de deux cards pour la commande (sur place ou emporter)-->
				<div class="cards">
					<div class="card-ch" onclick="afficherCategories()">
						<div class="card-choice">
							<img src="assets/images/icons/emporter.png" alt="a emporter">
							<h2>à emporter</h2>
						</div>
					</div>

					<div class="card-ch" onclick="afficherCategories()">
						<div class="card-choice">
							<img src="assets/images/icons/service.png" alt="sur place">
							<h2>Sur Place</h2>
						</div>
					</div>
				</div>
				<div class="cards-lang">
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/fr.png">
						<p>Français</p>
					</div>
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/gb.png">
						<p>English</p>
					</div>
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/de.png">
						<p>Deutsch</p>
					</div>
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/es.png">
						<p>Español</p>
					</div>
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/it.png">
						<p>Italiano</p>
					</div>
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/pl.png">
						<p>Polski</p>
					</div>
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/jp.png">
						<p>日本人</p>
					</div>
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/lu.png">
						<p>Nederlands</p>
					</div>
					<div class="langage">
						<img srcset="https://flagcdn.com/w40/cn.png">
						<p>中文</p>
					</div>
				</div>
			</section>
		</main>
	</div>`;

    choixService.innerHTML = contenu;
}

function afficherCategories() {
    afficherHeaderFooter("catégories", false)
    afficherPage("categories");


    let container = document.getElementById("containerCats");
    container.innerHTML = "";

    for (let categorie in donnees) {

        let produits = donnees[categorie];

        // Utilise l'image du premier produit comme image représentative
        let imgHTML = "";
        if (produits && produits.length > 0 && produits[0].image) {
            imgHTML = `<img src="${produits[0].image}" alt="${categorie}">`;
        }

        let cardHTML = `<div class="card" onclick="openCategorie('${categorie}')">
                            ${imgHTML}
                            <h3>${categorie}</h3>
                        </div>`;
        container.innerHTML += cardHTML;

        afficherPanier();
    }
}

function openCategorie(categorie) {
    afficherHeaderFooter("Nos produits", true);
    afficherPage("detailCategorie");

    let container = document.getElementById("containerCat");
    container.innerHTML = "";

    let produits = donnees[categorie];

    for (let i = 0; i < produits.length; i++) {
        let p = produits[i];
        let cardHTML = `<div class="card" onclick="ajouterPanier(${p.id})">
                            <img src="${p.image}" alt="${p.name}">
                            <h3>${p.name}</h3>
                            <p class="prix">${p.price}€</p>
                            <button class="info-btn" onclick="detailProduit(${p.id})">i</button>
                        </div>`;
        container.innerHTML += cardHTML;

        afficherPanier();
    }
}

function detailProduit(id) {
    afficherHeaderFooter("Détails", false);
    afficherPage("detailProduit");

    let infoProduit = document.getElementById("modalInfo");

    for (let categorie in donnees) {
        let produits = donnees[categorie];

        for (let i = 0; i < produits.length; i++) {
            let p = produits[i];

            if (p.id === id) {

                let contenu = `<div class="modal-product">
                                        <div class="fermer">
                                            <button class="close-btn" onclick="afficherCategories()">Fermer</button>
                                        </div>
                                        <img src="${p.image}" alt="${p.name}">
                                        <div class="encart-card">
                                            <h3>${p.name}</h3>
                                            <p>${p.description}</p>
                                            <p>${p.calories} calories</p>
                                        </div>
                                        <div class="cde-produit">
                                            <button class="cde-btn" onclick="ajouterPanier(${p.id})">ajouter</button>
                                        </div>
                                    </div>`;

                infoProduit.innerHTML = contenu;
                return;
            }
        }
    }
}

function afficherPage(id) {

    let pages = document.querySelectorAll(".pages");

    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.add("d-none");
    }

    let currentPage = document.getElementById(id);

    if (currentPage) {
        currentPage.classList.remove("d-none");
    }
}

function afficherHeaderFooter(titre, boutonRetour) {

    let header = document.getElementById("header");
    let footer = document.getElementById("footer");

    let contenuHeader = "";
    if (boutonRetour) {
        contenuHeader += '<button onclick="afficherCategories()">⬅ Retour</button>';
    }
    contenuHeader += `<h2>${titre}</h2>`;

    header.innerHTML = contenuHeader;
    header.classList.remove("d-none");

    let contenuFooter = `<div class="panier-info">
			                <h2>Ma Commande:</h2>
		                </div>
		                <div id="afficherPanier" class="afficher-panier">
			                <div id="containerCommande" class="container-cmd"></div> <!--j'essaie de la faire apparaitre-->
	                    </div>
                        <div class="total">
                            <button onclick="validerPanier()">Valider et Payer</button>
                            <p id="containerPrix"></p>
                        </div>`;

    footer.innerHTML = contenuFooter;
    footer.classList.remove("d-none");
}

function cacherHeaderFooter() {
    document.getElementById("header").classList.add("d-none");
    document.getElementById("footer").classList.add("d-none");
}

function ajouterPanier(id) {

    //Pour cette fonction on parcourt le json pour trouvé le produit avec le bon id
    for (let categorie in donnees) { // on utilise for variable in car on veut boucler sur chaque propriété du tableau données.
        //dans ce cas, variable est categorie qui correspond  dans le json a burgers, sides, desserts
        //Cette boucle permet d'éviter de faire une boucle différente pour chaque categorie. A chque tour categorie change de valeur
        // et donc produits aussi
        //au 1er tour la boucle va dire que produits correspond à burgers.
        //dans cette itération, on lance une boucle for sur tous les objets de burgers et donc chaque objet devient la variable produit (ex Big Mac...)
        //dans cette boucle qui tourne dans la categorie, on cherche le id qui est lié à la fonction onclick crée
        //pour chaque produit dans la fonction openCategorie 
        //à la 2eme itération, produits va correspondre à sides et la boucle for parcourrera les objets frites moyennes etc
        let produits = donnees[categorie];

        for (let i = 0; i < produits.length; i++) {
            let produit = produits[i]; //cette variable correspond à mon produit qui se trouve dans le json

            if (produit.id === id) {
                //Pour eviter les doublons il faut vérifier si l'id est déjà présent dans le tableau commande.
                // Il faut donc refaire un if en intégrant une variable qui sera le produit contenu 
                // dans le tableau commande
                let produitCommande = null; // produitCommande sera le produit du tableau commande 
                // sur lequel on modifiera la quantité s'il est déjà existant dans le tableau commande
                for (let j = 0; j < commande.length; j++) {
                    if (commande[j].id === id) {
                        produitCommande = commande[j];
                        break;
                    }
                }

                if (produitCommande) { // cette partie indique que la boucle a trouvé un produit dans la tableau commande 
                    // avec le même id du produit qu'on veut rajouter
                    produitCommande.quantite++;
                } else {
                    // si il n'y a pas d'id du produit json dans la commande, cette fonction prend l'objet du json
                    // et l'ajoute dans le tableau commande.
                    produit.quantite = 1; // cette partie permet d'ajouter une propriété quantité à mon objet dans le tableau commande
                    commande.push(produit);
                    console.log("panier: " + produit.quantite + produit.name);
                }
                afficherPanier();
                calculerTotalPanier();
                return;
            }
        }
    }
}

function baisseQuantite(id) {
    for (let i = 0; i < commande.length; i++) {
      if (commande[i].id === id) {
        if (commande[i].quantite > 1) {
          commande[i].quantite--;
        } else {
          let alerteMessage = document.createElement('div');
          alerteMessage.className = "alerte";
  
          let contenuAlerteMessage =   `<div class="alerte-modal">
                                            <div class="alerte-popup">
                                            <p>Voulez-vous supprimer ce produit ?</p>
                                            <div class="alerte-actions">
                                            <button onclick="suppression(${id})">Oui</button>
                                            <button onclick="closeMessage()">Non</button>
                                            </div>
                                            </div>
                                        </div>`;
  
          alerteMessage.innerHTML = contenuAlerteMessage;
          document.body.appendChild(alerteMessage);
        }
  
        afficherPanier();
        calculerTotalPanier();
        return;
      }
    }
  }

  function closeMessage() {
        // Supprimer le message d'alerte de la commande
        let alerte = document.querySelector('.alerte');
        if (alerte) {
            alerte.remove();
        }
    }
  
  function suppression(id) {
    for (let i = 0; i < commande.length; i++) {
      if (commande[i].id === id) {
        commande.splice(i, 1);
        break;
      }
    }
  
    closeMessage();
    afficherPanier();
    calculerTotalPanier();
  }
  
function afficherPanier() {
    console.log("Le panier s'affiche");
    
    let commandeProduit = document.getElementById("containerCommande");
    commandeProduit.innerHTML = "";
    for (let i = 0; i < commande.length; i++) {
        let produit = commande[i];
        let panier =   `<div class="item">
                            <div class="moins" onclick="baisseQuantite(${produit.id})"><p>-</p></div>            
                            <div class="item-panier">
                                <p> ${produit.name}</p>
                            </div>
                            <div class="item-quantite">
                                <p>x ${produit.quantite}</p>                           
                            </div>
                            <div class="plus" onclick="ajouterPanier(${produit.id})"><p>+</p></div>
                        </div>`;
        commandeProduit.innerHTML += panier;
    }
}

function calculerTotalPanier() {
    let total = 0;
    let containerPrix = document.getElementById("containerPrix");
    for (let i = 0; i < commande.length; i++) {
      let produit = commande[i];
      total += produit.price * produit.quantite;
    }
    containerPrix.innerHTML = total + "€";
    return total.toFixed(2);
  }

/*function openCategorie(burgers) {
   //let burgers = data.burgers

   for (let i = 0; i < burgers.length; i++) {
       let card = document.createElement("div");
       card.classList.add("card");
       let contenuCard = `<button class="detail-btn" onclick="ajouterPanier()">
                               <img src="${burgers[i].image}" alt="${burgers[i].name}">
                               <h3>${burgers[i].name}</h3>
                               <p class="prix">${burgers[i].price}€</p>
                           </button>
                           <button class="info-btn" onclick="afficherInformation()">
                               i
                           </button>`
       card.innerHTML = contenuCard;
       detailCategorieGrid.appendChild(card);
   }
}*/

/*function afficherInformation(id) {


    for (let categorie in donnees) { // on utilise for variable in car on veut boucler sur chaque propriété du tableau données.
        //dans ce cas, variable est categorie qui correspond  dans le json a burgers, sides, desserts
        //Cette boucle permet d'éviter de faire une boucle différente pour chaque categorie. A chque tour categorie change de valeur
        // et donc produits aussi
        //au 1er tour la boucle va dire que produits correspond à burgers.
        //dans cette itération, on lance une boucle for sur tous les objets de burgers et donc chaque objet devient la variable produit (ex Big Mac...)
        //dans cette boucle qui tourne dans la categorie, on cherche le id qui est lié à la fonction onclick crée
        //pour chaque produit dans la fonction openCategorie 
        //à la 2eme itération, produits va correspondre à sides et la boucle for parcourrera les objets frites moyennes etc
        let produits = donnees[categorie];
        console.log(produits)

        for (let i = 0; i < produits.length; i++) {
            let produit = produits[i];

            if (produit.id === id) {

                containerProduit.innerHTML = ""; //Cette partie permet de vider le container produit pour n'afficher 
                // que le produit sur lequel on a cliqué

                let cardProduit = document.createElement("div");
                cardProduit.classList.add("produit");
                let contenuCardProduit = `<div class="modal-product">
                                                <div class="fermer">
                                                    <button class="close-btn" onclick="close()">Fermer</button>
                                                </div>
                                                <img src="${produit.image}" alt="${produit.name}">
                                                <div class="encart-card">
                                                    <h3>${produit.name}</h3>
                                                    <p>${produit.description}</p>
                                                    <p>${produit.calories} calories</p>
                                                </div>
                                                <div class="cde-produit">
                                                    <button class="cde-btn" onclick="ajouterPanier(${produit.id})">commander</button>
                                                </div>
                                            </div>`

                cardProduit.innerHTML = contenuCardProduit;
                containerProduit.appendChild(cardProduit);
                break;// on n'oublie le break pour arreté la boucle quand à trouvé le bon id pour afficher le bon produit
            }
        }
        console.log("Produits finaux :", produits);
    }
    let produits = donnees[categorie]; //sans cette ligne, la console indique que produits n'est pas défini 
    // et donc la card produit ne s'affiche pas.

    containerProduit.innerHTML = "";


}*/

/*function openCategorie(categorie) {

    let produits = donnees[categorie];

    detailCategorieGrid.innerHTML = "";

    for (let i = 0; i < produits.length; i++) {
        let produit = produits[i];

        let card = document.createElement("div");
        let contenuCard = `<div class="card" onclick="ajouterPanier(${produit.id})">
                                    <img src="${produit.image}" alt="${produit.name}">
                                    <h3>${produit.name}</h3>
                                    <p class="prix">${produit.price}€</p>
                                    <button class="info-btn" onclick="afficherInformation(${produit.id})">i</button>
                                </div>`
        card.innerHTML = contenuCard;
        detailCategorieGrid.appendChild(card);
    }
}*/