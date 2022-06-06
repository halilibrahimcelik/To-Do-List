const addTaskInput = document.getElementById("addToList");
const addTaskBtn = document.getElementById("addToListBtn");
const allList = document.getElementById("all-list");

addTaskBtn.addEventListener("click", addTaskHandler);
allList.addEventListener("click", removeListHandler);

function addTaskHandler() {
  if (addTaskInput.value === "") {
    alert("Please enter a task");
    return;
  }

  const newList = document.createElement("li");
  const button = document.createElement("button");
  button.className = "btn btn-danger btn-close";
  newList.className = "list-group-item d-flex justify-content-between";
  newList.innerHTML = `

  <div class="list-content">
    <input
      class="form-check-input me-1"
      type="checkbox"
      value=""
      aria-label="..."
    />
    ${addTaskInput.value}
  </div>


  `;
  newList.appendChild(button);
  allList.appendChild(newList);
  console.log(addTaskInput.value);
  addTaskInput.value = "";
}

function removeListHandler(e) {
  if (e.target.classList.contains("btn")) {
    e.target.parentElement.remove();
  }
}
