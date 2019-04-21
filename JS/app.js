const hamburger = document.querySelector(".hamburger");
const navlinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
    navlinks.classList.toggle("open");

    // forEach 可取代 for(i=0 i++)迴圈
    // 可看做 link 為其參數，而該參數添加classList fade ，而在 function內代表links 也就是每個li都添加
    links.forEach(link =>{
        link.classList.toggle("fade"); 
    })
    
    // 等於下面for迴圈
    // for (var i=0; i<links.length;i++){
    //     links[i].classList.toggle("fade");
    // }
})
