import { addList, deleteList, doneList, editList, updateTaskTotal } from "./list.js";
import { listGroup, taskInput } from "./selectors.js";
import Swal from 'sweetalert2';

export const listGroupHandler = (event) => {
    const list = event.target.closest(".list");
    if (event.target.classList.contains("list-del-btn")) {
        deleteList(event.target.closest(".list").id);
    };

    if (event.target.classList.contains("list-edit-btn")) {
        editList(event.target.closest(".list").id);
    };

    if (event.target.classList.contains("list-done-check")) {
        doneList(event.target.closest(".list").id);
    };
}

export const addTaskBtnHandler = () => {
    if (taskInput.value.trim()) {
        addList(taskInput.value)
    } else {
        alert("You must input a task");
    }
}

export const taskInputHandler = (event) => {
    if (event.key === "Enter") {
        if (taskInput.value.trim()) {
            addList(taskInput.value);
        } else {
            alert("You must input a task");
        }
    }
}

export const deleteAllHandler = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(60 60 60)",
        cancelButtonColor: "rgb(168 162 158)",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const allLists = listGroup.querySelectorAll(".list");
            allLists.forEach((list) => list.remove());
            updateTaskTotal();
        }
    });
}

export const doneAllHandler = () => {
    Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(60 60 60)",
        cancelButtonColor: "rgb(168 162 158)",
        confirmButtonText: "Yes, do it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const allLists = document.querySelectorAll(".list");
            allLists.forEach((list) => {
                list.querySelector(".list-done-check").checked = true;
                doneList(list.id);
            })
        }
    });
}