document.addEventListener('DOMContentLoaded', function() {
  
  // create <div></div> element
  const footer = document.createElement('div');
  footer.className = 'global-footer';

  // get the current year
  const currentYear = new Date().getFullYear();

  // create <p> element
  const paragraph = document.createElement('p');
  paragraph.textContent = `© Patrick Stephens ${currentYear}. All Rights Reserved.`;

  // change font size
  paragraph.style.fontSize = '0.75em'; 

  // append string
  footer.appendChild(paragraph);

  // add <div> within the <div class="global-footer-container"> element
  const container = document.getElementById('global-footer-container');
  if (container) {
      container.appendChild(footer);
  };
  if (container) {
      container.appendChild(footer);
      console.log('Global footer added successfully');
  } else {
      console.log('Global footer not found');
  }
});