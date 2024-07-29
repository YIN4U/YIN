let adminLoggedIn = false;
const username = "admin";
const password = "12345";
let users = JSON.parse(localStorage.getItem('users')) || [];
let comments = JSON.parse(localStorage.getItem('comments')) || {};

// تعريف مشروع نموذجي واحد فقط (يمكنك إضافة المزيد بنفس الطريقة)
const projects = [
    { name: "مشروع نموذجي", thumbnail: "Img/L1.jpg", projectUrl: "Project/L1.zip" }
];

// تعريف التطبيقات الثابتة (يمكنك إضافة المزيد حسب الحاجة)
const apps = [
    { name: "تطبيق 1", thumbnail: "Img/A1.jpg", appUrl: "App/A1.zip" },
];

// تعريف الأخبار الثابتة (يمكنك إضافة المزيد حسب الحاجة)
const news = [
    { title: "خبر 1", thumbnail: "Img/N1.jpg", description: "وصف الخبر 1" },
];

document.addEventListener('DOMContentLoaded', () => {
    // عرض القسم الافتراضي عند تحميل الصفحة
    showSection('projects');

    // تسجيل الدخول إذا كان المستخدم قد سجل الدخول مسبقاً
    const storedAdminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (storedAdminLoggedIn === 'true') {
        adminLoggedIn = true;
        document.getElementById('loginForm').style.display = 'none';
    }
    renderProjects();
    renderApps();
    renderNews();
    renderComments();
});

function showSection(section) {
    const sections = ['projects', 'apps', 'news', 'comments'];
    sections.forEach(sec => {
        document.getElementById(`${sec}Container`).style.display = sec === section ? 'block' : 'none';
    });
}

function login() {
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    if (inputUsername === username && inputPassword === password) {
        adminLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginForm').style.display = 'none';
        renderComments();
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

        const commentsDiv = document.createElement('div');
        commentsDiv.classList.add('comments');

        if (adminLoggedIn) {
            const commentForm = document.createElement('div');
            commentForm.classList.add('comment-form');
            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.placeholder = 'أضف تعليق...';
            const commentButton = document.createElement('button');
            commentButton.innerText = 'إرسال';
            commentButton.onclick = () => addComment(project.name, commentInput.value);
            commentForm.appendChild(commentInput);
            commentForm.appendChild(commentButton);

            commentsDiv.appendChild(commentForm);
        }

        const commentList = document.createElement('div');
        commentList.classList.add('comment-list');
        const projectComments = comments[project.name] || [];
        projectComments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerText = comment;
            commentList.appendChild(commentDiv);
        });

        commentsDiv.appendChild(commentList);

        projectDiv.appendChild(projectImage);
        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectLink);
        projectDiv.appendChild(starRatingDiv);
        projectDiv.appendChild(commentsDiv);
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

function renderComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';

    if (!adminLoggedIn) {
        commentsContainer.innerHTML = '<p>يجب تسجيل الدخول لعرض التعليقات.</p>';
        return;
    }

    projects.forEach(project => {
        const commentsDiv = document.createElement('div');
        commentsDiv.classList.add('comments');

        const commentForm = document.createElement('div');
        commentForm.classList.add('comment-form');
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'أضف تعليق...';
        const commentButton = document.createElement('button');
        commentButton.innerText = 'إرسال';
        commentButton.onclick = () => addComment(project.name, commentInput.value);
        commentForm.appendChild(commentInput);
        commentForm.appendChild(commentButton);

        commentsDiv.appendChild(commentForm);

        const commentList = document.createElement('div');
        commentList.classList.add('comment-list');
        const projectComments = comments[project.name] || [];
        projectComments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerText = comment;
            commentList.appendChild(commentDiv);
        });

        commentsDiv.appendChild(commentList);
        commentsContainer.appendChild(commentsDiv);
    });
}

function addComment(projectName, comment) {
    if (!comment.trim()) {
        alert('التعليق لا يمكن أن يكون فارغاً');
        return;
    }

    if (!comments[projectName]) {
        comments[projectName] = [];
    }

    comments[projectName].push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
    renderComments();
}

function setRating(rating, container) {
    const stars = container.querySelectorAll('.fa-star');
    stars.forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

function highlightStars(rating, container) {
    const stars = container.querySelectorAll('.fa-star');
    stars.forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= rating) {
            star.classList.add('hover');
        } else {
            star.classList.remove('hover');
        }
    });
}

function resetStars(container) {
    const stars = container.querySelectorAll('.fa-star');
    stars.forEach(star => {
        star.classList.remove('hover');
    });
}
