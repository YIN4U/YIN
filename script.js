const fs = require('fs');

let users = [];
let adminLoggedIn = false;
let currentUser = null;

// Load users from JSON file
fs.readFile('users.json', (err, data) => {
    if (err && err.code === 'ENOENT') {
        users = [];
    } else {
        users = JSON.parse(data);
    }
});

const projects = [
    { name: "مشروع 1", thumbnail: "Img/L1.jpg", projectUrl: "Project/L1.zip", rating: 0 },
    { name: "مشروع 2", thumbnail: "Img/L2.jpg", projectUrl: "Project/L2.zip", rating: 0 },
    { name: "مشروع 3", thumbnail: "Img/L3.jpg", projectUrl: "Project/L3.zip", rating: 0 },
    { name: "مشروع 4", thumbnail: "Img/L4.jpg", projectUrl: "Project/L4.zip", rating: 0 },
    { name: "مشروع 5", thumbnail: "Img/L5.jpg", projectUrl: "Project/L5.zip", rating: 0 },
    { name: "مشروع 6", thumbnail: "Img/L6.jpg", projectUrl: "Project/L6.zip", rating: 0 },
    { name: "مشروع 7", thumbnail: "Img/L7.jpg", projectUrl: "Project/L7.zip", rating: 0 },
    { name: "مشروع 8", thumbnail: "Img/L8.jpg", projectUrl: "Project/L8.zip", rating: 0 },
    { name: "مشروع 9", thumbnail: "Img/L9.jpg", projectUrl: "Project/L9.zip", rating: 0 },
];

const apps = [
    { name: "PicsArt", thumbnail: "A1.jpg", appUrl: "Apps/A1.zip", rating: 0 },
    { name: "Pixellab", thumbnail: "A2.jpg", appUrl: "Apps/A2.zip", rating: 0 },
    { name: "PS tuch", thumbnail: "A3.jpg", appUrl: "Apps/A3.zip", rating: 0 },
    { name: "تطبيق 4", thumbnail: "A4.jpg", appUrl: "Apps/A4.zip", rating: 0 },
];

function saveUsers() {
    fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) throw err;
    });
}

function saveRatings() {
    fs.writeFile('ratings.json', JSON.stringify({ projects, apps }), (err) => {
        if (err) throw err;
    });
}

function registerUser() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const user = { username, password };

    users.push(user);
    saveUsers();
    alert('تم إنشاء الحساب بنجاح');
}

function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        alert('تم تسجيل الدخول بنجاح');
        document.getElementById('user-section').style.display = 'none';
    } else {
        alert('اسم المستخدم أو كلمة السر غير صحيحة');
    }
}

function loginAdmin() {
    const enteredUsername = document.getElementById('admin-username').value;
    const enteredPassword = document.getElementById('admin-password').value;

    if (enteredUsername === "admin" && enteredPassword === "12345") {
        adminLoggedIn = true;
        document.getElementById('admin-controls').style.display = 'block';
        document.getElementById('admin-login-form').style.display = 'none';
    } else {
        alert('اسم المستخدم أو كلمة السر غير صحيحة');
    }
}

function addProjectToGallery(project) {
    const gallery = document.getElementById('projects-gallery');
    const projectElement = document.createElement('div');
    projectElement.className = 'project-thumbnail';
    projectElement.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.name}">
        <a href="${project.projectUrl}" download="${project.name}">تحميل المشروع</a>
        <button onclick="deleteProject(this, '${project.name}')">حذف المشروع</button>
        <div class="rating">
            <span class="star" data-value="5" onclick="rateProject('${project.name}', 5)">&#9733;</span>
            <span class="star" data-value="4" onclick="rateProject('${project.name}', 4)">&#9733;</span>
            <span class="star" data-value="3" onclick="rateProject('${project.name}', 3)">&#9733;</span>
            <span class="star" data-value="2" onclick="rateProject('${project.name}', 2)">&#9733;</span>
            <span class="star" data-value="1" onclick="rateProject('${project.name}', 1)">&#9733;</span>
        </div>
    `;
    gallery.appendChild(projectElement);
}

function addAppToGallery(app) {
    const gallery = document.getElementById('apps-gallery');
    const appElement = document.createElement('div');
    appElement.className = 'project-thumbnail';
    appElement.innerHTML = `
        <img src="${app.thumbnail}" alt="${app.name}">
        <a href="${app.appUrl}" download="${app.name}">تحميل التطبيق</a>
        <button onclick="deleteApp(this, '${app.name}')">حذف التطبيق</button>
        <div class="rating">
            <span class="star" data-value="5" onclick="rateApp('${app.name}', 5)">&#9733;</span>
            <span class="star" data-value="4" onclick="rateApp('${app.name}', 4)">&#9733;</span>
            <span class="star" data-value="3" onclick="rateApp('${app.name}', 3)">&#9733;</span>
            <span class="star" data-value="2" onclick="rateApp('${app.name}', 2)">&#9733;</span>
            <span class="star" data-value="1" onclick="rateApp('${app.name}', 1)">&#9733;</span>
        </div>
    `;
    gallery.appendChild(appElement);
}

function deleteProject(button, projectName) {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لحذف المشاريع');
        return;
    }
    const projectElement = button.parentElement;
    projectElement.remove();
}

function deleteApp(button, appName) {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لحذف التطبيقات');
        return;
    }
    const appElement = button.parentElement;
    appElement.remove();
}

function rateProject(projectName, rating) {
    const project = projects.find(p => p.name === projectName);
    if (project) {
        project.rating = rating;
        saveRatings();
        alert(`تم تقييم المشروع بـ ${rating} نجوم`);
    }
}

function rateApp(appName, rating) {
    const app = apps.find(a => a.name === appName);
    if (app) {
        app.rating = rating;
        saveRatings();
        alert(`تم تقييم التطبيق بـ ${rating} نجوم`);
    }
}

window.onload = () => {
    projects.forEach(project => addProjectToGallery(project));
    apps.forEach(app => addAppToGallery(app));
};
