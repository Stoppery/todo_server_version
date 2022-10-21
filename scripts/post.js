document.addEventListener('DOMContentLoaded', () => {
    let localStorage = window.localStorage.getItem('page');
    console.log(localStorage);

    async function getPostInfo(postId) {
        const response = await fetch("https://gorest.co.in/public-api/posts/" + postId);
        const post = await response.json();

        return post;
    }

    async function getCommentsInfo(page) {
        const response = await fetch("https://gorest.co.in/public-api/comments?post_id=" + page);
        const comments = await response.json();

        return comments;
    }

    function returnBack() {
        const linkBack = document.getElementsByClassName('link-back')[0];
        if (localStorage != 'null') {
            linkBack.href += '?page=' + localStorage;
        }
    }

    async function createPostPage() {
        const pageParams = new URLSearchParams(window.location.search);
        let postInfo = await getPostInfo(pageParams.get('post_id'));
        let commentsInfo = await getCommentsInfo(pageParams.get('post_id'));

        const container = document.getElementsByClassName('container')[0];
        const postCard = document.createElement('div');
        const postCardBody = document.createElement('div');
        const postCardTitle = document.createElement('h3');
        const postCardText = document.createElement('p');

        postCard.classList.add('card', 'white-bg');
        postCardBody.classList.add('card-body');
        postCardTitle.classList.add('card-title');
        postCardText.classList.add('card-text', 'red-line');

        postCardTitle.textContent = postInfo.data.title;
        postCardText.textContent = postInfo.data.body;

        container.append(postCard);
        postCard.append(postCardBody);
        postCardBody.append(postCardTitle, postCardText);

        if (commentsInfo.data.length) {
            const postCardComments = document.createElement('div');
            const postCardCommentsTitile = document.createElement('h4');

            postCardCommentsTitile.innerText = 'Комментарии:';
            postCardComments.classList.add('comments');
            postCard.append(postCardComments);
            postCardComments.append(postCardCommentsTitile);

            for (let i = 0; i < commentsInfo.data.length; i++) {
                const commentContent = document.createElement('div');
                const commentAuthor = document.createElement('h5');
                const commentText = document.createElement('p');

                commentAuthor.style.margin = '10px 0 0';
                commentText.style.margin = '10px';

                commentAuthor.innerText = commentsInfo.data[i].name;
                commentText.innerText = commentsInfo.data[i].body;

                if (i != commentsInfo.data.length - 1) {
                    commentContent.style.borderBottom = '1px solid grey';
                    commentContent.style.padding = '10px 0';
                }
                postCardComments.append(commentContent);
                commentContent.append(commentAuthor, commentText);
            }
        }

        console.log(postInfo);
        console.log(commentsInfo);


    }



    returnBack();
    createPostPage();
});