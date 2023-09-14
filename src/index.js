document.addEventListener("DOMContentLoaded", () => {
  (function Dogs() {
    return fetch(`http://localhost:3000/dogs`)
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector("#table-body");
        const editButton = document.getElementById("edit-button");
        data.forEach((dogs) => {
          const { name, breed, sex } = dogs;
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
          tdButton.classList = `btn btn-secondary`;
          tr.appendChild(tdButton);

          tableBody.appendChild(tr);
        });
        const getForm = document.querySelector("#dog-form");
        getForm.addEventListener("click", (e) => {
          e.preventDefault();
          console.log(e.target);
        });
        tableBody.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON" && e.target.id === "edit-button") {
            const tr = e.target.closest("tr");
            const tds = tr.querySelectorAll("td");

            const textContents = Array.from(tds).map((td) => td.textContent);

            const input = document.querySelectorAll("input");
            input.forEach((place, index) => {
              place.placeholder = textContents[index];
            });
            console.log(textContents);
          }
        });
      });
  })();
});
