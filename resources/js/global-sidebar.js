document.addEventListener('DOMContentLoaded', function() {
    // create <sidebar></sidebar> element
    const sidebarBar = document.createElement('sidebar');
    sidebarBar.className = 'global-sidebar';

    // ************************************************
    // ************************************************
    // Product Management Links
    // create <h2></h2> element
    const h2a = document.createElement('h2');
    h2a.textContent = 'Product Management';

    // create <ul></ul> element
    const ula = document.createElement('ul');

    // links
    const links_a = [
        { text: 'product strategy', url: '/posts/product-strategy.html', target: '_self' },
        { text: 'surfacing problems', url: '/', target: '_self' },
        { text: 'testing assumptions', url: '', target: '_self' },
        { text: 'reaching product market fit', url: '/', target: '_self' },
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


    // // ************************************************
    // // ************************************************
    // // Search System Links
    // // create <h2></h2> element
    // const h2b = document.createElement('h2');
    // h2b.textContent = 'Search Systems';

    // // create <ul></ul> element
    // const ulb = document.createElement('ul');

    // // links
    // const links_b = [
    //     { text: 'search engine system design', url: '/blog/search-engine-system-design.html', target: '_self' },
    //     { text: 'document understanding', url: '/', target: '_self' },
    //     { text: 'query understanding', url: '/', target: '_self' },
    //     { text: 'information retrieval', url: '/', target: '_self' },
    //     { text: 'ranking search results', url: '/', target: '_self' },
    //     { text: 'analyzing search results', url: '/', target: '_self' },
    //     { text: 'search ux', url: '/', target: '_self' },
    //     { text: 'ai in search', url: '/', target: '_self' }
    // ];

    // // for loop to create sidebar links as <li> elements
    // links_b.forEach(link => {
    //     const li = document.createElement('li');
    //     const a = document.createElement('a');
    //     a.href = link.url;
    //     a.textContent = link.text;
    //     a.target = link.target;
    //     li.appendChild(a);
    //     ulb.appendChild(li);
    // });

    // // ************************************************
    // // ************************************************
    // // Search System Links
    // // create <h2></h2> element
    // const h2c = document.createElement('h2');
    // h2c.textContent = 'Other';

    // // create <ul></ul> element
    // const ulc = document.createElement('ul');

    // // links
    // const links_c = [
    //     { text: 'python + sql', url: '/', target: '_self' },
    //     { text: 'a collection of handwritten notes on music theory', url: 'blog/music-theory-notes.html', target: '_self' }
    // ];

    // // for loop to create sidebar links as <li> elements
    // links_c.forEach(link => {
    //     const li = document.createElement('li');
    //     const a = document.createElement('a');
    //     a.href = link.url;
    //     a.textContent = link.text;
    //     a.target = link.target;
    //     li.appendChild(a);
    //     ulc.appendChild(li);
    // });

    // ************************************************
    // ************************************************
    // append elements to sidebar: <h2> and <ul>
    sidebarBar.appendChild(h2a);
    sidebarBar.appendChild(ula);

    // sidebarBar.appendChild(h2b);
    // sidebarBar.appendChild(ulb);

    // sidebarBar.appendChild(h2c);
    // sidebarBar.appendChild(ulc);

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