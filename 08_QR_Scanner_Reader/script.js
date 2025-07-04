const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("QRimage");
const qrText = document.getElementById("QRtext");
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileElem");
const preview = document.getElementById("preview");

function generateQR() {
    const data = qrText.value.trim();

    if (data.length > 0) {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(data);
        imgBox.classList.add("show-img");
    } else {
        qrImage.src = "";
        imgBox.classList.remove("show-img");
        alert("Please enter text or URL to generate a QR code.");
    }
}

// Drag & drop events
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handlefiles(files);
    }
});

// QR decode
function handlefiles(files) {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imgDataUrl = e.target.result;

            preview.innerHTML = `<img src="${imgDataUrl}" alt="QR preview" style="max-width:100%; margin-top: 20px;">`;

            const formData = new FormData();
            formData.append("file", file);

            fetch("https://api.qrserver.com/v1/read-qr-code/", {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    const qrData = data[0]?.symbol[0]?.data;
                    if (qrData) {
                        const output = document.createElement("p");
                        output.textContent = `Scanned QR Code: ${qrData}`;
                        output.style.marginTop = "15px";
                        output.style.color = "#00ff99";
                        output.style.fontWeight = "bold";
                        preview.appendChild(output);
                    } else {
                        preview.innerHTML += "<p style='color:red;'>Could not read QR Code</p>";
                    }
                })
                .catch((err) => {
                    console.error("Error decoding QR:", err);
                    preview.innerHTML += "<p style='color:red;'>Error decoding QR Code</p>";
                });
        };

        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = "<p style='color:red;'>Please upload a valid image file</p>";
    }
}
