document.addEventListener('DOMContentLoaded', ()=> {
        const titles = document.querySelectorAll(".typing-title");
    if(titles) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("typing-start");
                    observer.unobserve(entry.target);
                }
            });
        }, 
        {
            threshold: 0.3
        });
        titles.forEach(title => observer.observe(title));
        document.querySelectorAll('.about__advantages-item').forEach(card => {
            const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );
            svg.classList.add("about__advantages-svg");
            const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );
            const radius = 15;
            rect.setAttribute("x", "2");
            rect.setAttribute("y", "2");
            rect.setAttribute("width", card.clientWidth - 4);
            rect.setAttribute("height", card.clientHeight - 4);
            rect.setAttribute("rx", radius);
            rect.setAttribute("ry", radius);
            rect.classList.add("about__advantages-path");
            svg.appendChild(rect);
            card.appendChild(svg);
        });
    }    
})
