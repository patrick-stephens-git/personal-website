// knowing when a user scrolls to the end of the page
window.onscroll = () => {
    if((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        console.log("You scrolled to the end of the page.")
    }
}

// knowing when a user scrolls to the top of the page (used w/ onClick="toTop()")
const toTop = () => window.scrollTo({top: 0, behavior: "smooth"});

// go back to previous page (sends the user back to the previous page on page load when active)
// history.back();
// history.go(-1);

console.group('Testing my calc function');
console.log('adding 1 + 1 is', 1 + 1);
console.log('adding 1 - 1 is', 1 - 1);
console.log('adding 2 * 3 is', 2 * 3);
console.log('adding 10 / 2 is', 10 / 2);
console.groupEnd();

const userName = 'John Doe';
console.log({userName});

console.log(
    '%c I have %d %s',
    'color: green; background:black; font-size: 20pt',
    3,
    'Bikes!'
  );

console.log(['Apple', 'Orange']);

console.dir(['Apple', 'Orange']);
