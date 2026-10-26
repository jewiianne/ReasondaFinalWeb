(function(){
    var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items=[].slice.call(document.querySelectorAll("[data-speed]"));
    var links=[].slice.call(document.querySelectorAll("nav a"));
    var secs=[].slice.call(document.querySelectorAll("header.hero,section.panel"));
    var ticking=false;
    
    function update(){
        ticking=false;
        {items.forEach(function(el){
            var sec=el.closest("header,section"),r=sec.getBoundingClientRect();
            var hero=sec.classList.contains("hero");
            var off=hero?r.top:(r.top+r.height/2-innerHeight/2);
            var dx=parseFloat(el.dataset.dx||0);el.style.transform="translate3d("+(-off*dx).toFixed(1)+"px,"+(-off*parseFloat(el.dataset.speed)).toFixed(1)+"px,0)";
        });}

        var cur=secs[0].id;
        secs.forEach(function(s){if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id;});
        links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+cur);});
    }

    function req(){if(!ticking){
        ticking=true;requestAnimationFrame(update);
    }}

    addEventListener("scroll",req,{passive:true});addEventListener("resize",req);

    document.addEventListener("click",function(e){
        var a=e.target.closest("a[href^='#']");
        if(!a||a.getAttribute("href")==="#")return;
        var t=document.getElementById(a.getAttribute("href").slice(1));
        if(t){e.preventDefault();t.scrollIntoView({behavior:reduce?"auto":"smooth"});}
    });

    if(location.hash){
        var t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView();
    }

    const aboutSection = document.getElementById('about');
    const imageCard = document.querySelector('.about-image-card');

    if (aboutSection && imageCard) {
        aboutSection.addEventListener('mousemove', (e) => {
            const rect = aboutSection.getBoundingClientRect();
            
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = (x / (rect.width / 2)) * 20;
            const moveY = (y / (rect.height / 2)) * 20;

            imageCard.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;
        });

        aboutSection.addEventListener('mouseleave', () => {
            imageCard.style.transform = 'translate(0px, 0px) scale(1)';
        });
    }

    document.querySelectorAll('.hobby-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = (x / (rect.width / 2)) * 12;
            const moveY = (y / (rect.height / 2)) * 12;

            card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    update();

})();