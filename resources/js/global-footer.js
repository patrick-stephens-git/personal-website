// event listener; waits for DOM to load before executing function
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
    
    const footer = document.createElement('div'); // create element: <div></div>
    footer.className = 'global-footer'; // add class: <div class="global-footer"></div>

    const currentYear = new Date().getFullYear(); // create a new Date object (current datetime), then extract the YYYY (year) from Date object.

    const paragraph = document.createElement('p'); // create element: <p></p>
    paragraph.textContent = `© Patrick Stephens ${currentYear}. All Rights Reserved.`; // textContent treats text as plain text
    paragraph.style.fontSize = '0.75em'; // change font size

    footer.appendChild(paragraph); // appends paragraph to footer: <div class="global-footer"><p style="font-size: 0.75em;">textContent</p></div>

    checkElementById('global-footer-container', footer);

});