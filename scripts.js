let adminLoggedIn = false;
const username = "admin";
const password = "12345";

// التحقق من تسجيل الدخول كأدمن
function loginAdmin() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    if (enteredUsername === username && enteredPassword === password) {
        adminLoggedIn = true;
        document.getElementById('admin-controls').style.display = 'block';
        document.getElementById('admin-login-form').style.display = 'none';
    } else {
        alert('اسم المستخدم أو كلمة السر غير صحيحة');
    }
}

// رفع المشروع وتخزينه في localStorage
function uploadProject() {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لرفع مشروع');
        return;
    }

    const projectFile = document.getElementById('project-file').files[0];
    const thumbnailFile = document.getElementById('thumbnail-file').files[0];

    if (!projectFile || !thumbnailFile) {
        alert('يرجى اختيار ملفات المشروع والصورة المصغرة');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const projectData = {
            name: projectFile.name,
            thumbnail: URL.createObjectURL(thumbnailFile),
            projectUrl: URL.createObjectURL(projectFile)
        };
        addProjectToGallery(projectData);
        saveProject(projectData);
    };
    reader.readAsDataURL(projectFile);
}

// إضافة المشروع إلى المعرض
function addProjectToGallery(project) {
    const gallery = document.getElementById('projects-gallery');
    const projectElement = document.createElement('div');
    projectElement.className = 'project-thumbnail';
    projectElement.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.name}">
        <a href="${project.projectUrl}" download="${project.name}">تحميل المشروع</a>
        <button onclick="deleteProject(this, '${project.name}')">حذف المشروع</button>
    `;
    gallery.appendChild(projectElement);
}

// حذف جميع المشاريع من المعرض والتخزين المحلي
function deleteProjects() {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لحذف المشاريع');
        return;
    }
    localStorage.removeItem('projects');
    document.getElementById('projects-gallery').innerHTML = '';
}

// حذف مشروع معين من المعرض والتخزين المحلي
function deleteProject(button, projectName) {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لحذف المشاريع');
        return;
    }
    const projectElement = button.parentElement;
    projectElement.remove();
    removeProjectFromStorage(projectName);
}

// حفظ المشروع في التخزين المحلي
function saveProject(project) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
}

// إزالة المشروع من التخزين المحلي
function removeProjectFromStorage(projectName) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(project => project.name !== projectName);
    localStorage.setItem('projects', JSON.stringify(projects));
}

// استرجاع المشاريع من التخزين المحلي عند تحميل الصفحة
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.forEach(project => addProjectToGallery(project));
}

// تحميل المشاريع عند تحميل الصفحة
window.onload = loadProjects;
