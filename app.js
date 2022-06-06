const addTaskInput = document.getElementById("addToList");
const addTaskBtn = document.getElementById("addToListBtn");
const allList = document.getElementById("all-list");
const itemCompleted = document.getElementById("itemCompleted");
const itemTotal = document.getElementById("itemAll");

let defaultList = document.querySelectorAll("li");

let listofTasks = [...defaultList];
console.log(listofTasks[2].querySelector(".draggableDiv"));

console.log(defaultList);

addTaskBtn.addEventListener("click", addTaskHandler);
allList.addEventListener("click", removeListHandler);
allList.addEventListener("click", checkBoxHandler);
allList.addEventListener("mouseover", eventListenerFn);

console.log(itemCompleted, itemTotal);

let itemCount = 5;
let itemIndex = 4;
// let listofTasks = ["Editing Resume", "Finish the team work", ""];
function addTaskHandler() {
  if (addTaskInput.value === "") {
    alert("Please enter a task");
    return;
  }
  itemCount++;
  itemIndex++;
  const draggableDiv = document.createElement("div");
  const newList = document.createElement("li");

  draggableDiv.setAttribute("draggable", true);
  newList.setAttribute("data-index", `${itemIndex}`);
  draggableDiv.className = "draggableDiv d-flex justify-content-between";
  newList.className = "list-group-item";
  draggableDiv.innerHTML = `

  <div class="list-content">
    <input
      class="form-check-input me-1"
      type="checkbox"
      value=""
      aria-label="..."
    />
    ${addTaskInput.value}
  </div>
  <button class="btn btn-danger btn-close"></button>


  `;
  newList.appendChild(draggableDiv);

  allList.appendChild(newList);
  itemTotal.innerText = itemCount;
  console.log(addTaskInput.value);
  addTaskInput.value = "";
  //!Push all list items
  listofTasks.push(newList);
}

function removeListHandler(e) {
  if (e.target.classList.contains("btn")) {
    itemCount--;

    e.target.parentElement.parentElement.remove();
    let numberOfCheckedBoxes = $("input:checkbox:checked").length;
    itemCompleted.innerText = numberOfCheckedBoxes--;
    itemTotal.innerText = itemCount;
  }
}

function checkBoxHandler(e) {
  if (e.target.classList.contains("form-check-input")) {
    const numberOfCheckedBoxes = $("input:checkbox:checked").length;
    itemCompleted.innerText = numberOfCheckedBoxes;
  }
}
let dragStartIndex;

function dragStart() {
  console.log("event: Start");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}
function dragOver(e) {
  e.preventDefault();
  //   console.log("event: Over");
}
function dragEnter() {
  this.closest("li").classList.add("over-list");
}
function dragLeave() {
  //   console.log("event: Leave");
  this.closest("li").classList.remove("over-list");
}
function dragDrop() {
  console.log("event: Drop");
  const dragEnd = +this.getAttribute("data-index");
  swapListItem(dragStartIndex, dragEnd);

  this.closest("li").classList.remove("over-list");
}

function swapListItem(fromIndex, toIndex) {
  const itemOne = listofTasks[fromIndex].querySelector(".draggableDiv");
  const itemTwo = listofTasks[toIndex].querySelector(".draggableDiv");

  listofTasks[fromIndex].appendChild(itemTwo);
  listofTasks[toIndex].appendChild(itemOne);

  //   console.log(itemOne);
  //   console.log("*****");
  //   console.log(itemTwo);
}
function eventListenerFn(e) {
  const draggableDivs = document.querySelectorAll(".draggableDiv");
  const dragListItems = document.querySelectorAll("li");
  if (e.target.classList.contains("list-content")) {
    // console.log("yay");
    // console.log(dragListItems);
    draggableDivs.forEach((draggable) => {
      draggable.addEventListener("dragstart", dragStart);
    });
    dragListItems.forEach((item) => {
      item.addEventListener("dragover", dragOver);
      item.addEventListener("drop", dragDrop);
      item.addEventListener("dragenter", dragEnter);
      item.addEventListener("dragleave", dragLeave);
    });
  }
}
