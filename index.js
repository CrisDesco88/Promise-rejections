const authorName = document.getElementById('author-name');
const bodyEl = document.body;
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data.user.name)
        bodyEl.style.backgroundImage = `url(${data.urls.regular})`;
        authorName.innerText = `Photo: ${data.user.name}`
    });


