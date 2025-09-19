// VARIABILI GENERALI
// const URL = "https://striveschool-api.herokuapp.com/api/product";
const appId = new URLSearchParams(window.location.search).get("productId");
const URL = appId ? "https://striveschool-api.herokuapp.com/api/product/" + appId : "https://striveschool-api.herokuapp.com/api/product/";
const method = appId ? "PUT" : "POST";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMDhmOTZmMzAyMjAwMTUxMDgwYjkiLCJpYXQiOjE3NTgyNjc2NDEsImV4cCI6MTc1OTQ3NzI0MX0.HnWyWygCY6PeJ5ipZpGGjbN40OHwxyBBgM1ti_8AcTg";
const form = document.getElementById("formPut");
const btnSubmit = document.getElementById("btnSubmit");
const btnReset = document.getElementById("btnReset");
const nameInput = document.getElementById("productName");
const descriptionInput = document.getElementById("productDescription");
const brandInput = document.getElementById("productBrand");
const linkInput = document.getElementById("productImage");
const priceInput = document.getElementById("productPrice");

// FUNZIONI

// generateAlert
const generateAlert = (color, msg) => {
  const div = document.createElement("div");
  div.setAttribute("role", "alert");
  div.className = `alert alert-${color}`;
  div.innerText = msg;
  const main = document.getElementById("main");
  main.before(div);
  setTimeout(() => {
    div.remove();
  }, 2000);
};

// listener sul form per il put o il post
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // dichiarazione di un nuovo product per il PUT o PULL
  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: linkInput.value,
    price: priceInput.value,
  };
  fetch(URL, {
    method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
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
      if (!appId) {
        generateAlert("success", "E' andato tutto bene, la risorsa è stata creata!");
        // alert("E' andato tutto bene. risorsa creata con id: " + product._id);
        form.reset();
      } else {
        generateAlert("warning", "E' andato tutto bene, la risorsa è stata modificata!");
        // alert("Abbiamo modificato la risorsa");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});

// generate Modal
const generateModale = (title, paragrafo) => {
  const modalTitle = document.getElementById("ReseteorDeleteModalLabel");
  modalTitle.classList.add("text-danger");
  modalTitle.innerText = title;
  const modalP = document.getElementById("modalP");
  modalP.innerText = paragrafo;
};

// controllo risposta modale
const checkAnswerModale = () => {
  return new Promise((resolve) => {
    const confirmBtn = document.getElementById("confirmed");
    const rejectBtn = document.getElementById("reject");

    confirmBtn.addEventListener("click", () => resolve(true), { once: true });
    rejectBtn.addEventListener("click", () => resolve(false), { once: true });
  });
};

// funzione per la gestione del button reset o delete
btnReset.addEventListener("click", async () => {
  if (appId) {
    generateModale("Delete", "Sei sicuro di voler eliminare la risora?");
    const confermato = await checkAnswerModale();
    if (confermato) {
      fetch(URL, {
        method: "DELETE",
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
          alert("Abbiamo eliminato la risorsa");
          window.location.href = "index.html";
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  } else {
    generateModale("Reset", "Sei sicuro di volere Resettare il form?");
    const confermato = await checkAnswerModale();
    if (confermato) {
      form.reset();
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (appId) {
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
      .then((product) => {
        const { name, description, brand, imageUrl, price } = product;

        nameInput.value = name;
        descriptionInput.value = description;
        brandInput.value = brand;
        linkInput.value = imageUrl;
        priceInput.value = price;
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });

    //   modifico il testo del bottone da Crea a Modifica

    btnSubmit.innerText = "Modifica";
    btnSubmit.classList.remove("btn.primaty");
    btnSubmit.classList.add("btn-warning");
    btnReset.innerText = "Delete";
  }
});
