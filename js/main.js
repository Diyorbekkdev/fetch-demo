const loader = document.querySelector(".loader");
loader.innerHTML += `
<div class="loaderr"></div>`;

function getData(url) {
  class ErrorResponse extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          reject(new ErrorResponse(res.status, "Url is error"));
        }
      })
      .then((res) => {
        resolve(res);
      });
  });
}

let cardRow = document.querySelector(".card__row");

function getCard({ name, username, email, address, phone, website, id }) {
  return `
        <div class="card_wrapper">
        <div class="card">
            <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-subtitle mb-2 text-muted">${username}</h3>
            <div class="main-col flex-column py-2 mb-2 ">
            <div class="d-flex"> <p class="m-0 me-1">Email:</p> <a href="${email}" class="ms-0 card-link">
            ${email}
            </a></div>
            <div class="d-flex"> <p class="m-0 me-1">Website:</p> <a href="${website}" class="ms-0 card-link">
            ${website}
            </a> </div>
            <div class="d-flex"> <p class="m-0 me-1">Address:</p> <a href="${address}" class="ms-0 card-link">
            ${address.city},${address.street}
            </a> </div>
            <div class="d-flex"> <p class="m-0 me-1">Phone:</p> <a href="tel:${phone}" class="ms-0 card-link">
            ${phone}
            </a></div>
                </div>
            <div class="button_wrapper">
                <a onclick="saveId(${id},'Todos')" style="color:white" class="btn " href="posts.html">Todos</a>
                <a onclick="saveId(${id},'Posts')" style="color:white" class="btn " href="posts.html">Posts</a>
                <a onclick="saveId(${id})" style="color:white" class="btn " href="gallery.html">Galarey</a>
            </div>
            </div>
            </div>
        </div>
        </div>
  `;
}


async function getObj() {
  let a = await getData("https://jsonplaceholder.typicode.com/users");
  a.map((el) => {
    cardRow.innerHTML += getCard(el);
  });

  loader.innerHTML = "";
  loader.style.height = "0px";
}

setTimeout(()=>{
  getObj();
},1000);

function saveId(id, point = "") {
  localStorage.setItem("userId", JSON.stringify(id));
  localStorage.setItem("point", JSON.stringify(point));
}