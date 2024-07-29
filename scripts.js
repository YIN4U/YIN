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
    { name: "تطبيق 1", thumbnail: "Img/A1.jpg", appUrl: "App/A1.zip" },
    { name: "تطبيق 2", thumbnail: "Img/A2.jpg", appUrl: "App/A2.zip" },
    { name: "تطبيق 3", thumbnail: "Img/A3.jpg", appUrl: "App/A3.zip" },
    { name: "تطبيق 4", thumbnail: "Img/A4.jpg", appUrl: "App/A4.zip" },
    { name: "تطبيق 5", thumbnail: "Img/A5.jpg", appUrl: "App/A5.zip" },
    // أضف المزيد من التطبيقات هنا كما تريد
];

// تعريف الأخبار الثابتة
const news = [
    { title: "خبر 1", thumbnail: "Img/N1.jpg", description: "وصف الخبر 1" },
    { title: "خبر 2", thumbnail: "Img/N2.jpg", description: "وصف الخبر 2" },
    { title: "خبر 3", thumbnail: "Img/N3.jpg", description: "وصف الخبر 3" },
    // أضف المزيد من الأخبار هنا كما تريد
];

document.addEventListener('DOMContentLoaded', () => {
    if (adminLoggedIn) {
        document.getElementById('loginForm').style.display = 'none';
        renderProjects();
        renderApps();
        renderNews();
    }

    const stars = document.querySelectorAll('.star-rating .fa-star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            setRating(rating, star.parentElement);
        });

        star.addEventListener('mouseover', () => {
            const rating = star.getAttribute('data-value');
            highlightStars(rating, star.parentElement);
        });

        star.addEventListener('mouseout', () => {
            resetStars(star.parentElement);
        });
    });
});

function login() {
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    if (inputUsername === username && inputPassword === password) {
        adminLoggedIn = true;
        document.getElementById('loginForm').style.display = 'none';
        renderProjects();
        renderApps();
        renderNews();
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
}

function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const projectImage = document.createElement('img');
        projectImage.src = project.thumbnail;
        projectImage.alt = project.name;

        const projectTitle = document.createElement('h2');
        projectTitle.innerText = project.name;

        const projectLink = document.createElement('a');
        projectLink.href = project.projectUrl;
        projectLink.innerText = 'تحميل المشروع';
        projectLink.classList.add('download-link');

        const starRatingDiv = document.createElement('div');
        starRatingDiv.classList.add('star-rating');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fa', 'fa-star');
            star.setAttribute('data-value', i);
            starRatingDiv.appendChild(star);
        }

        projectDiv.appendChild(projectImage);
        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectLink);
        projectDiv.appendChild(starRatingDiv);
        projectsContainer.appendChild(projectDiv);
    });
}

function renderApps() {
    const appsContainer = document.getElementById('appsContainer');
    appsContainer.innerHTML = '';

    apps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('app');

        const appImage = document.createElement('img');
        appImage.src = app.thumbnail;
        appImage.alt = app.name;

        const appTitle = document.createElement('h2');
        appTitle.innerText = app.name;

        const appLink = document.createElement('a');
        appLink.href = app.appUrl;
        appLink.innerText = 'تحميل التطبيق';
        appLink.classList.add('download-link');

        const starRatingDiv = document.createElement('div');
        starRatingDiv.classList.add('star-rating');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fa', 'fa-star');
            star.setAttribute('data-value', i);
            starRatingDiv.appendChild(star);
        }

        appDiv.appendChild(appImage);
        appDiv.appendChild(appTitle);
        appDiv.appendChild(appLink);
        appDiv.appendChild(starRatingDiv);
        appsContainer.appendChild(appDiv);
    });
}

function renderNews() {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    news.forEach(item => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news');

        const newsImage = document.createElement('img');
        newsImage.src = item.thumbnail;
        newsImage.alt = item.title;

        const newsTitle = document.createElement('h2');
        newsTitle.innerText = item.title;

        const newsDescription = document.createElement('p');
        newsDescription.innerText = item.description;

        newsDiv.appendChild(newsImage);
        newsDiv.appendChild(newsTitle);
        newsDiv.appendChild(newsDescription);
        newsContainer.appendChild(newsDiv);
    });
}

function setRating(rating, parentElement) {
    const stars = parentElement.querySelectorAll('.fa-star');
    stars.forEach(star => {
        star.classList.remove('selected');
    });
    for (let i = 0; i < rating; i++) {
        stars[i].classList.add('selected');
    }
    saveRating(rating, parentElement);
}

function highlightStars(rating, parentElement) {
    const stars = parentElement.querySelectorAll('.fa-star');
    stars.forEach(star => {
        star.classList.remove('highlight');
    });
    for (let i = 0; i < rating; i++) {
        stars[i].classList.add('highlight');
    }
}

function resetStars(parentElement) {
    const stars = parentElement.querySelectorAll('.fa-star');
    stars.forEach(star => {
        star.classList.remove('highlight');
    });
}

function saveRating(rating, parentElement) {
    const itemName = parentElement.closest('.project, .app').querySelector('h2').innerText;
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    ratings[itemName] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));
}
