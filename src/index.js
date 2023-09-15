document.addEventListener("DOMContentLoaded", () => {
  const objdog = {};

  (function Dogs() {
    return fetch(`http://localhost:3000/dogs`)
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector("#table-body");
        data.forEach((dogs) => {
          const { id, name, breed, sex } = dogs;
          const tr = document.createElement("tr");

          const tdName = document.createElement("td");
          tdName.innerText = name;
          tr.appendChild(tdName);

          const tdBreed = document.createElement("td");
          tdBreed.innerText = breed;
          tr.appendChild(tdBreed);

          const tdSex = document.createElement("td");
          tdSex.innerText = sex;
          tr.appendChild(tdSex);
          const tdButton = document.createElement("button");
          tdButton.textContent = "Edit Dog";
          tdButton.id = "edit-button";
          tdButton.setAttribute("data-btnID", id);
          tdButton.classList = `btn btn-secondary`;
          tr.appendChild(tdButton);

          tableBody.appendChild(tr);
        });
        const input = document.querySelectorAll("input");

        const getForm = document.querySelector("#dog-form");
        getForm.addEventListener("submit", (e) => {
          e.preventDefault();

          Object.assign(objdog, {
            id: objdog.id,
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value,
          });
          console.log(objdog.id);
          updateDogInfo(objdog);
        });
        tableBody.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON" && e.target.id === "edit-button") {
            const tr = e.target.closest("tr");
            const tds = tr.querySelectorAll("td");
            const textContents = Array.from(tds).map((td) => td.textContent);
            console.log(e.target.dataset.btnid);
            input.forEach((place, index) => {
              Object.assign(objdog, {
                id: e.target.dataset.btnid,
                name: textContents[0],
                breed: textContents[1],
                sex: textContents[2],
              });

              place.setAttribute("data-input", e.target.dataset.btnid);
              place.placeholder = textContents[index];
            });
            console.log(objdog);
          }
        });
      });
  })();
  console.log(objdog);

  function updateDogInfo(obj) {
    fetch(`http://localhost:3000/dogs/${obj.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data = console.log(data)))
      .catch((error) => {
        console.log(error.message);
      });
  }
});
