// VARIABILI GENERALI
const row = document.getElementById("row");

const URL = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMDhmOTZmMzAyMjAwMTUxMDgwYjkiLCJpYXQiOjE3NTgyNjc2NDEsImV4cCI6MTc1OTQ3NzI0MX0.HnWyWygCY6PeJ5ipZpGGjbN40OHwxyBBgM1ti_8AcTg";

const params = new URLSearchParams(window.location.search);
const appId = params.get("productId");

// FUNZIONI
const generateProductDetails = (product) => {
  const firstCol = document.createElement("div");
  firstCol.className = "col-12 col-md d-flex";

  firstCard = document.createElement("div");
  firstCard.className = "card shadow-sm border-5 border-black d-flex flex-fill rounded-5";
  firstCard.setAttribute("style", "max-height:750px;");

  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top rounded-5 object-fit-scale h-100";
  cardImg.src = product.imageUrl;

  firstCard.append(cardImg);
  firstCol.append(firstCard);

  const secondCol = document.createElement("div");
  secondCol.className = "col-12 col-md d-flex flex-column justify-content-around";

  const h1 = document.createElement("h1");
  const h5 = document.createElement("h5");
  const p = document.createElement("p");
  const h3 = document.createElement("h3");
  h1.className = "display-1";
  h5.className = "display-5";
  p.className = "fs-1";
  h3.className = "text-primary fw-bold text-center mb-4";

  h1.innerText = product.name;
  h5.innerText = product.brand;
  p.innerText = product.description;
  h3.innerText = product.price + "€";

  const divBtn = document.createElement("div");
  const btnAdd = document.createElement("button");
  const btnFav = document.createElement("button");

  btnAdd.innerText = "Aggiungi al carrello";
  btnFav.innerText = "Aggiungi ai preferiti";

  divBtn.className = "d-flex gap-2 mb-4";
  btnAdd.className = "btn btn-success btn-lg flex-grow-1";
  btnFav.className = "btn btn-outline-warning btn-lg flex-grow-1";

  divBtn.append(btnAdd, btnFav);
  secondCol.append(h1, h5, p, h3, divBtn);

  row.append(firstCol, secondCol);
};

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL + appId, {
    headers: {
      Authorization: key,
    },
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Autorizzazione fallita, controlla la tua API key.");
        } else if (response.status === 404) {
          throw new Error("Risorsa non trovata (404).");
        } else if (response.status >= 500) {
          throw new Error("Errore del server, riprova più tardi.");
        } else {
          throw new Error("Errore nella richiesta: " + response.status);
        }
      }
      return response.json();
    })
    .then((product) => {
      generateProductDetails(product);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});
