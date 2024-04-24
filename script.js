
function incrementSlide(e) {
    var siblings = n => [...n.parentElement.children]
    console.log(siblings(e))
    for (let sibling of siblings(e)) {
        if (!sibling.classList.contains('active-image')) {
            continue
        } else if (sibling.nextElementSibling.nodeName == "IMG") {
            sibling.classList.toggle('active-image')
            sibling.nextElementSibling.classList.toggle('active-image')
            break
        }
    }
}
function decrementSlide(e) {
    var siblings = n => [...n.parentElement.children]
    console.log(siblings(e))
    for (let sibling of siblings(e)) {
        if (!sibling.classList.contains('active-image')) {
            continue
        } else if (sibling.previousElementSibling.nodeName == "IMG") {
            sibling.classList.toggle('active-image')
            sibling.previousElementSibling.classList.toggle('active-image')
            break
        }
    }
}
