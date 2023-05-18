addEventListener('scroll', () => {
    const navBar = document.querySelector('#nav')
    const scrolled = scrollY > 0;
    navBar.classList.toggle('nav-scroll-white', scrolled);
})