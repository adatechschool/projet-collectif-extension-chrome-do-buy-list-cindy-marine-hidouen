// se lance au chargement de l'extension (ouverture du navigateur)
document.addEventListener('DOMContentLoaded', function() {
    let addItemButton = document.getElementById('addTargetButton');
    let newItemInput = document.getElementById('newTargetInput');
    let shoppingList = document.getElementById('shoppingList');
    
    // Récupérer les tâches existantes depuis LocalStorage lors du chargement de la page
    let savedItems = JSON.parse(localStorage.getItem('items')) || [];
    
    // Afficher les tâches existantes dans la liste
    savedItems.forEach(function(itemText) {
        let item = document.createElement('li');
        item.textContent = itemText;
        shoppingList.appendChild(item);
    });
    
    // se lance au click sur le "+"
    addItemButton.addEventListener('click', function() {
        let itemText = newItemInput.value.trim();
        if (itemText !== '') {
            // Créer un nouvel élément de liste
            let newTaskItem = document.createElement('li');
            newTaskItem.textContent = itemText;
            // Ajouter l'élément à la liste
            shoppingList.appendChild(newTaskItem);
            // Effacer le champ de texte
            newItemInput.value = '';
            
            // Ajouter le nouvel element a la liste d'achats enregistrés dans LocalStorage
            savedItems
            .push(itemText);
            localStorage.setItem('items', JSON.stringify(savedItems
            ));
        }
    });
});