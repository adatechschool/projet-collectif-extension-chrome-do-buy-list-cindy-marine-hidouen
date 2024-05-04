// se lance au chargement de l'extension (ouverture du navigateur)
document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.getElementById('addButton');
    let validItemButton = document.getElementById('validButton');
    let itemNameInput = document.getElementById('newNameInput');
    let itemPriceInput = document.getElementById('newPriceInput');
    let shoppingList = document.getElementById('shoppingList');
    
    // Récupérer les tâches existantes depuis LocalStorage lors du chargement de la page
    let savedItems = JSON.parse(localStorage.getItem('items')) || [];
    
    // Afficher les elements deja enregistre dans la liste
    for (let i = 0; i < savedItems.length; i++) {
        createBubble(savedItems[i]);
    }

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
            price: parseInt(itemPriceInput.value)
        };
        if (newItem.name !== '' && newItem.price !== '' && !isNaN(newItem.price)) {
            createBubble(newItem);
            // Effacer le champ de texte
            itemNameInput.value = '' 
            itemPriceInput.value = '';
            // Ajouter le nouvel element a la liste d'achats enregistrés dans LocalStorage
            savedItems.push(newItem);
            localStorage.setItem('items', JSON.stringify(savedItems
            ));
        }
    });
});

function createBubble(item) {
    let newBubble = document.createElement('div');
    newBubble.className = "bulle";
    newBubble.innerHTML = '<p>' + item.name + '<br>' + item.price + ' €</p><p>🗑️</p>';
    shoppingList.appendChild(newBubble);

    setTimeout( () => {     // adapte la taille des bulles au contenu
        let heightContainer = newBubble.clientHeight
        newBubble.style.height = heightContainer + 'px'
    }, 0)
}
