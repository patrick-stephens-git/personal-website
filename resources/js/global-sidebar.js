document.addEventListener('DOMContentLoaded', function() {
    // create <sidebar></sidebar> element
    const sidebarBar = document.createElement('sidebar');
    sidebarBar.className = 'global-sidebar';

    // ************************************************
    // ************************************************
    // Product Management Links
    // create <h2></h2> element
    const h2a = document.createElement('h2');
    h2a.textContent = 'Product Notes';

    // create <ul></ul> element
    const ula = document.createElement('ul');

    // links
    const links_a = [
        { text: 'product strategy', url: '/posts/product-strategy.html', target: '_self' },
        { text: 'assumption validation', url: '/posts/assumption-validation.html', target: '_self' }
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
    // Search System Links
    // create <h2></h2> element
    const h2b = document.createElement('h2');
    h2b.textContent = 'Search Notes';

    // create <ul></ul> element
    const ulb = document.createElement('ul');

    // links
    const links_b = [
        { text: 'understanding search for product managers', url: '/posts/understanding-search-for-product-managers.html', target: '_self' } //,
        // { text: 'document understanding', url: 'xxxx', target: '_blank' },
    ];

    // for loop to create sidebar links as <li> elements
    links_b.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = link.target;
        li.appendChild(a);
        ulb.appendChild(li);
    });

    // ************************************************
    // ************************************************
    // Tools Links
    // create <h2></h2> element
    const h2d = document.createElement('h2');
    h2d.textContent = 'Python Tools';

    // create <ul></ul> element
    const uld = document.createElement('ul');

    // links
    const links_d = [
        { text: 'word cloud generator for user feedback', url: 'https://github.com/patrick-stephens-git/qualitative-evidence/tree/main/word-cloud-generator', target: '_blank' },
        { text: 'mapping (incorrect|correct) spelling pairs', url: 'https://github.com/patrick-stephens-git/quantitative-evidence/tree/main/spelling-error-to-keyword-pairs-generator', target: '_blank' },
        { text: 'mapping (query|acronym) pairs', url: 'https://github.com/patrick-stephens-git/quantitative-evidence/tree/main/query-refinements-to-keyword-acronym-pairs-generator', target: '_blank' }
    ];

    // for loop to create sidebar links as <li> elements
    links_d.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = link.target;
        li.appendChild(a);
        uld.appendChild(li);
    });

    // ************************************************
    // ************************************************
    // append elements to sidebar: <h2> and <ul>
    sidebarBar.appendChild(h2a);
    sidebarBar.appendChild(ula);

    sidebarBar.appendChild(h2b);
    sidebarBar.appendChild(ulb);

    // sidebarBar.appendChild(h2c);
    // sidebarBar.appendChild(ulc);

    sidebarBar.appendChild(h2d);
    sidebarBar.appendChild(uld);

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
