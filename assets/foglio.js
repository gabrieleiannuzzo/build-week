
    

  

let stelle = document.querySelectorAll('.stelle path');
let selectedStelle = new Set();


stelle.forEach(stella => {
    stella.setAttribute('data-original-fill', stella.getAttribute('fill'));
});

stelle.forEach(stella => {
    stella.addEventListener('click', () => {
        console.dir(stella);

        if (selectedStelle.has(stella)) {
           
            stella.setAttribute('fill', stella.getAttribute('data-original-fill'));
            selectedStelle.delete(stella);
        } else {
           
            stella.setAttribute('fill', '#00ffff');
            selectedStelle.add(stella);
        }
    });
});

document.getElementById('button inter').addEventListener('click',function(){
    window.location.href='https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwi9iPPc9vyBAxW1hmgJHQVaARwYABAAGgJ3Zg&ase=2&gclid=Cj0KCQjw4bipBhCyARIsAFsieCxofz2ZVfICcQy44flUrqgsABUNi6ro1G5yu1jD2FMrLB1b1H37o0UaAoP8EALw_wcB&ei=IGkuZfvaGfGchbIPxqOemAU&ohost=www.google.com&cid=CAESV-D2weRtIhCxzpIAT-lM4XbZuiUmhnbLgeWTIUNHxEdoCeIV_ti7T7MbPB6ZMvLjm-aGbyLsoO4p4Hg0xu6KfVI_j3qbVCoOjaGJ8vK2xdmHoPxaiSCzyA&sig=AOD64_1dSJZ1IYqIQRPTdtKQtAgKsZTVzQ&q&sqi=2&nis=4&adurl&ved=2ahUKEwj76uvc9vyBAxVxTkEAHcaRB1MQ0Qx6BAgOEAE'
});


