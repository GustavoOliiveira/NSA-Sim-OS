// Example data
const files = [{
    name: "Coordination of Army-Navy COMINT",
    type: "JPEG",
    size: "2.4 MB",
    lastUpdated: "2025-01-01",
    preview: "/src/assets/image/doc1.png"
},
{
    name: "Correlation of Radio Intelligence",
    type: "JPEG",
    size: "1.2 MB",
    lastUpdated: "2025-01-03",
    preview: "/src/assets/image/doc2.png"
},
{
    name: "Cost Estimate for Discharging",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc3.png"
},
{
    name: "Armed Forces Security Agency",
    type: "PNG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc4.png"
},
{
    name: "Cryptographic Security",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc5.png"
},
{
    name: "Cryptologic Almanac",
    type: "PNG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc6.png"
},
{
    name: "Directive to Joint Army-Navy",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc7.png"
},
{
    name: "Directive: Armed Forces Security",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc8.png"
},
{
    name: "Cryptologic Almanac Soviet",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc9.jpg"
},
{
    name: " Communications of the Government",
    type: "JPG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc10.png"
},
{
    name: "Damage Assessment",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc11.jpg"
},
{
    name: "Operation Shadow Veil",
    type: "PNG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc12.jpg"
},
{
    name: "German soldiers 15-03-1942",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc13.jpg"
},
{
    name: "Omaha Beach",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc14.jpg"
},
{
    name: "Hans Müller",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc15.jpg"
},
{
    name: "Geheimbefehl 47",
    type: "JPEG",
    size: "3.5 MB",
    lastUpdated: "2025-01-05",
    preview: "/src/assets/image/doc16.jpg"
}

];

const tableBody = document.getElementById('file-table-body');

// Populate the table
files.forEach(file => {
const row = document.createElement('tr');

row.innerHTML = `
            <td><img src="${file.preview}" alt="${file.name}"></td>
            <td>${file.name}</td>
            <td>${file.type}</td>
            <td>${file.size}</td>
            <td>${file.lastUpdated}</td>
        `;

row.addEventListener('click', () => {
    const previewModal = document.getElementById('file-preview');
    const previewImg = document.getElementById('preview-img');
    previewImg.src = file.preview;
    previewModal.style.display = 'flex';
});

tableBody.appendChild(row);
});

// Close preview
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () => {
const previewModal = document.getElementById('file-preview');
previewModal.style.display = 'none';
});