
document.addEventListener('scroll', function (event) {
    
    let body = document.body
    let html = document.documentElement;
    
    let moon = document.getElementById('moon')
    let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ) - window.innerHeight;
    let scroll = window.scrollY 
    let ratio = scroll/height
    
    /*moon.style.left = window.innerWidth*ratio-moon.offsetWidth/2+'px'
    moon.style.top = (2*ratio**2 - 2*ratio+0.5)*100+'%'*/
    moon.style.top = ratio*70+10+'%'
})
function incrementSlide(n) {
    slide = document.querySelector('.active-image').id;
    slide_number = +slide.slice(-1);
    
    if (n == -1 && slide_number > 1) {
        image = document.getElementById(slide);
        image.classList.toggle('active-image');

        image = document.getElementById('image'+(slide_number-1).toString());
        image.classList.toggle('active-image');
        

    } else if (n == 1 && document.getElementById('image'+(slide_number+1).toString())) {
        image = document.getElementById(slide);
        image.classList.toggle('active-image');

        image = document.getElementById('image'+(slide_number+1).toString());
        image.classList.toggle('active-image');
    }

    

    
    
    
}
