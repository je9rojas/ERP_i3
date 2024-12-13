document.getElementById('purchaseForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
  
    const newPurchase = { producto, cantidad, precio };
  
    try {
      const response = await fetch('http://localhost:3000/api/compras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPurchase),
      });
  
      if (response.ok) {
        loadPurchases(); // Actualizar la lista
      }
    } catch (error) {
      console.error("Error al agregar la compra:", error);
    }
  });
  
  async function loadPurchases() {
    try {
      const response = await fetch('http://localhost:3000/api/compras');
      const purchases = await response.json();
  
      const purchaseList = document.getElementById('purchaseList');
      purchaseList.innerHTML = '';
  
      purchases.forEach(({ producto, cantidad, precio }) => {
        const li = document.createElement('li');
        li.textContent = `${producto} - ${cantidad} unidades - $${precio}`;
        purchaseList.appendChild(li);
      });
    } catch (error) {
      console.error("Error al cargar las compras:", error);
    }
  }
  
  // Cargar la lista al inicio
  loadPurchases();
  

/*


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("purchase-form");
    const purchaseList = document.getElementById("purchase-list");

    // Enviar datos al backend
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            item: form.item.value,
            quantity: parseInt(form.quantity.value),
            price: parseFloat(form.price.value),
        };

        const response = await fetch("http://localhost:3000/api/purchases", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            form.reset();
            loadPurchases(); // Actualizar la lista
        }
    });

    // Cargar lista de compras
    async function loadPurchases() {
        const response = await fetch("http://localhost:3000/api/purchases");
        const purchases = await response.json();
        purchaseList.innerHTML = "";
        purchases.forEach((purchase) => {
            const li = document.createElement("li");
            li.textContent = `${purchase.item} - ${purchase.quantity} unidades - $${purchase.price}`;
            purchaseList.appendChild(li);
        });
    }

    loadPurchases(); // Cargar compras al inicio
});


*/