document.addEventListener('DOMContentLoaded', (event) => {
    dejaAppuiBtn1 = false;
    dejaAppuiBtn2 = false;

    let btnB1 = document.getElementById("b1");
    let btnB2 = document.getElementById("b2");

    function actionBtn1(e){
        dejaAppuiBtn1 = !dejaAppuiBtn1;
        alert("clic btn 1");
        if(dejaAppuiBtn1){
            btnB1.removeEventListener("click", actionBtn1);
            btnB2.addEventListener("click", actionBtn2);            
        }
    }

    function actionBtn2(){
        dejaAppuiBtn2 = !dejaAppuiBtn2;
        alert("clic btn 2");
        if(dejaAppuiBtn2){
            btnB2.removeEventListener("click", actionBtn2);
            btnB1.addEventListener("click", actionBtn1);
        }

    }
    
    console.log('DOM fully loaded and parsed');

    btnB1.addEventListener("click", actionBtn1);

});