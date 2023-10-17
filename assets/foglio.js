
    

  
let stelle=document.querySelectorAll('.stelle path');
stelle.forEach(stella=>{
    stella.addEventListener('click',()=>{
        stella.setAttribute('fill','#00ffff');
        stella.style.transform='scale(1)';
    });
});