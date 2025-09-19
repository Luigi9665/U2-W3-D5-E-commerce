// VARIABILI GENERALI
const row = document.getElementById("rowCard");
const URL = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMDhmOTZmMzAyMjAwMTUxMDgwYjkiLCJpYXQiOjE3NTgyNjc2NDEsImV4cCI6MTc1OTQ3NzI0MX0.HnWyWygCY6PeJ5ipZpGGjbN40OHwxyBBgM1ti_8AcTg";
// FUNZIONI

const isLoading = (boolean) => {
  const spinner = document.querySelector(".spinner-border");
  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

generateCard = (product) => {
  const col = document.createElement("div");
  col.classList.add("col-md-4", "mb-4");

  const card = document.createElement("div");
  card.className = "card shadow-sm h-100";
  card.setAttribute("style", "border-radius:1rem; transition: transform 0.2s, box-shadow 0.3s;");

  card.onmouseover = () => (card.style.transform = "translateY(-5px)");
  card.onmouseout = () => (card.style.transform = "translateY(0)");

  const linkImg = document.createElement("a");
  linkImg.href = `details.html?productId=${product._id}`;
  linkImg.className = "text-decoration-none";

  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top object-fit-cover";
  cardImg.src = product.imageUrl;
  cardImg.setAttribute("style", "height:200px; border-top-left-radius:1rem; border-top-right-radius:1rem; transition: transform 0.3s;");

  cardImg.onmouseover = () => (cardImg.style.transform = "scale(1.05)");
  cardImg.onmouseout = () => (cardImg.style.transform = "scale(1)");

  linkImg.append(cardImg);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";

  const h4 = document.createElement("h4");
  h4.className = "card-title fw-bold mb-1";
  h4.innerText = product.name;

  const h5 = document.createElement("h5");
  h5.className = "card-title text-muted mb-3";
  h5.innerText = product.brand;

  const p = document.createElement("p");
  p.className = "card-text flex-grow-1";
  p.innerText = product.description;

  const divBtn = document.createElement("div");
  divBtn.className = "d-flex justify-content-between align-items-center mt-3";

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const linkDetails = document.createElement("a");
  linkDetails.href = `details.html?productId=${product._id}`;
  linkDetails.className = "text-decoration-none";

  const btnView = document.createElement("button");
  btnView.className = "btn btn-sm btn-success";
  btnView.innerText = "Scopri di più";
  linkDetails.append(btnView);

  const linkModified = document.createElement("a");
  linkModified.href = `backoffice.html?productId=${product._id}`;
  linkModified.className = "text-decoration-none";

  const btnModified = document.createElement("button");
  btnModified.className = "btn btn-sm btn-danger ms-3";
  btnModified.innerText = "Modifica";
  linkModified.append(btnModified);

  btnGroup.append(linkDetails, linkModified);

  const small = document.createElement("small");
  small.className = "price-animated fw-bold";
  small.innerText = product.price + " €";

  divBtn.append(btnGroup, small);

  cardBody.append(h4, h5, p, divBtn);
  card.append(linkImg, cardBody);
  col.append(card);
  row.appendChild(col);
};

// sotto un generatecard senza style
// generateCard = (product) => {
//   console.log("dentro il generate", product);
//   const col = document.createElement("div");
//   col.classList.add("col-md-4");
//   const card = document.createElement("div");
//   card.className = "card mb-4 shadow-sm";
//   const cardImg = document.createElement("img");
//   cardImg.className = "bd-placeholder-img card-img-top";
//   cardImg.src = product.imageUrl;
//   const cardBody = document.createElement("div");
//   cardBody.className = "card-body";
//   const h4 = document.createElement("h4");
//   h4.className = "card-title";
//   h4.innerText = product.name;
//   const h5 = document.createElement("h5");
//   h5.className = "card-title";
//   h5.innerText = product.brand;
//   const p = document.createElement("p");
//   p.className = "card-text";
//   p.innerText = product.description;
//   const divBtn = document.createElement("div");
//   divBtn.className = "d-flex justify-content-between align-items-center";
//   const btnGroup = document.createElement("div");
//   btnGroup.className = "btn-group";
//   const linkDetails = document.createElement("a");
//   linkDetails.href = `details.html?productId=${product.id}`;
//   linkDetails.className = "text-decoration-none";
//   const btnView = document.createElement("button");
//   btnView.className = "btn btn-sm btn-outline-secondary bg-success";
//   btnView.innerText = "Scopri di più";
//   linkDetails.append(btnView);
//   const linkModified = document.createElement("a");
//   linkModified.href = `backoffice.html?id=${product.id}`;
//   linkModified.className = "text-decoration-none";
//   const btnModified = document.createElement("button");
//   btnModified.className = "btn btn-sm btn-outline-secondary bg-danger";
//   btnModified.innerText = "Modifica";
//   linkModified.append(btnModified);
//   btnGroup.append(linkDetails, linkModified);
//   const small = document.createElement("small");
//   small.className = "text-muted";
//   small.innerText = product.price;
//   divBtn.append(btnGroup, small);
//   cardBody.append(h4, h5, p, divBtn);
//   card.append(cardImg, cardBody);
//   col.append(card);
//   row.appendChild(col);
// };

// fetch
const getFetch = (URL, key) => {
  fetch(URL, {
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
    .then((products) => {
      products.forEach((product) => {
        generateCard(product);
      });
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    })
    .finally(() => isLoading(false));
};

window.addEventListener("DOMContentLoaded", () => {
  isLoading(true);
  getFetch(URL, key);
});
