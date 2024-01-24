const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");

function addNote () {
    const noteObject = {
        Id: generateId(),
        content: noteInput.value,
        fixed: false,
    };

   const noteElement = createNote(noteObject.Id, noteObject.content);

   notesContainer.appendChild(noteElement);
}

function generateId() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content) {

    const element = document.createElement("div")

    element.classList.add("note")

    const textarea = document.createElement("textarea")

    textarea.value = content

    textarea.placeholder = "Adicione algum texto"

    element.appendChild(textarea)

    return element;

}


addNoteBtn.addEventListener("click", () => addNote())