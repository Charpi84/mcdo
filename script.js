let donnes = [];
let detailCategorieGrid = document.getElementById('detailCategorieGrid');

fetch('mcdo.json')
    .then(function(reponse){
        if (!reponse.ok) {
            throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");
        }
        console.log("Fichier json chargé");
        return reponse.json();
    })

    .then(function(data){
        donnes = data;
        console.log(donnes);
        openCategorie();
    })

    .catch(function(error) {
        console.error("Erreur lors du chargement du fichier JSON: ", error);
    });

   

    function openCategorie(categorie) {
                
        let produits = donnes[categorie];

        detailCategorieGrid.innerHTML = "";

        for (let i = 0; i < produits.length; i++) {
            let produit = produits[i];

            let card = document.createElement("div");
            card.classList.add("card");
            let contenuCard = `<button class="detail-btn" onclick="ajouterPanier()">
							        <img src="${produit.image}" alt="${produit.name}">
							        <h3>${produit.name}</h3>
							        <p class="prix">${produit.price}€</p>
						        </button>
						        <button class="info-btn" onclick="afficherInformation()">
                                    i
                                </button>`
            card.innerHTML = contenuCard;
            detailCategorieGrid.appendChild(card);
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