const noteInput = document.getElementById("notesInput");
const notesDiv = document.getElementById("notesDiv")
const zeroNotes = document.getElementById("zeroNotes")

var notesArray = [];

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
            showNotes()
        } else {
            zeroNotes.style.display = "none";
            notesDiv.style.display = "block";
        }
    }
}

function showNotes() {

    notesDiv.innerHTML = ""

    for (let index = 0; index < notesArray.length; index++) {
        const element = notesArray[index];

        const newDiv = document.

        createElement("div");
        const newP = document.createElement("p");

        newP.innerText = element;

        newDiv.appendChild(newP);

        const newIcon = document.createElement("i");

        newIcon.className = "bi bi-trash";

        newDiv.appendChild(newIcon);

        notesDiv.appendChild(newDiv);
    }
}

getNotes();