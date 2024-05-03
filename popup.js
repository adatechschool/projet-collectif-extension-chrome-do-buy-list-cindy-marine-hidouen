// se lance au chargement de l'extension (ouverture du navigateur)
document.addEventListener('DOMContentLoaded', function() {
    let addItemButton = document.getElementById('addButton');
    let validItemButton = document.getElementById('validButton');
    let itemNameInput = document.getElementById('newNameInput');
    let itemPriceInput = document.getElementById('newPriceInput');
    let shoppingList = document.getElementById('shoppingList');
    
    // Récupérer les tâches existantes depuis LocalStorage lors du chargement de la page
    let savedItems = JSON.parse(localStorage.getItem('items')) || [];
    
    // Afficher les tâches existantes dans la liste
    // savedItems.forEach(function(itemName) {
    //     let item = document.createElement('li');
    //     item.textContent = itemName;
    //     shoppingList.appendChild(item);
    // });
    
    let addButton = document.getElementById('addButton');
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
        let itemName = itemNameInput.value.trim();
        let itemPrice = itemPriceInput.value.trim();
        if (itemName !== '' && itemPrice !== '') {
            // Créer un nouvel élément de liste
            let newItem = document.createElement('div');
            newItem.className = "bulle";
            newItem.innerHTML = '<p>' + itemName + '<br>' + itemPrice + ' €</p><p>🗑️</p>'
            // Ajouter l'élément à la liste
            shoppingList.appendChild(newItem);
            // Effacer le champ de texte
            itemNameInput.value = '' 
            itemPriceInput.value = '';
            
            // Ajouter le nouvel element a la liste d'achats enregistrés dans LocalStorage
            savedItems.push([itemName, itemPrice]);
            localStorage.setItem('items', JSON.stringify(savedItems
            ));
        }
    });
});


