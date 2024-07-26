let adminLoggedIn = false;
const username = "admin";
const password = "12345";

// تعريف المشاريع الثابتة ومساراتها
const projects = [
    { name: "مشروع 1", thumbnail: "Img/L1.jpg", projectUrl: "Project/L1.zip" },
    { name: "مشروع 2", thumbnail: "Img/L2.jpg", projectUrl: "Project/L2.zip" },
    { name: "مشروع 3", thumbnail: "Img/L3.jpg", projectUrl: "Project/L3.zip" },
    { name: "مشروع 4", thumbnail: "Img/L4.jpg", projectUrl: "Project/L4.zip" },
    { name: "مشروع 5", thumbnail: "Img/L5.jpg", projectUrl: "Project/L5.zip" },
    { name: "مشروع 6", thumbnail: "Img/L6.jpg", projectUrl: "Project/L6.zip" },
    { name: "مشروع 7", thumbnail: "Img/L7.jpg", projectUrl: "Project/L7.zip" },
    { name: "مشروع 8", thumbnail: "Img/L8.jpg", projectUrl: "Project/L8.zip" },
    { name: "مشروع 9", thumbnail: "Img/L9.jpg", projectUrl: "Project/L9.zip" },
    // أضف المزيد من المشاريع هنا كما تريد
];

// تعريف التطبيقات الثابتة ومساراتها
const apps = [
    { name: "Pixellab", thumbnail: "A2.jpg", appUrl: "Apps/A2.zip" },
    { name: "PS tuch", thumbnail: "A3.jpg", appUrl: "Apps/A3.zip" },
    // أضف المزيد من التطبيقات هنا كما تريد
];

// تعريف الأخبار الثابتة
const news = [
    { title: "الموقع قيد التطوير...", content: "", media: "" },
    { title: "مشاريع تصميم بكسلاب", content: "", media: "" },
    { title: "فيديو شرح للموقع قريبا...", content: "", media: "" },
    // أضف المزيد من الأخبار هنا كما تريد
];

// تعريف الإعلانات الثابتة
const ads = [
    { title: "لا توجد اعلانات حاليا", content: "", media: "" },
    { title: "", content: "", media: "" },
    { title: "", content: "", media: "" },
    // أضف المزيد من الإعلانات هنا كما تريد
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

// إضافة التطبيق إلى المعرض
function addAppToGallery(app) {
    const gallery = document.getElementById('apps-gallery');
    const appElement = document.createElement('div');
    appElement.className = 'project-thumbnail';
    appElement.innerHTML = `
        <img src="${app.thumbnail}" alt="${app.name}">
        <a href="${app.appUrl}" download="${app.name}">تحميل التطبيق</a>
        <button onclick="deleteApp(this, '${app.name}')">حذف التطبيق</button>
    `;
    gallery.appendChild(appElement);
}

// إضافة الخبر إلى المعرض
function addNewsToGallery(newsItem) {
    const gallery = document.getElementById('news-gallery');
    const newsElement = document.createElement('div');
    newsElement.className = 'news-item';
    newsElement.innerHTML = `
        <h3>${newsItem.title}</h3>
        <p>${newsItem.content}</p>
        ${newsItem.media.endsWith('.mp4') ? `<video controls src="${newsItem.media}"></video>` : `<img src="${newsItem.media}" alt="${newsItem.title}">`}
    `;
    gallery.appendChild(newsElement);
}

// إضافة الإعلان إلى المعرض
function addAdToGallery(adItem) {
    const gallery = document.getElementById('ads-gallery');
    const adElement = document.createElement('div');
    adElement.className = 'ad-item';
    adElement.innerHTML = `
        <h3>${adItem.title}</h3>
        <p>${adItem.content}</p>
        ${adItem.media.endsWith('.mp4') ? `<video controls src="${adItem.media}"></video>` : `<img src="${adItem.media}" alt="${adItem.title}">`}
    `;
    gallery.appendChild(adElement);
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

// حذف جميع التطبيقات من المعرض
function deleteApps() {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لحذف التطبيقات');
        return;
    }
    const gallery = document.getElementById('apps-gallery');
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

// حذف تطبيق معين من المعرض
function deleteApp(button, appName) {
    if (!adminLoggedIn) {
        alert('يجب تسجيل الدخول كأدمن لحذف التطبيقات');
        return;
    }
    const appElement = button.parentElement;
    appElement.remove();
}

// إظهار الأقسام المختلفة
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// استرجاع المشاريع عند تحميل الصفحة
function loadProjects() {
    projects.forEach(project => addProjectToGallery(project));
}

// استرجاع التطبيقات عند تحميل الصفحة
function loadApps() {
    apps.forEach(app => addAppToGallery(app));
}

// استرجاع الأخبار عند تحميل الصفحة
function loadNews() {
    news.forEach(newsItem => addNewsToGallery(newsItem));
}

// استرجاع الإعلانات عند تحميل الصفحة
function loadAds() {
    ads.forEach(adItem => addAdToGallery(adItem));
}

// تحميل المحتوى عند تحميل الصفحة
window.onload = () => {
    loadProjects();
    loadApps();
    loadNews();
    loadAds();
};
