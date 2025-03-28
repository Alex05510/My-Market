let donnees = []; 

document.addEventListener("DOMContentLoaded", function () {
    let savedData = localStorage.getItem("produits"); 
    if (savedData) {
        donnees = JSON.parse(savedData); 
        afficherListe(); 
    } else {
        fetch('data.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                donnees = data;
                localStorage.setItem("produits", JSON.stringify(donnees)); 
                afficherListe();
            })
            .catch(function (error) {
                console.error("Erreur : le fichier JSON n'a pas été chargé.", error);
            });
    }
});
// Fonction pour afficher la modale voir produit
function voirProduit(reference) {
    let produit = "";

    for (let i = 0; i < donnees.length; i++) {
        if (donnees[i].reference === reference) {
            produit = donnees[i];
            break;
        }
    }
    if (produit) {
        document.getElementById("modal-titre").textContent = produit.libelle || "Produit";
        document.getElementById("modal-photo").src = produit.photo ? "assets/images/" + produit.photo : "assets/images/placeholder.jpg";
        document.getElementById("modal-description").textContent = produit.description || "Aucune description disponible.";
        document.getElementById("modal-reference").textContent = produit.reference || "Non spécifiée";
        document.getElementById("modal-categorie").textContent = produit.categorie || "Non spécifiée";
        document.getElementById("modal-prix").textContent = produit.prix ? produit.prix + " €" : "Prix non disponible";
        document.getElementById("modal-stock").textContent = produit.stock > 0 ? produit.stock + " en stock" : "Rupture de stock";

        document.getElementById("modal").style.display = "block";
    } else {
        alert("Produit introuvable !");
    }
}
function fermerModale() {
    document.getElementById("modal").style.display = "none";
}

// Fonction pour afficher la liste des produits dans le tableau HTML
function afficherListe() {
    let liste = document.getElementById('list-produit');
    liste.innerHTML = ""; // Vider le tableau avant de le remplir

    for (let i = 0; i < donnees.length; i++) {
        let produit = donnees[i];
        let produitRow = document.createElement('tr');
        produitRow.classList.add('produit-row');

        let contenu = "";
        contenu += "<td class='produit'>" + (produit.reference || "Aucune référence") + "</td>";
        contenu += "<td class='produit'>" + (produit.categorie || "Aucune catégorie") + "</td>";
        contenu += "<td class='produit'>" + (produit.libelle || "Aucun libellé") + "</td>";
        contenu += "<td class='produit'>" + (produit.prix ? produit.prix + " €" : "Prix non disponible") + "</td>";
        contenu += "<td class='produit'>" + (produit.stock > 0 ? "<span>🟢</span> En stock" : "<span>🔴</span> Rupture") + "</td>";
        contenu += "<td class='produit actions'>";
        contenu += "<button onclick='voirProduit(\"" + produit.reference + "\")'><img src='assets/icons/icons/eye.png' alt='Voir' width='16' height='16'></button>";
        contenu += "<button onclick='ouvrirModalModifier(\"" + produit.reference + "\")'><img src='assets/icons/icons/edit.png' alt='Modifier' width='16' height='16'></button>";
        contenu += "<button onclick='supprimerProduit(\"" + produit.reference + "\")'><img src='assets/icons/icons/trash.png' alt='Supprimer' width='16' height='16'></button>";
        contenu += "</td>";

        produitRow.innerHTML = contenu;
        liste.appendChild(produitRow);
    }
    
}

// Fonction pour ajouter un produit
function ajouterProduit() {
    let reference = document.getElementById("create-reference").value.trim();
    let categorie = document.getElementById("create-categorie").value.trim();
    let libelle = document.getElementById("create-libelle").value.trim();
    let prix = parseFloat(document.getElementById("create-prix").value.trim());
    let stock = document.getElementById("create-stock").checked ? 1 : 0;
    let description = document.getElementById("create-description").value.trim();

    let produit = {
        reference: reference,
        categorie: categorie,
        libelle: libelle,
        prix: prix,
        stock: stock,
        description: description
    };

    donnees.unshift(produit); // Ajouter le produit en haut de la liste
    localStorage.setItem("produits", JSON.stringify(donnees)); // Mettre à jour les données dans localStorage
    afficherListe(); // Réafficher la liste mise à jour
    document.getElementById("form-creer").reset(); // Réinitialiser le formulaire
    fermerModalCreer(); // Fermer la modale
}

// Fonction pour supprimer un produit
function supprimerProduit(reference) {
    donnees = donnees.filter(function (produit) {
        return produit.reference !== reference;
    });

    localStorage.setItem("produits", JSON.stringify(donnees)); // Mettre à jour les données dans localStorage
    afficherListe(); // Mettre à jour la liste affichée
}

// Fonction pour modifier un produit
function enregistrerModifications() {
    let reference = document.getElementById("edit-reference").value.trim();
    let categorie = document.getElementById("edit-categorie").value.trim();
    let libelle = document.getElementById("edit-libelle").value.trim();
    let prix = parseFloat(document.getElementById("edit-prix").value.trim());
    let stock = document.getElementById("edit-stock").checked ? 1 : 0;
    let description = document.getElementById("edit-description").value.trim();

    for (let i = 0; i < donnees.length; i++) {
        if (donnees[i].reference === reference) {
            donnees[i].categorie = categorie;
            donnees[i].libelle = libelle;
            donnees[i].prix = prix;
            donnees[i].stock = stock;
            donnees[i].description = description;
            break;
        }
    }

    localStorage.setItem("produits", JSON.stringify(donnees)); // Mettre à jour les données dans localStorage
    afficherListe(); // Réafficher la liste mise à jour
    fermerModalModifier(); // Fermer la modale
}

// Ouvrir/fermer les modales
function ouvrirModalCreer() {
    document.getElementById("modal-creer").style.display = "block";
}

function fermerModalCreer() {
    document.getElementById("modal-creer").style.display = "none";
}

function ouvrirModalModifier(reference) {
    let produit = null;

    for (let i = 0; i < donnees.length; i++) {
        if (donnees[i].reference === reference) {
            produit = donnees[i];
            break;
        }
    }

    if (produit) {
        document.getElementById("edit-reference").value = produit.reference;
        document.getElementById("edit-categorie").value = produit.categorie;
        document.getElementById("edit-libelle").value = produit.libelle;
        document.getElementById("edit-prix").value = produit.prix;
        document.getElementById("edit-stock").checked = produit.stock > 0;
        document.getElementById("edit-description").value = produit.description;
        document.getElementById("modal-modifier").style.display = "block";
    } else {
        alert("Produit introuvable !");
    }
}

function fermerModalModifier() {
    document.getElementById("modal-modifier").style.display = "none";
}
