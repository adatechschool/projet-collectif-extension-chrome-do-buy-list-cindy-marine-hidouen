// se lance au chargement de l'extension (ouverture du navigateur)
document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.getElementById('addButton');
    let validItemButton = document.getElementById('validButton');
    let itemNameInput = document.getElementById('newNameInput');
    let itemPriceInput = document.getElementById('newPriceInput');
    let shoppingList = document.getElementById('shoppingList');
    
    // Récupérer la précédente shoppingList (s'il y a) depuis LocalStorage lors du chargement de l'extension
    let saved = JSON.parse(localStorage.getItem('localStoredItems')) || []
    // Conversion en tableau
    let savedItems = Array.from(saved)
    
    // Afficher les éléments déjà enregistrés dans la liste
    for (let i = 0; i < savedItems.length; i++) {
        createBubble(savedItems[i], savedItems);
    }

    affichageTotal(savedItems)
    
    // Affichage des champs lors du clic sur le "➕"
    addButton.addEventListener('click', function() {
        let fields = document.getElementById('champs');
        if (fields.style.display === 'none') {
            fields.style.display = 'block';
        } else {
            fields.style.display = 'none';
        }
    });
    
    // se lance au click sur le "✅"
    validItemButton.addEventListener('click', function() {
        let newItem = {
            name: itemNameInput.value,
            price: itemPriceInput.value,
            url: ""
        };
        newItem.price = newItem.price.replace(/,/g, '.')
        if (!isNaN(newItem.price)) {
            newItem.price = parseFloat(newItem.price)
        }
        if (newItem.name !== '' && (!newItem.price || (newItem.price !== '' && newItem.price >= 0))) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                let activeTab = tabs[0];
                newItem.url = activeTab.url;
                createBubble(newItem, savedItems);
                savedItems.push(newItem);
                // Ajouter le nouvel element a la liste d'achats enregistrés dans LocalStorage
                localStorage.setItem('localStoredItems', JSON.stringify(savedItems));
                // Effacer le champ de texte
                itemNameInput.value = '';
                itemPriceInput.value = '';
                affichageTotal(savedItems)
            });
        }
    });
});


function createBubble(item, bob) {
    let newBubble = document.createElement('div');
    newBubble.className = "bulle";
    if(!item.price) {
        newBubble.innerHTML = '<p><a target="_blank" href="' + item.url + '">' + item.name + '</a><br></p><p><button class="deleteButton">🗑️</button></p>';
    } else {
        newBubble.innerHTML = '<p><a target="_blank" href="' + item.url + '">' + item.name + '</a><br>' + item.price + ' €</p><p><button class="deleteButton">🗑️</button></p>';
    }
    shoppingList.appendChild(newBubble);
    let deleteButton = newBubble.querySelector('.deleteButton')
    // Permet de supprimer la bulle et le stockage de l'élément associé au clic de chacune des 🗑️
    deleteButton.addEventListener('click', function () {
        shoppingList.removeChild(newBubble)
        bob.splice(bob.findIndex(savedItem => savedItem.name === item.name), 1)
        console.log(bob)
        localStorage.setItem('localStoredItems', JSON.stringify(bob))
        affichageTotal(bob)
    })
}

function totalCalculate (priceArray) {
    let total = 0

    for (let i = 0; i < priceArray.length; i++) {
        if (isNaN(priceArray[i].price)) {
            priceArray[i].price = 0
        }
        total += priceArray[i].price
    }
    return total
}

function affichageTotal (priceArray) {
    let total = totalCalculate(priceArray)
    document.getElementById('Total').innerHTML = total + ' €'
}
