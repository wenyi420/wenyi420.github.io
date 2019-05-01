const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    // 加入動畫 navLinkFade
    const navLinks = document.querySelectorAll('.nav-links li');
    //  toggle nav
    burger.addEventListener("click", () => {
            nav.classList.toggle('nav-active');
            navLinks.forEach( (link,index) => {
                
                link.classList.toggle('fade');
               
            });

            // burger animate
            burger.classList.toggle('toggle');
        });
    //  Animate Links
    
}
navSlide();


