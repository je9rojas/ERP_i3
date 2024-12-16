document.getElementById("purchase-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const code = document.getElementById("codigo").value;
  const productType = document.getElementById("tipo").value;
  const price = parseFloat(document.getElementById("precio").value);
  const quantity = parseInt(document.getElementById("cantidad").value, 10);

  try {
      const response = await fetch("http://localhost:3000/api/purchases/createOrUpdate", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, productType, price, quantity }),
      });

      const data = await response.json();
      alert(data.message);
  } catch (error) {
      alert("Error al registrar la compra");
      console.error(error);
  }
});
