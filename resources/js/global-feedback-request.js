document.addEventListener('DOMContentLoaded', function() {
    function checkElementById(id, element) {
        const container = document.getElementById(id); // gets existing element from html with id="id"
        if (container) { // if container exists 
            container.appendChild(element); // append element to container
            console.log(`${id} added successfully`); // log: success
        } else { // if container does not exist
            console.log(`${id} not found`); // log: failure
        }
    }
  
    const feedbackRequest = document.createElement('div'); // create element: <div></div>
    feedbackRequest.className = 'global-feedback-request'; // add class: <div class="global-feedback-request"></div>
  
    const h2 = document.createElement('h2'); // create element: <h2></h2>
    h2.textContent = 'What are your thoughts on this topic?'; // textContent treats text as plain text

    const paragraph = document.createElement('p'); // create element: <p></p>

    const beforeContactText = document.createTextNode("There is often never one way to accomplish a goal. I'm always looking to see a different perspective and learn something new. ");
    const afterContactText = document.createTextNode(" to let me know your thoughts about this topic.");
    const contactLink = document.createElement('a'); // create element: <a></a>
    contactLink.href = 'mailto:patrickcstephens@me.com?subject=Thoughts%20about%20a%20topic%20on%20patrickcstephens.com'; // add attribute: <a mailto:...></a>
    contactLink.textContent = 'Contact me'; // add text: <a mailto:...>Contact me</a>

    paragraph.appendChild(beforeContactText); // append text to p element: <p>{beforeContactText}</p>
    paragraph.appendChild(contactLink); // append text to p element: <p>{beforeContactText}{contactLink}</p>
    paragraph.appendChild(afterContactText); // append text to p element: <p>{beforeContactText}{contactLink}{afterContactText}</p>

    feedbackRequest.appendChild(h2); // append h2 to div element: <div class="global-feedback-request"><h2>textContent</h2></div>
    feedbackRequest.appendChild(paragraph); // append p to div element: <div class="global-feedback-request"><h2>textContent</h2><p>{beforeContactText}{contactLink}{afterContactText}</p></div>
  
    checkElementById('global-feedback-request-container', feedbackRequest);

  });