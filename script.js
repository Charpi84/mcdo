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
        console.log(donnees);
        openCategorie();
    })

    .catch(function (error) {
        console.error("Erreur lors du chargement du fichier JSON: ", error);
    });



function openCategorie(categorie) {

    let produits = donnees[categorie];

    detailCategorieGrid.innerHTML = "";

    for (let i = 0; i < produits.length; i++) {
        let produit = produits[i];

            let card = document.createElement("div");
            let contenuCard = `<div classe = "card" onclick="ajouterPanier(${produit.id})">
							        <img src="${produit.image}" alt="${produit.name}">
							        <h3>${produit.name}</h3>
							        <p class="prix">${produit.price}€</p>
                                    <button class="info-btn" onclick="afficherInformation(${produit.id})">
                                        i
                                    </button>
						        </div>`
            card.innerHTML = contenuCard;
            detailCategorieGrid.appendChild(card);
        }
    }

function afficherInformation(id) {


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
    
                if(produit.id === id) {

                    containerProduit.innerHTML = ""; //Cette partie permet de vider le container produit pour n'afficher 
                    // que le produit sur lequel on a cliqué
    
                    let cardProduit = document.createElement("div");
                    cardProduit.classList.add("produit");
                    let contenuCardProduit = `<div class="card">
                                                <button class="close-btn" onclick="close()">X</button>
                                                <img src="${produit.image}" alt="${produit.name}">
                                                <div class="encart-card">
                                                    <h3>${produit.name}</h3>
                                                    <p>${produit.description}</p>
                                                    <p>${produit.calories} calories</p>
                                                </div>
                                            </div>
                                            <div class="cde-produit">
                                                <button class="cde-btn" onclick="ajouterPanier(${produit.id})">ajouter à la commande</button>
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
            console.log(produits);

            for (let i = 0; i < produits.length; i++) {
                let produit = produits[i]; //cette variable correspond à mon produit qui se trouve dans le json
    
                if(produit.id === id) {
                    //Pour eviter les doublons il faut vérifier si l'id est déjà présent dans le tableau commande.
                    // Il faut donc refaire un if en intégrant une variable qui sera le produit contenu 
                    // dans le tableau commande
                    let produitCommande = ""; // produitCommande sera le produit du tableau commande 
                    // sur lequel on modifiera la quantité s'il est déjà existant dans le tableau commande
                        for(let j = 0; j < commande.length; j++) {
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

                }
            }
            
        }
        afficherPanier();
        
    }

    function afficherPanier() {
        console.log("Le panier s'affiche");
        containerCommande.innerHTML = ""; //Cela permet de vider l'affichage du panier

        for (let i = 0; i < commande.length; i++) {
            let produit = commande[i];
            let commandeProduit = document.createElement("div");
            let contenuCardProduit =    `<p>${produit.quantite}</p>
                                        <p> X </p>
                                        <p>${produit.name}</p>`
            commandeProduit.innerHTML = contenuCardProduit;
            containerCommande.appendChild(commandeProduit);
        }
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