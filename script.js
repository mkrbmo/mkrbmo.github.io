
document.querySelectorAll('.post label').forEach(label => {
    label.addEventListener('click', () => {
        var parentElementId = label.parentElement.id
        openPost(parentElementId)

        setTimeout(() => {
            var targetElement = document.getElementById(parentElementId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        , 100)
    });
})
