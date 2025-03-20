let donnes = [];

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
    })

    .catch(function(error) {
        console.error("Erreur lors du chargement du fichier JSON: ", error);
    });