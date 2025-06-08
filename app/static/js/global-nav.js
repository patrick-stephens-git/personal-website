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

    const links = [
        { text: 'Home', url: 'https://patrickcstephens.com/', target: '_self' },
        { text: 'PatChat', url: 'https://chat.patrickcstephens.com/', target: '_self' },
        // { text: 'Posts', url: 'https://patrickcstephens.com/posts', target: '_self' },
        { text: 'Contact', url: 'mailto:patrickcstephens@me.com?subject=Reaching%20out%20from%20patrickcstephens.com', target: '_self' } 
    ];

    const navBar = document.createElement('nav'); // create element: <nav></nav>
    navBar.className = 'global-nav'; // add class: <nav class="global-nav"></nav>

    const ul = document.createElement('ul'); // create element: <ul></ul>

    links.forEach(link => {
        const li = document.createElement('li'); // create element: <li></li>
        const a = document.createElement('a'); // create element: <a></a>
        a.href = link.url; // add attribute: <a href="link.url"></a>
        a.textContent = link.text; // add text: <a href="link.url">link.text</a>
        a.target = link.target; // add target: <a href="link.url" target="link.target">link.text</a>
        li.appendChild(a); // append link to list item element: <li><a href="link.url" target="link.target">link.text</a></li>
        ul.appendChild(li); // append list item to unordered list element: <ul><li><a href="link.url" target="link.target">link.text</a></li></ul>
    });

    navBar.appendChild(ul); // append unordered list to nav: <nav><ul><li><a href="" target=""></a></li>...<li><a href="" target=""></a></li></ul></nav>

    checkElementById('global-nav-container', navBar);

});