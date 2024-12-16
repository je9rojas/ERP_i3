document.getElementById('purchaseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const item = document.getElementById('item').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
  
    const compra = { item, cantidad, precio };
  
    try {
      const response = await fetch('http://localhost:3000/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compra),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(`Compra guardada con éxito: ID ${data.id}`);
      } else {
        console.error('Error al guardar la compra:', data);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al enviar la compra.');
    }
  });
  