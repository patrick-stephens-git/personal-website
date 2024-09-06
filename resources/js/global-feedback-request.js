document.addEventListener('DOMContentLoaded', function() {
  
    // create <div></div> element
    const feedbackRequest = document.createElement('div');
    feedbackRequest.className = 'global-feedback-request';
  
    // create header
    const h2 = document.createElement('h2');
    h2.textContent = 'Do you agree? Do you disagree? Am I missing anything?';
    // create string
    const textNode = document.createTextNode("I'm always looking to learn something new. Contact me to let me know your thoughts about this topic, I'd love to hear your ideas.");
  
    // append string
    feedbackRequest.appendChild(h2);
    feedbackRequest.appendChild(textNode);
  
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