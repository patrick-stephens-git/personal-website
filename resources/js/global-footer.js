// event listener; waits for DOM to load before executing function
document.addEventListener('DOMContentLoaded', function() { 
    const footer = document.createElement('div'); // create element: <div></div>
    footer.className = 'global-footer'; // add class: <div class="global-footer"></div>

    const currentYear = new Date().getFullYear(); // create a new Date object (current datetime), then extract the YYYY (year) from Date object.

    const paragraph = document.createElement('p'); // create element: <p></p>
    paragraph.textContent = `© Patrick Stephens ${currentYear}. All Rights Reserved.`; // textContent treats text as plain text
    paragraph.style.fontSize = '0.75em'; // change font size

    footer.appendChild(paragraph); // appends paragraph to footer: <div class="global-footer"><p style="font-size: 0.75em;">textContent</p></div>

    const container = document.getElementById('global-footer-container'); // gets existing element from html with id="global-footer-container"
    if (container) { // if container exists 
        container.appendChild(footer); // append footer to container: <div id="global-footer-container"><div class="global-footer"><p style="font-size: 0.75em;">textContent</p></div></div>
        console.log('Global footer added successfully'); // log: success
    } else { // if container does not exist
        console.log('Global footer not found'); // log: failure
    }
});