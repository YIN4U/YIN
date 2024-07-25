let adminLoggedIn = false;
const username = "admin";
const password = "12345";

// تعريف المشاريع الثابتة ومساراتها
const projects = [
    {
        name: "مشروع 1",
        thumbnail: "L1.jpg",
        projectUrl: "Project/L1.zip"
    },
    {
        name: "مشروع 2",
        thumbnail: "L2.jpg",
        projectUrl: "Project/L2.zip"
    },
    {
        name: "مشروع 3",
        thumbnail: "L3.jpg",
        projectUrl: "Project/L3.zip"
    },
    {
        name: "مشروع 4",
        thumbnail: "L4.jpg",
        projectUrl: "Project/L4.zip"
    },
    // أضف المزيد من المشاريع هنا كما تريد
];

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

// حذف جميع المشاريع من المعرض
function deleteProjects() {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لحذف المشاريع');
        return;
    }
    const gallery = document.getElementById('projects-gallery');
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
}

// حذف مشروع معين من المعرض
function deleteProject(button, projectName) {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لحذف المشاريع');
        return;
    }
    const projectElement = button.parentElement;
    projectElement.remove();
}

// استرجاع المشاريع عند تحميل الصفحة
function loadProjects() {
    projects.forEach(project => addProjectToGallery(project));
}

// تحميل المشاريع عند تحميل الصفحة
window.onload = loadProjects;
