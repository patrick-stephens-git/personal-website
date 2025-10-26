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

    const sidebarBar = document.createElement('sidebar'); // create element: <sidebar></sidebar>
    sidebarBar.className = 'global-sidebar'; // add class: <sidebar class="global-sidebar"></sidebar>

    // const h2_services = document.createElement('h2'); // create element: <h2></h2>
    // h2_services.textContent = 'Services'; // textContent treats text as plain text

    // const ul_services = document.createElement('ul'); // create element: <ul></ul>

    // const links_services = [
    //     { text: 'SEO Team Training', url: '/services/seo-team-training.html', target: '_self' }
    // ];

    // links_services.forEach(link => {
    //     const li = document.createElement('li'); // create element: <li></li>
    //     const a = document.createElement('a'); // create element: <a></a>
    //     a.href = link.url; // add attribute: <a href="link.url"></a>
    //     a.textContent = link.text; // add text: <a href="link.url">text</a>
    //     a.target = link.target; // add target: <a href="link.url" target="link.target">text</a>
    //     li.appendChild(a); // append link to list item element: <li><a href="link.url" target="link.target">text</a></li>
    //     ul_services.appendChild(li); // append list item to unordered list element: <ul><li><a href="link.url" target="link.target">text</a></li></ul>
    // });

    // sidebarBar.appendChild(h2_services); // append h2 to sidebar: <sidebar><h2>textContent</h2></sidebar>
    // sidebarBar.appendChild(ul_services); // append ul to sidebar: <sidebar><h2>textContent</h2><ul><li><a href="" target=""></a></li>...<li><a href="" target=""></a></li></ul></sidebar>
    
    const h2_posts = document.createElement('h2'); // create element: <h2></h2>
    h2_posts.textContent = 'Posts'; // textContent treats text as plain text

    const ul_posts = document.createElement('ul'); // create element: <ul></ul>

    const links_posts = [
        { text: 'Product Strategy', url: '/posts/product-strategy.html', target: '_self' },
        { text: 'Assumption Validation', url: '/posts/assumption-validation.html', target: '_self' }
    ];

    links_posts.forEach(link => {
        const li = document.createElement('li'); // create element: <li></li>
        const a = document.createElement('a'); // create element: <a></a>
        a.href = link.url; // add attribute: <a href="link.url"></a>
        a.textContent = link.text; // add text: <a href="link.url">text</a>
        a.target = link.target; // add target: <a href="link.url" target="link.target">text</a>
        li.appendChild(a); // append link to list item element: <li><a href="link.url" target="link.target">text</a></li>
        ul_posts.appendChild(li); // append list item to unordered list element: <ul><li><a href="link.url" target="link.target">text</a></li></ul>
    });

    sidebarBar.appendChild(h2_posts); // append h2 to sidebar: <sidebar><h2>textContent</h2></sidebar>
    sidebarBar.appendChild(ul_posts); // append ul to sidebar: <sidebar><h2>textContent</h2><ul><li><a href="" target=""></a></li>...<li><a href="" target=""></a></li></ul></sidebar>

    const h2_external = document.createElement('h2'); // create element: <h2></h2>
    h2_external.textContent = 'External Sites'; // textContent treats text as plain text

    const ul_external = document.createElement('ul'); // create element: <ul></ul>

    const links_external = [
        { text: 'LinkedIn', url: 'https://www.linkedin.com/in/patrickcstephens/', target: '_blank' },
        { text: 'GitHub', url: 'https://github.com/patrick-stephens-git', target: '_blank' },
        { text: 'SoundCloud', url: 'https://soundcloud.com/user-579514550', target: '_blank' },
    ];

    links_external.forEach(link => {
        const li = document.createElement('li'); // create element: <li></li>
        const a = document.createElement('a'); // create element: <a></a>
        a.href = link.url; // add attribute: <a href="link.url"></a>
        a.textContent = link.text; // add text: <a href="link.url">text</a>
        a.target = link.target; // add target: <a href="link.url" target="link.target">text</a>
        li.appendChild(a); // append link to list item element: <li><a href="link.url" target="link.target">text</a></li>
        ul_external.appendChild(li); // append list item to unordered list element: <ul><li><a href="link.url" target="link.target">text</a></li></ul>
    });

    sidebarBar.appendChild(h2_external); // append h2 to sidebar: <sidebar><h2>textContent</h2></sidebar>
    sidebarBar.appendChild(ul_external); // append ul to sidebar: <sidebar><h2>textContent</h2><ul><li><a href="" target=""></a></li>...<li><a href="" target=""></a></li></ul></sidebar>

    checkElementById('global-sidebar-container', sidebarBar);

});
