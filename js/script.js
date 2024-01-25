const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");

function showNotes() {
    cleanNotes();

    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed);

        notesContainer.appendChild(noteElement);
    });
}

function cleanNotes() {
    notesContainer.replaceChildren([])
}

function addNote () {

    const notes = getNotes();

    const noteObject = {
        Id: generateId(),
        content: noteInput.value,
        fixed: false,
    };

   const noteElement = createNote(noteObject.Id, noteObject.content);

   notesContainer.appendChild(noteElement);

   notes.push(noteObject);

   saveNotes(notes);
   
   noteInput.value = "";
}

function generateId() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {

    const element = document.createElement("div")

    element.classList.add("note")

    const textarea = document.createElement("textarea")

    textarea.value = content;

    textarea.placeholder = "Adicione algum texto"

    element.appendChild(textarea)

    const pinIcon = document.createElement("i")

    pinIcon.classList.add(...["bi", "bi-pin"])

    element.appendChild(pinIcon);

    element.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id);
    })
    const deleteIcon= document.createElement("i")

    pinIcon.classList.add(...["bi", "bi-x-lg"])

    element.appendChild(deleteIcon);

    element.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id);
    })
    const duplicateIcon = document.createElement("i")

    pinIcon.classList.add(...["bi", "bi-file-earmark-plus"])

    element.appendChild(duplicateIcon);

    element.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id);
    })

    
    if(fixed) {
        element.classList.add("fixed");
        }

}

function toggleFixNote (id) {
    const notes = getNotes()

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);
    showNotes();
}

function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]")

  const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

    return orderedNotes;
}

function saveNotes (notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

addNoteBtn.addEventListener("click", () => addNote())

showNotes();