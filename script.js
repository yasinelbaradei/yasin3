const noteInput = document.getElementById("notesInput");
const notesDiv = document.getElementById("notesDiv");
const zeroNotes = document.getElementById("zeroNotes");
const optionDiv = document.getElementById("optionDiv");
const loginDiv = document.getElementById("loginDiv");


var notesArray = [];

function showOption() {
    optionDiv.style.display = "flex";
    notesDiv.style.display = "none";
    zeroNotes.style.display = "none";
}

function showHome() {
    optionDiv.style.display = "none";
    notesDiv.style.display = "block";
    loginDiv.style.display = "none"
    getNotes()
}

function showLogin() {
    optionDiv.style.display = "none";
    loginDiv.style.display = "flex";
}

function checkInput() {
    if (noteInput.value == "") {
        alert("please Inter your note");
    } else {
        addNote();
    }
}

function addNote() {
    const newNote = noteInput.value;
    noteInput.value = "";
    notesArray.push(newNote);
    saveNotes();
}

function saveNotes() {
    const notesString = JSON.stringify(notesArray);
    localStorage.setItem("notes", notesString);
    getNotes()
}

function getNotes() {
    const notesString = localStorage.getItem("notes");
    if (notesString == null) {
        console.log("no note found");   
    } else {
        notesArray = JSON.parse(notesString);
        if (notesArray.length > 0) {
            zeroNotes.style.display = "none";
            notesDiv.style.display = "block";
        } else {
            zeroNotes.style.display = "block";
            notesDiv.style.display = "none";
        }
        showNotes()
    }
}

function showNotes() {

    notesDiv.innerHTML = ""

    for (let index = 0; index < notesArray.length; index++) {
        const element = notesArray[index];

        const newDiv = document.createElement("div");

        const newP = document.createElement("p");
        newP.innerText = element;
        newDiv.appendChild(newP);

        const deleteButton = document.createElement("i");
        deleteButton.className = "bi bi-trash";
        deleteButton.onclick = function () {
            if (confirm("are you sure to delete note?") == true) {
                notesArray.splice(index, 1);
                saveNotes()   
            }
        }
        newDiv.appendChild(deleteButton);
        notesDiv.appendChild(newDiv);
    }
}

getNotes();