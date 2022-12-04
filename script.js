
document.addEventListener('scroll', function (event) {
    
    let body = document.body,
        html = document.documentElement;
    
    let moon = document.getElementById('moon')
    let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ) - window.innerHeight;
    let scroll = window.scrollY 
    let ratio = scroll/height
    
    moon.style.left = window.innerWidth*ratio-moon.offsetWidth/2+'px'
    moon.style.top = (2*ratio**2 - 2*ratio + 0.5)*100+'%'
    
    
})
message.innerHTML = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight ) - window.innerHeight;
