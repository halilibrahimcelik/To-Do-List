const addTaskInput = document.getElementById("addToList");
const addTaskBtn = document.getElementById("addToListBtn");
const allList = document.getElementById("all-list");
const itemCompleted = document.getElementById("itemCompleted");
const itemTotal = document.getElementById("itemAll");

addTaskBtn.addEventListener("click", addTaskHandler);
allList.addEventListener("click", removeListHandler);
allList.addEventListener("click", checkBoxHandler);

console.log(itemCompleted, itemTotal);

let itemCount = 5;

function addTaskHandler() {
  if (addTaskInput.value === "") {
    alert("Please enter a task");
    return;
  }
  itemCount++;

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
  itemTotal.innerText = itemCount;
  console.log(addTaskInput.value);
  addTaskInput.value = "";
}

function removeListHandler(e) {
  if (e.target.classList.contains("btn")) {
    itemCount--;
    e.target.parentElement.remove();
    itemTotal.innerText = itemCount;
  }
}

let itemDoneCount = 0;
let inputObj;
let selectedCount = 0;
function checkBoxHandler(e) {
  if (e.target.classList.contains("form-check-input")) {
    const numberOfCheckedBoxes = $("input:checkbox:checked").length;

    itemCompleted.innerText = numberOfCheckedBoxes;
  }
}
