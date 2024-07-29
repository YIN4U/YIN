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

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const projectsContainer = document.getElementById('projectsContainer');
    
    if (adminLoggedIn) {
        loginForm.style.display = 'none';
        renderProjects();
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
            star.classList.add('fas', 'fa-star');
            star.setAttribute('data-value', i);
            starRatingDiv.appendChild(star);
        }

        projectDiv.appendChild(projectImage);
        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(starRatingDiv);
        projectDiv.appendChild(projectLink);

        projectsContainer.appendChild(projectDiv);
    });

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
}

function setRating(rating, parent) {
    const stars = parent.querySelectorAll('.fa-star');
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList
