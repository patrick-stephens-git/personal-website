document.addEventListener('DOMContentLoaded', function() {
    // create <sidebar></sidebar> element
    const sidebarBar = document.createElement('sidebar');
    sidebarBar.className = 'global-sidebar';

    // ************************************************
    // ************************************************
    // Product Management Links
    // create <h2></h2> element
    const h2a = document.createElement('h2');
    h2a.textContent = 'Posts';

    // create <ul></ul> element
    const ula = document.createElement('ul');

    // links
    const links_a = [
        { text: 'product strategy', url: 'https://patrickcstephens.com/posts/product-strategy.html', target: '_self' },
        { text: 'assumption validation', url: 'https://patrickcstephens.com/posts/assumption-validation.html', target: '_self' },
        { text: 'search for product managers', url: 'https://patrickcstephens.com/posts/understanding-search-for-product-managers.html', target: '_self' }
    ];

    // for loop to create sidebar links as <li> elements
    links_a.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = link.target;
        li.appendChild(a);
        ula.appendChild(li);
    });

    // ************************************************
    // ************************************************
    // append elements to sidebar: <h2> and <ul>
    sidebarBar.appendChild(h2a);
    sidebarBar.appendChild(ula);

    // add <sidebar> within the <div class="global-sidebar-container"> element
    const container = document.getElementById('global-sidebar-container');
    if (container) {
        container.appendChild(sidebarBar);
    };
    if (container) {
        container.appendChild(sidebarBar);
        console.log('Global sidebar added successfully');
    } else {
        console.log('Global sidebar not found');
    }
});
