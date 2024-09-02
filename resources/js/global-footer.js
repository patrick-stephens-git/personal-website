document.addEventListener('DOMContentLoaded', function() {
  
  // create <div></div> element
  const footer = document.createElement('div');
  footer.className = 'global-footer';

  // create string
  const textNode = document.createTextNode('PS');

  // append string
  footer.appendChild(textNode);

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