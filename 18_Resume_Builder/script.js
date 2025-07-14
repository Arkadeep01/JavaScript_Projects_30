// Dark Theme Toggler JS
const themeToggler = document.querySelector('.theme-toggler');
const body = document.body;
const iconSpans = themeToggler.querySelectorAll('span');

themeToggler.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    iconSpans.forEach(span => span.classList.toggle('active'));
});

// Toggle Skills Section On Checked
function toggleSkillsSection(checkbox) {
    const skillsDiv = document.getElementById("skillsSection");
    if (checkbox.checked) {
        skillsDiv.classList.remove("d-none");
    } else {
        skillsDiv.classList.add("d-none");
    }
}

// Toggle Certifications Section
document.getElementById("certifications").addEventListener("change", function () {
    document.getElementById("certificationSection").classList.toggle("d-none", !this.checked);
});

// Toggle Projects Section
document.getElementById("projects").addEventListener("change", function () {
    document.getElementById("ProjectsSection").classList.toggle("d-none", !this.checked);
});

// Toggle Publications Section
document.getElementById("publications").addEventListener("change", function () {
    document.getElementById("publicationsSection").classList.toggle("d-none", !this.checked);
});


// Display Language Proficiency
function getStars(level) {
    const stars = {
        5: '🌟🌟🌟🌟🌟',
        4: '🌟🌟🌟🌟',
        3: '🌟🌟🌟',
        2: '🌟🌟',
        1: '🌟'
    };
    return stars[level] || '';
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('save-btn') || e.target.closest('.save-btn')) {
        const row = e.target.closest('.language-row');
        const lang = row.querySelector('.language-input').value.trim();
        const prof = row.querySelector('.proficiency-select');
        const level = prof.value;
        const label = prof.options[prof.selectedIndex]?.text;

        if (!lang || !level) {
            alert('Please fill both language and proficiency.');
            return;
        }

        const display = document.getElementById('languageList');
        const item = document.createElement('li');
        item.className = 'list-group-item d-block justify-content-between align-items-center col-md-3';
        item.innerHTML = `
        <strong>${lang}</strong>
        <span class="text-warning">${getStars(level)} <small class="text-muted ms-2">(${label})</small></span>
      `;
        display.appendChild(item);

        row.querySelector('.language-input').value = '';
        prof.selectedIndex = 0;
    }
});

function addLanguageRow() {
    const container = document.getElementById('languagesContainer');
    const firstRow = container.querySelector('.language-row');
    const clone = firstRow.cloneNode(true);
    clone.querySelector('.language-input').value = '';
    clone.querySelector('.proficiency-select').selectedIndex = 0;
    container.appendChild(clone);
}

function openModal(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();

    const loader = document.querySelector(`#${modalId} .modal-body > div:first-child`);
    const options = document.querySelector(`#${modalId} .modal-body > div:nth-child(2)`);

    loader.classList.remove('d-none');
    options.classList.add('d-none');

    setTimeout(() => {
      loader.classList.add('d-none');
      options.classList.remove('d-none');
    }, 1500);
  }

  function downloadResume(type) {
    alert(`Starting download as ${type.toUpperCase()}`);
    bootstrap.Modal.getInstance(document.getElementById("downloadModal")).hide();
  }

  function shareVia(method) {
    if (method === 'copy') {
      navigator.clipboard.writeText("https://your-resume-link.com");
      alert("Link copied to clipboard!");
    } else {
      alert(`Sharing via ${method}`);
    }
    bootstrap.Modal.getInstance(document.getElementById("shareModal")).hide();
  }