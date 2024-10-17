const noteInput = document.getElementById("notesInput");
const notesDiv = document.getElementById("notesDiv");
const zeroNotes = document.getElementById("zeroNotes");
const optionDiv = document.getElementById("optionDiv");
const loginDiv = document.getElementById("loginDiv");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const detailsDiv = document.getElementById("detailsDiv");
const greetingText = document.getElementById("greetingText");

var notesArray = [];

function showOption() {
    const userId = localStorage.getItem("userId");
    if (userId == null) {
        optionDiv.style.display = "flex";
    } else {
        const userName = localStorage.getItem("userName");
        detailsDiv.style.display = "flex";
        greetingText.innerText = `welcome ${userName}`;
    }

    notesDiv.style.display = "none";
    zeroNotes.style.display = "none";    
}

function showHome() {
    optionDiv.style.display = "none";
    notesDiv.style.display = "block";
    loginDiv.style.display = "none"
    detailsDiv.style.display = "none"
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
    getNotes();
}

function getNotes() {
    const notesString = localStorage.getItem("notes");
    if (notesString == null) {
        console.log("no note found"); 
        zeroNotes.style.display = "block";
        notesDiv.style.display = "none";
    } else {
        notesArray = JSON.parse(notesString);
        if (notesArray.length > 0) {
            zeroNotes.style.display = "none";
            notesDiv.style.display = "block";
        } else {
            zeroNotes.style.display = "block";
            notesDiv.style.display = "none";
            showNotes();
        }
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

async function loginUser() {

    loginError.style.display = "none"

    const APIUrl = `https://tatbeqak.site/apps/tatbeqey/apps/easynotes/login?email=${loginEmail.value}&password=${loginPassword.value}`;

    const response = await fetch(APIUrl);

    const data = response.json();

    const status = data.status;

    if (status == true) {
        const userName = data.name;
        const userId = data.id;

        localStorage.setItem("userName", userName);
        localStorage.setItem("userId", userId);

        greetingText.innerText = `welcome ${userName}`;

        loginDiv.style.display = "none";
        detailsDiv.style.display = "flex";
    } else {
        loginError.style.display = "block";
    }
    
}

function logOutUser() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    showHome();
}


async function UpLoadNotes() {
    const userId = localStorage.getItem("userId");
    const notesString = JSON.stringify(notesArray);

    const APIUrl = `https://tatbeqak.site/apps/tatbeqey/apps/easynotes/addnote?id=${userId}&notes=${notesString}`;

    const respones = await fetch(APIUrl);

    const data = respones.json();

    const status = data.status;

    if (status == true) {
        alert("notes Uploaded successfully")
    } else {
        alert("notes Upload failed!")
    }
    
}

async function downLoadNotes() {
    const userId = localStorage.getItem("userId");

    const APIUrl = `https://tatbeqak.site/apps/tatbeqey/apps/easynotes/getnotes?id=${userId}`;

    const response = await fetch(APIUrl);

    const data = response.json();

    const status = data.status;

    if (status == true) {
        const notesString = data.notes;
        notesArray = JSON.parse(notesString);
        detailsDiv.style.display = "none"
        saveNotes();
        alert("notes downloaded successfully");
    } else {
        alert("notes download failed!");
    }
}