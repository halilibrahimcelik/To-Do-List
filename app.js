const addTaskInput = document.getElementById("addToList");
const searchTaskInput = document.getElementById("searchInputArea");
const SearchTaskBtn = document.getElementById("searchBoxBtn");
const addTaskBtn = document.getElementById("addToListBtn");
const allList = document.getElementById("all-list");
const itemCompleted = document.getElementById("itemCompleted");
const itemTotal = document.getElementById("itemAll");

let defaultList = document.querySelectorAll("li");
let listofTasks = [...defaultList];
// console.log(listofTasks[2].querySelector(".draggableDiv"));

addTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTaskBtn.click();
  }
});
let allTasks = localStorage.getItem("alllTasks") || [];
console.log(allTasks);
addTaskBtn.addEventListener("click", addTaskHandler);
allList.addEventListener("click", removeListHandler);
allList.addEventListener("click", checkBoxHandler);
allList.addEventListener("mouseover", eventListenerFn);
SearchTaskBtn.addEventListener("click", searchKeyword);

let itemCount = 5;
let itemIndex = 4;

function addTaskHandler() {
  if (addTaskInput.value === "") {
    alert("Please enter a task");
    return;
  }
  itemCount++;
  itemIndex++;
  const draggableDiv = document.createElement("div");
  const newList = document.createElement("li");
  const newSpan = document.createElement("span");
  const formCheck = document.querySelector(".form-check-input");
  console.log(formCheck);
  draggableDiv.setAttribute("draggable", true);
  newList.setAttribute("data-index", `${itemIndex}`);
  newSpan.className = "col-1";
  newSpan.innerText = itemCount;
  draggableDiv.className = "draggableDiv d-flex justify-content-between col-11";
  newList.className = "list-group-item row d-flex";
  draggableDiv.innerHTML = `

  <div class="list-content">
    <input
      class="form-check-input me-1"
      type="checkbox"
      value="false"
      aria-label="..."
    />
    ${addTaskInput.value}
  </div>
  <button class="btn btn-danger btn-close"></button>


  `;
  newList.appendChild(newSpan);
  newList.appendChild(draggableDiv);

  let dataTemplate = {
    id: index,
    text: addTaskInput.value,
    isDone: formCheck.value,
  };

  allList.appendChild(newList);
  itemTotal.innerText = itemCount;

  addTaskInput.value = "";
  //!Push all list items
  listofTasks.push(newList);
}

function removeListHandler(e) {
  if (e.target.classList.contains("btn")) {
    itemCount--;

    e.target.parentElement.parentElement.remove();
    let dataList = JSON.parse(localStorage.getItem("allTasks"));
    let removedList = dataList.filter(
      (item) => item.text != e.target.previousElementSibling.innerText.trim()
    );
    console.dir(e.target.previousElementSibling.innerText.trim());
    localStorage.setItem("allTasks", JSON.stringify(removedList));
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
  dragStartIndex = +this.closest("li").getAttribute("data-index");
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

//!searchlists

function searchKeyword(e) {
  e.preventDefault();
  let text = searchTaskInput.value.toLowerCase();

  //   console.log(indexOf(text));

  let allTaskList = allList.querySelectorAll(".list-content");
  console.log(allTaskList);

  allTaskList.forEach((task) => {
    // console.log(task.parentElement.parentElement);
    let taskText = task.innerText.toLowerCase();

    if (!text) {
      return;
    }

    if (taskText.indexOf(text) !== -1) {
      task.parentElement.parentElement.classList =
        "list-group-item row d-flex bg-danger text-white";

      setTimeout(() => {
        task.parentElement.parentElement.classList =
          "list-group-item row d-flex";
      }, 3000);
    } else {
      task.parentElement.parentElement.classList = "list-group-item row d-flex";
    }
  });
  searchTaskInput.value = "";
}

//!show popUp

const arrowBtn = document.querySelector(".arrowBtn");
const popUpText = document.querySelector(".wrapper");

let visible = false;
arrowBtn.addEventListener("click", () => {
  if (!visible) {
    popUpText.classList = "wrapper  d-flex justify-content-between";
    visible = true;
    setTimeout(() => {
      popUpText.classList =
        "wrapper popUp-wraper  d-flex justify-content-between";
    }, 3000);
  } else {
    popUpText.classList =
      "wrapper popUp-wraper  d-flex justify-content-between";
    visible = false;
  }
});

//!resetBtn
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  window.location.reload();
});
