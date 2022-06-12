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

let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
console.log(allTasks);

addTaskBtn.addEventListener("click", addTaskHandler);
allList.addEventListener("click", removeListHandler);
allList.addEventListener("click", checkBoxHandler);
allList.addEventListener("mouseover", eventListenerFn);
SearchTaskBtn.addEventListener("click", searchKeyword);
addTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTaskBtn.click();
  }
});
let itemCount = 5;
let itemIndex = 4;
let allTaskIndex = 5;

renderedTasks();

function renderedTasks() {
  allTasks.forEach((task) => {
    addTaskToDom(task);
  });
}

function addTaskToDom(allTasks) {
  itemCount++;
  itemIndex++;
  const { id, index, isDone, content } = allTasks;
  const draggableDiv = document.createElement("div");
  const newList = document.createElement("li");
  const newSpan = document.createElement("span");
  const formCheck = document.querySelector(".form-check-input");
  console.log(formCheck);
  draggableDiv.setAttribute("draggable", true);
  newList.setAttribute("data-index", `${itemIndex}`);
  newList.setAttribute("id", `${id}`);
  newSpan.className = "col-1";
  newSpan.innerText = index;
  draggableDiv.className = "draggableDiv d-flex justify-content-between col-11";
  newList.className = "list-group-item row d-flex";
  draggableDiv.innerHTML = `

  <div class="list-content">
    <input
      class="form-check-input me-1"
      type="checkbox"
      value="false"
      aria-label="..."
      ${isDone ? "checked" : ""}
    />
    ${content}
  </div>
  <button class="btn btn-danger btn-close"></button>


  `;
  newList.appendChild(newSpan);
  newList.appendChild(draggableDiv);

  allList.appendChild(newList);
  itemTotal.innerText = itemCount;
  //!Push all list items
  listofTasks.push(newList);
}

function addTaskHandler() {
  if (addTaskInput.value === "") {
    alert("Please enter a task");
    return;
  }
  const colIndex = document.querySelectorAll(".col-1");
  const colArray = [...colIndex];
  let indexCount = colArray[colArray.length - 1].innerText;

  //!adding info to the localstorage
  let allTaskObject = {
    index: ++indexCount,
    id: new Date().getTime(),
    isDone: false,
    content: addTaskInput.value,
  };
  allTasks.push(allTaskObject);

  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  addTaskToDom(allTaskObject);

  addTaskInput.value = "";
}

function removeListHandler(e) {
  if (e.target.classList.contains("btn")) {
    itemCount--;

    const colIndex = document.querySelectorAll(".col-1");
    const colArray = [...colIndex];
    console.log(colArray);

    let arr = [];
    let newArr = [];
    console.log(colIndex);
    colIndex.forEach((col) => {
      const index = col.innerText;
      arr.push(index);
    });
    arr
      .map((number, index) => {
        // if (index === 0) return;
        newArr.push(index + 1);
      })
      .sort((a, b) => a - b);

    colArray.map((col, index) => {
      col.innerText = newArr[index];
    });
    console.log(newArr);

    const parentId = e.target.parentElement.parentElement.id;
    allTasks = allTasks.filter((task) => task.id != parentId);
    console.log(allTasks);

    //!!updating the localStorage
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    e.target.parentElement.parentElement.remove();
    let numberOfCheckedBoxes = $("input:checkbox:checked").length;
    itemCompleted.innerText = numberOfCheckedBoxes--;
    itemTotal.innerText = itemCount;
  }
}
let isChecked = false;
function checkBoxHandler(e) {
  if (e.target.classList.contains("form-check-input")) {
    const parentId = e.target.parentElement.parentElement.parentElement.id;
    console.log(parentId);
    allTasks.map((task, index) => {
      if (task.id == parentId) {
        allTasks[index].isDone = !allTasks[index].isDone;
      }
    });
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    if (!isChecked) {
      e.target.setAttribute("checked", true);
      isChecked = true;
    } else {
      e.target.removeAttribute("checked");
      isChecked = false;
    }
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
