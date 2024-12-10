document.addEventListener('DOMContentLoaded', function() {
  
    // create <div></div> element
    const feedbackRequest = document.createElement('div');
    feedbackRequest.className = 'global-feedback-request';
  
    // create header
    const h2 = document.createElement('h2');
    h2.textContent = 'What are your thoughts on this topic?';

    // create string
    // const textNode = document.createTextNode("There is often never one way to do something. I'm always looking to see a different perspective and learn something new. Contact me to let me know your thoughts about this topic.");
    const beforeText = document.createTextNode("There is often never one way to accomplish a goal. I'm always looking to see a different perspective and learn something new. ");
    const afterText = document.createTextNode(" to let me know your thoughts about this topic.");
  
    // create contact link
    const contactLink = document.createElement('a');
    contactLink.href = 'mailto:patrickcstephens@me.com';
    contactLink.textContent = 'Contact me';

    // append elements
    feedbackRequest.appendChild(h2);
    feedbackRequest.appendChild(beforeText);
    feedbackRequest.appendChild(contactLink);
    feedbackRequest.appendChild(afterText);
  
    // add <div> within the <div class="global-feedback-request-container"> element
    const container = document.getElementById('global-feedback-request-container');
    if (container) {
        container.appendChild(feedbackRequest);
    };
    if (container) {
        container.appendChild(feedbackRequest);
        console.log('Global feedback request added successfully');
    } else {
        console.log('Global feedback request not found');
    }
  });