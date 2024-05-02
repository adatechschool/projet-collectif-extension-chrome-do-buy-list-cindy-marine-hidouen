let element = ["Objet", "Prix", "Option"];

// se lance au chargement de l'extension (ouverture du navigateur)
document.addEventListener('DOMContentLoaded', function() {
    let addItemButton = document.getElementById('addTargetButton');
    let newItemInput = document.getElementById('newTargetInput');
    let newItemPriceInput = document.getElementById('newPriceInput');
    let shoppingList = document.getElementById('shoppingList');
    
    // Récupérer les tâches existantes depuis LocalStorage lors du chargement de la page
    let savedItems = JSON.parse(localStorage.getItem('items')) || [];
    
    // Afficher les tâches existantes dans la liste
    // savedItems.forEach(function(itemText) {
    //     let item = document.createElement('li');
    //     item.textContent = itemText;
    //     shoppingList.appendChild(item);
    // });
    
    let add = document.getElementById('add');
    add.addEventListener('click', function() {
        let champs = document.getElementById('champs');
        if (champs.style.display === 'none') {
            champs.style.display = 'block';
        } else {
            champs.style.display = 'none';
        }
       

    });
    // se lance au click sur le "V"
    addItemButton.addEventListener('click', function() {
        let itemText = newItemInput.value.trim();
        let itemPrice = newItemPriceInput.value.trim();
        
        if (itemText !== '' || itemPrice !== '') {
            // Créer un nouvel élément de liste
            let newTaskItem = document.createElement('li');
            newTaskItem.textContent = itemText;
            newTaskItem.textContent = itemPrice;
            // Ajouter l'élément à la liste
            shoppingList.appendChild(newTaskItem);
            // Effacer le champ de texte
            newItemInput.value = '' 
            newItemPriceInput.value = '';
            
            // Ajouter le nouvel element a la liste d'achats enregistrés dans LocalStorage
            savedItems.push(itemText, itemPrice);
            localStorage.setItem('items', JSON.stringify(savedItems
            ));
        }
    });
});


