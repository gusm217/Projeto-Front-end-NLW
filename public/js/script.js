document.querySelector("#add-time").addEventListener("click", cloneField);

function cloneField() {
  const newFieldContainer = document.querySelector(".schedule-item").cloneNode;

  const fields = newFieldContainer.querySelectorAll("input");

  fields.forEach((field) => {
    field.value = "";
  });

  document.querySelector("#schedule-item").appendChild(newFieldContainer);
}
