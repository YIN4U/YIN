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
