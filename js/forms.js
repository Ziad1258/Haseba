// Select the element from the html

// Element from the branch page (ex : math or secince ...)
let firtstInput = document.querySelector(".main-form input")
let inputsCollection = document.querySelectorAll(".main-form input");
let inputsGroup = document.querySelectorAll(".main-form input:not(.sport)")
let submit = document.querySelector('form .tn-moyenne');

// Element form the result page 
let bigBox = document.querySelector(".big-box")
let resultTitle = document.querySelector(".result-title");
let resText = document.querySelector(".result-text span");
let colseBtn = document.querySelector(".big-box .closeBtn");

// whene the user load the page
window.onload = () => {

    // this condtion mean , if the user is on the forms page (the page contains inputs and submit button) , 
    // the browser will auto focus on first input
    if (firtstInput) {
        firtstInput.focus();
    }

    // this condtion mean , if the user is on the result page (the page contains the note) , 
    // i get the result form local storage and put it on result text span
    if (resultTitle) {
        let getfromlocal = window.localStorage.getItem("result");
        let language = document.documentElement.lang;
        if (getfromlocal < 10) {


            // if the note is less than 10 , he will get message like 'hard luck , or next time or ..'
            // you can edit the colors and the text content
            if (language == 'en') {
                resultTitle.innerHTML = "Hard Luck";
            } else if (language == "fr") {
                resultTitle.innerHTML = "Meilleure chance";
            } else {
                resultTitle.innerHTML = "حظ أوفر";
            }



            bigBox.classList.add("failed");

            resText.innerHTML = getfromlocal;

            colseBtn.classList.add("btn-danger");

        } else {
            // if the note is more than 10 , the message is going to be "congrats" or "congratulation or .."
            // you can edit the colors and the text content

            if (language == 'en') {
                resultTitle.innerHTML = "Congratulation";
            } else if (language == "fr") {
                resultTitle.innerHTML = "félicitation";
            } else {
                resultTitle.innerHTML = "ألف مبروك";

            }
            resText.innerHTML = getfromlocal;
        }
    }

}


// i target all the inputs (it is a loop by using forEach Method)
inputsCollection.forEach((input) => {
    input.type = "number";
    // on blur effect (mean when the user focus on input the click outside it)
    input.addEventListener(("blur"), (e) => {
        mainfun(e)
    })
    // when user click on submit button
    submit.addEventListener("click", (e) => {
        // if the user insert all the data correctly in inputs (not empty + more thant or equal 0 + less than or equal 20)
        // => i will call calc function
        if (input.value != "" && input.value <= 20 && input.value >= 0) {
            calc(input);
            // if not the submit button will not work     
        } else {
            e.preventDefault()
        }
    })

    input.addEventListener("input", (e) => {

        input.addEventListener("input", (e) => {
            const inputValue = e.target.value;
            const validNumber = /^\d+(\.5)?$/; // Regular expression to validate the input

            if (validNumber.test(inputValue)) {
                const number = parseFloat(inputValue);
                if (number > 20 && number < 21) {
                    let nv = e.target.value.slice(0, 2);
                    e.target.value = nv;
                } else if (number >= 21) {
                    let nv = e.target.value.slice(0, 1);
                    e.target.value = nv;
                }
            } else {
                if (parseFloat(e.target.value) < 10) {
                    let nv = e.target.value.slice(0, 1);
                    e.target.value = nv;
                } else if (parseFloat(e.target.value) >= 10) {
                    let nv = e.target.value.slice(0, 2);
                    e.target.value = nv;
                }
            }
            if(e.target) {
                window.addEventListener("keydown",(e) => {
                    if(e.key === "Enter") {
                        mainfun(e)
                    }
                })
            } 
        });



    });
})

function mainfun(e) {
    // declare a variable call (nextInput) 
    let nextInput = e.target.parentElement.nextElementSibling.lastElementChild;

    if (e.target.value != "" && e.target.value <= 20 && e.target.value >= 0) {

        // this conditon give the input classes => 
        // if the user blur the input and he leave it empty or type letters or over 2 numbers => input will be red + empty
        // if user type valid data => input will be green

        e.target.classList.remove("not-valid");
        e.target.classList.add("valid");
        nextInput.disabled = false;
        nextInput.focus();
    } else {
        e.target.classList.remove("valid");
        e.target.classList.add("not-valid");
    }
}



// i declare two variables
// 
let res = 0;
let mark = 0;

function calc(input) {

    if (input.classList.contains("sport") && input.value == 0) {

        input.dataset.value = 0;
    }

    res = res + (parseInt(input.value) * parseInt(input.dataset.value));
    mark = mark + parseInt(input.dataset.value);

    result = res / mark;
    result = result.toFixed(2);
    let settolocal = window.localStorage.setItem("result", result);

}





