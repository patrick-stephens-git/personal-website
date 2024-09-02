document.addEventListener('DOMContentLoaded', function() {
    // Nav
    const links = [
        { text: 'Home', url: '/', target: '_self' },
        { text: 'Notes', url: '/posts', target: '_self' },
        { text: 'LinkedIn', url: 'https://www.linkedin.com/in/patrickcstephens/', target: '_blank' },
        { text: 'Git', url: 'https://github.com/patrick-stephens-git', target: '_blank' },
        { text: 'SoundCloud', url: 'https://soundcloud.com/user-579514550', target: '_blank' },
        { text: 'Contact', url: 'mailto:patrickcstephens@me.com?subject=Reaching%20out%20from%20patrickcstephens.com', target: '_self' } 
    ];

    // create <nav></nav> element
    const navBar = document.createElement('nav');
    navBar.className = 'global-nav';

    // create <ul></ul> element
    const ul = document.createElement('ul');

    // for loop to create nav links as <li> elements
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = link.target;
        li.appendChild(a);
        ul.appendChild(li);
    });

    // append <ul> to <nav>
    navBar.appendChild(ul);

    // add <nav> within the <div class="global-nav-container"> element
    const container = document.getElementById('global-nav-container');
    if (container) {
        container.appendChild(navBar);
    };
    if (container) {
        container.appendChild(navBar);
        console.log('Global nav added successfully');
    } else {
        console.log('Global nav not found');
    }
});