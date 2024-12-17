// Agregar un event listener al formulario
document.getElementById('purchaseForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que el formulario recargue la página

  // Capturar los valores de los campos del formulario
  const code = document.getElementById('code').value;
  const productType = document.getElementById('productType').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;
  const purchaseDate = document.getElementById('purchaseDate').value;

  // Crear un objeto con los datos
  const purchase = { code, productType, quantity, price, purchaseDate };

  try {
    // Enviar los datos al backend usando fetch
    const response = await fetch('http://localhost:3000/api/compras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchase),
    });

    const data = await response.json();

    if (response.ok) {
      // Mostrar un mensaje de éxito
      alert('Compra guardada exitosamente');

      // Limpiar los campos del formulario
      document.getElementById('purchaseForm').reset();
    } else {
      // Mostrar un mensaje de error
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Ocurrió un error al enviar el formulario.');
  }
});
