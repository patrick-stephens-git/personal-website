document.addEventListener('DOMContentLoaded', function() {
  
    // create <div></div> element
    const feedbackRequest = document.createElement('div');
    feedbackRequest.className = 'global-feedback-request';
  
    // create header
    const h2 = document.createElement('h2');
    h2.textContent = 'What are your thoughts on this topic?';

    // create <p> element
    const paragraph = document.createElement('p');

    // create string
    const beforeText = document.createTextNode("There is often never one way to accomplish a goal. I'm always looking to see a different perspective and learn something new. ");
    const afterText = document.createTextNode(" to let me know your thoughts about this topic.");
  
    // create contact link
    const contactLink = document.createElement('a');
    contactLink.href = 'mailto:patrickcstephens@me.com?subject=Thoughts%20about%20a%20topic%20on%20patrickcstephens.com';
    contactLink.textContent = 'Contact me';

    // append text and links to <p> 
    paragraph.appendChild(beforeText);
    paragraph.appendChild(contactLink);
    paragraph.appendChild(afterText);

    // append elements to feedbackRequest
    feedbackRequest.appendChild(h2);
    feedbackRequest.appendChild(paragraph);
  
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