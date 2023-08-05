fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Use the JSON data here
    displayComments(data.comments, data.currentUser);
    console.log(data);
  })
  .catch(error => console.error('Error:', error));

  function displayComments(comments, currentUser) {
    // sort comments by time
    const sortedComments = comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  
    const commentsDiv = document.querySelector('.comments');
    let replyElements = {}; // Object to store reply elements for each comment
  
    sortedComments.forEach(comment => {
      // create a container div for each comment
      const commentContainer = document.createElement('div');
      commentContainer.classList.add('comment-container');
  
      const replyButton = document.createElement('button');
      replyButton.classList.add('reply-button');
      replyButton.textContent = 'Reply';

  
      replyButton.addEventListener('click', () => {
        if (!replyElements[comment.id]) {
          const replySection = document.createElement('div');
          replySection.classList.add('reply-section');
  
          const replyTextarea = document.createElement('textarea');
          replyTextarea.classList.add('reply-textarea');
          replyTextarea.placeholder = 'Reply...';
          replyTextarea.rows= 5;
          replyTextarea.cols=60;
  
          const sendButton = document.createElement('button');
          sendButton.textContent = 'SEND';
          sendButton.classList.add('send-button');
  
          sendButton.addEventListener('click', () => {
            const replyTextContent = replyTextarea.value.trim();
            if (replyTextContent !== '') {
              const newReply = {
                user: currentUser,
                createdAt: new Date().toISOString(),
                content: replyTextContent,
                score: 0,
                replies: []
              };
              comment.replies.push(newReply);
              console.log(newReply);
  
              const replyContainer = document.createElement('div');
              replyContainer.classList.add('reply-container');
  
              const repliesContainer = document.createElement('div');
              repliesContainer.classList.add('replies-container');
  
              const replyContentElement = document.createElement('p');
              replyContentElement.textContent = replyTextContent;
              replyContentElement.classList.add('reply-content');
  
              replyContainer.appendChild(replyContentElement);
              repliesContainer.appendChild(replyContainer);
  
              replyTextarea.value = '';
            }
          });
  
          replySection.appendChild(replyTextarea);
          replySection.appendChild(sendButton);
          commentContainer.appendChild(replySection);
  
          replyElements[comment.id] = replySection; // Store the reply section for this comment
        } else {
          // Toggle the visibility of the reply section on each click
          replyElements[comment.id].style.display = replyElements[comment.id].style.display === 'none' ? 'block' : 'none';
        }
      });

    // users' avatars
    const avatarImage = document.createElement('img');
    avatarImage.classList.add('avatar-image');
    avatarImage.src = comment.user.image.png || comment.user.image.webp;

    commentContainer.appendChild(avatarImage);

    // score container (upvotes/downvotes)
    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-container');

    // upvote/downvote buttons
    const upvoteButton = document.createElement('button');
    upvoteButton.textContent = '+';
    upvoteButton.classList.add('upvote-button');
    upvoteButton.addEventListener('click', () => {
      comment.score++;
      scoreDisplay.textContent = `${comment.score}`;
    });

    const downvoteButton = document.createElement('button');
    downvoteButton.textContent = '-';
    downvoteButton.classList.add('downvote-button');
    downvoteButton.addEventListener('click', () => {
      comment.score--;
      scoreDisplay.textContent = `${comment.score}`;
    });

    // display score
    const scoreDisplay = document.createElement('span');
    scoreDisplay.classList.add('score-text');
    scoreDisplay.textContent = `${comment.score}`;

    scoreContainer.appendChild(upvoteButton);
    scoreContainer.appendChild(scoreDisplay);
    scoreContainer.appendChild(downvoteButton);

    commentContainer.appendChild(scoreContainer);

    // usernames display
    const userNames = document.createElement('p');
    userNames.textContent = `${comment.user.username}`;
    userNames.classList.add('user-names');
    commentContainer.appendChild(userNames);

    // time of comment
    const commentTime = document.createElement('p');
    commentTime.textContent = comment.createdAt;
    commentTime.classList.add('comment-time');
    commentContainer.appendChild(commentTime);

    commentContainer.appendChild(replyButton);

    // paragraph for each comment
    const commentContent = document.createElement('p');
    commentContent.textContent = comment.content;
    commentContent.classList.add('user-comment');
    commentContainer.appendChild(commentContent);

    commentsDiv.appendChild(commentContainer);

    // replies within comments
    if (comment.replies.length > 0) {
      // sort replies by time
      const sortedReplies = comment.replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const repliesContainer = document.createElement('div');
      repliesContainer.classList.add('replies-container');

      sortedReplies.forEach(reply => {
        const replyContainer = document.createElement('div');
        replyContainer.classList.add('reply-container');

        const avatarReplyImage = document.createElement('img');
        avatarReplyImage.classList.add('avatar-image');
        avatarReplyImage.src = reply.user.image.png || reply.user.image.webp;

        replyContainer.appendChild(avatarReplyImage);

        // score container for replies
        const replyScoreContainer = document.createElement('div');
        replyScoreContainer.classList.add('score-container');

        const upvoteReplyButton = document.createElement('button');
        upvoteReplyButton.textContent = '+';
        upvoteReplyButton.classList.add('upvote-button');
        upvoteReplyButton.addEventListener('click', () => {
          reply.score++;
          replyScoreDisplay.textContent = `${reply.score}`;
        });

        const downvoteReplyButton = document.createElement('button');
        downvoteReplyButton.textContent = '-';
        downvoteReplyButton.classList.add('downvote-button');
        downvoteReplyButton.addEventListener('click', () => {
          reply.score--;
          replyScoreDisplay.textContent = `${reply.score}`;
        });

        const replyScoreDisplay = document.createElement('span');
        replyScoreDisplay.textContent = `${reply.score}`;
        replyScoreDisplay.classList.add('score-text');

        replyScoreContainer.appendChild(upvoteReplyButton);
        replyScoreContainer.appendChild(replyScoreDisplay);
        replyScoreContainer.appendChild(downvoteReplyButton);

        replyContainer.appendChild(replyScoreContainer);

        // usernames of the reply comments
        const replyUsers = document.createElement('p');
        replyUsers.textContent = `${reply.user.username}`;
        replyUsers.classList.add('reply-usernames');
        replyContainer.appendChild(replyUsers);

        const replyTime = document.createElement('p');
        replyTime.textContent = `${reply.createdAt}`;
        replyTime.classList.add('reply-time');
        replyContainer.appendChild(replyTime);

        // content of replies
        const replyContent = document.createElement('p');
        replyContent.textContent = `${reply.content}`;
        replyContent.classList.add('reply-content');
        replyContainer.appendChild(replyContent);

        repliesContainer.appendChild(replyContainer);
      });

      commentsDiv.appendChild(repliesContainer);
    }
  });
}
