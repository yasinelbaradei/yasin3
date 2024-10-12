const noteInput = document.getElementById("notesInput");

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
    console.log(notesArray);
}

function saveNotes() {
    localStorage
}