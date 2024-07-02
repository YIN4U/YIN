document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const projectInput = document.getElementById('projectInput');
    const thumbnailInput = document.getElementById('thumbnailInput');

    if (projectInput.files.length === 0 || thumbnailInput.files.length === 0) {
        alert('Please select both a project file and a thumbnail image.');
        return;
    }

    const projectFile = projectInput.files[0];
    const thumbnailFile = thumbnailInput.files[0];

    const projectReader = new FileReader();
    const thumbnailReader = new FileReader();

    projectReader.onload = function(e) {
        const projectFileUrl = e.target.result;

        thumbnailReader.onload = function(e) {
            const thumbnailUrl = e.target.result;

            const project = {
                id: Date.now(),
                file: projectFileUrl,
                thumbnail: thumbnailUrl,
                filename: projectFile.name
            };

            addProject(project);
        };

        thumbnailReader.readAsDataURL(thumbnailFile);
    };

    projectReader.readAsDataURL(projectFile);
});

function addProject(project) {
    const projectContainer = document.createElement('div');
    projectContainer.className = 'project';
    projectContainer.dataset.id = project.id;

    projectContainer.innerHTML = `
        <img src="${project.thumbnail}" alt="Thumbnail">
        <p>${project.filename}</p>
        <a href="${project.file}" download="${project.filename}">Download</a>
        <button onclick="deleteProject(${project.id})">Delete</button>
    `;

    document.getElementById('projects').appendChild(projectContainer);
}

function deleteProject(id) {
    const projectElement = document.querySelector(`.project[data-id="${id}"]`);
    if (projectElement) {
        projectElement.remove();
    }
}
