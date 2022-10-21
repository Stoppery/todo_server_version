document.addEventListener('DOMContentLoaded', () => {
    async function getAllPosts(page = '') {
        const response = await fetch("https://gorest.co.in/public-api/posts" + page);
        const posts = await response.json();

        return posts;
    }

    async function fullFillContainer() {

        let localStorage = window.localStorage;
        let searchLocation = new URLSearchParams(window.location.search);
        const container = document.getElementsByClassName('container')[0];
        let serverData = (searchLocation.get('page') != null) ? await getAllPosts('?page=' + searchLocation.get('page')) : await getAllPosts();
        let posts = serverData.data;

        let amountOfPages = serverData.meta.pagination.pages;
        let currentPage = serverData.meta.pagination.page;

        const groupBtns = document.createElement('div');
        const dotsBtnStart = document.createElement('span');
        const dotsBtnFinish = document.createElement('span');
        const startBtn = document.createElement('button');
        const finishBtn = document.createElement('button');


        localStorage.clear();
        localStorage.setItem('page', searchLocation.get('page'));

        startBtn.classList.add('btn', 'btn-secondary');
        startBtn.id = 1;

        finishBtn.classList.add('btn', 'btn-secondary');
        finishBtn.id = amountOfPages;
        finishBtn.innerText = amountOfPages;

        startBtn.innerText = 1;

        dotsBtnStart.innerText = '...';
        dotsBtnFinish.innerText = '...';
        dotsBtnStart.classList.add('dots-start');
        dotsBtnFinish.classList.add('dots-finish');

        groupBtns.classList.add('btn-group', 'me-2');
        groupBtns.style.marginBottom = '15px';

        for (let i = 0; i < posts.length; i++) {
            const post = document.createElement('div');
            const headerPost = document.createElement('h5');
            const postBody = document.createElement('p');
            const linkMore = document.createElement('a');

            post.classList.add('card', 'mb-3', 'p-3');

            headerPost.classList.add('card-title', );
            headerPost.innerText = posts[i].title;

            postBody.classList.add('card-text', 'short-text');
            postBody.innerText = posts[i].body;

            linkMore.innerText = 'Подробнее...';
            linkMore.classList.add('card-link');
            linkMore.id = posts[i].id;

            linkMore.href = '../post.html' + '?post_id=' + posts[i].id;


            container.append(post);
            post.append(headerPost);
            post.append(postBody);
            post.append(linkMore);
        }

        container.append(groupBtns);

        if (currentPage > 4 && currentPage < amountOfPages - 2) {
            groupBtns.append(startBtn);
            groupBtns.append(dotsBtnStart);


            for (let j = currentPage - 2; j < currentPage + 3; j++) {
                const pageBtn = document.createElement('button');
                if (j == currentPage) {
                    pageBtn.classList.add('active');
                }
                pageBtn.classList.add('btn', 'btn-secondary');
                pageBtn.id = j;
                pageBtn.innerText = j;
                groupBtns.append(pageBtn);
            }
            groupBtns.append(dotsBtnFinish);
            groupBtns.append(finishBtn);
        } else if (currentPage <= 4) {
            for (let j = 1; j < 6; j++) {
                const pageBtn = document.createElement('button');
                if (j == currentPage) {
                    pageBtn.classList.add('active');
                }
                pageBtn.classList.add('btn', 'btn-secondary');
                pageBtn.id = j;
                pageBtn.innerText = j;
                groupBtns.append(pageBtn);
            }
            groupBtns.append(dotsBtnFinish);
            groupBtns.append(finishBtn);
        } else {
            groupBtns.append(startBtn);
            groupBtns.append(dotsBtnStart);
            for (let j = amountOfPages - 4; j <= amountOfPages; j++) {
                const pageBtn = document.createElement('button');
                if (j == currentPage) {
                    pageBtn.classList.add('active');
                }
                pageBtn.classList.add('btn', 'btn-secondary');
                pageBtn.id = j;
                pageBtn.innerText = j;
                groupBtns.append(pageBtn);
            }
        }

        if (amountOfPages > 5) {
            const inputForm = document.createElement('div');
            const inputPage = document.createElement('input');
            const subBtn = document.createElement('button');

            inputPage.placeholder = 'стр.';
            inputPage.type = 'number';
            inputPage.classList.add('form-control');
            inputPage.style.marginLeft = '8px';


            inputForm.classList.add('input-group');

            subBtn.innerText = 'Перейти';
            subBtn.classList.add('btn', 'btn-primary');

            groupBtns.append(inputForm);
            inputForm.append(inputPage);
            inputForm.append(subBtn);

            subBtn.addEventListener('click', () => {

                if (!inputPage.value || Number(inputPage.value) > amountOfPages || Number(inputPage.value) < 1) {
                    inputPage.classList.add('is-invalid');
                } else {
                    if (inputPage.value != '1') {
                        inputPage.classList.add('is-valid');
                        window.location.search = `?page=${Number(inputPage.value)}`;
                    } else {
                        window.location.href = window.location.href.split('?')[0];
                    }
                }
            });

        }

        return document.getElementsByClassName('btn-secondary');
    }



    async function pageButtons() {
        const pageBtns = await fullFillContainer();
        for (let i = 0; i < pageBtns.length; i++) {
            pageBtns[i].addEventListener('click', () => {
                if (pageBtns[i].id == 1) {
                    window.location.href = window.location.href.split('?')[0];
                } else {
                    window.location.search = `?page=${pageBtns[i].id}`;
                }
            });
        }
    }


    pageButtons();
});