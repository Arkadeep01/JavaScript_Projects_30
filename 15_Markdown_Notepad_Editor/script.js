const createBtn = document.getElementById("createNoteBtn");
const editorSection = document.getElementById("editorSection");
const saveNoteButton = document.getElementById("saveNote");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");

createBtn.addEventListener("click", () => {
  editorSection.style.display = "block";
  noteInput.focus();
});

// Save Notes
saveNoteButton.addEventListener("click", function () {
  let noteText = noteInput.value.trim();
  if (noteText === "") return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(noteText);
  localStorage.setItem("notes", JSON.stringify(notes));

  noteInput.value = "";
  editorSection.style.display = "none";
  showNotes();
});

// Display Notes
function showNotes() {
  notesContainer.innerHTML = "";
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    let notediv = document.createElement("div");
    notediv.className = "col-md-4 mb-3";
    notediv.innerHTML = `
      <div class="note p-3">
        <p>${note}</p>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>`;
    notesContainer.appendChild(notediv);
  });
}

// Delete Notes
function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

document.addEventListener("DOMContentLoaded", showNotes);
