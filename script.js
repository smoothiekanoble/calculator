// addEventListener("DOMContentLoaded", () => {
    // function for everything
        // function for receiving button clicks
        // function for translating button clicks
        // function for calculating
        // function for displaying output
// })

// > 9999999999
// /0
// ..

let display = 0;
const MAX_DISPLAY = 9999999999;

function loadCalculator() {
    let a = new Array();
    let c = new Array();
    let b = undefined;
    let negativeA = false;
    let negativeC = false;
    const out = document.getElementById('console');
    const input = document.querySelectorAll('button');
    out.innerText = 0;
    let focusOnA = true;
    input.forEach((button) => {
        button.addEventListener('click', (e) => {
            console.log(e.target.innerText);
            input.forEach((btn) => {
                btn.style.color = "";
                btn.style.backgroundColor = "";
            });

            // Change the clicked button's colors
            
            if (e.target.className === 'orange'){
                if (a.length > 0) {
                    if (e.target.innerText == "=") {
                        if (!focusOnA) { // regular operation; click =
                                        // reset a, keep b and c
                            
                            if (c.length != 0) {
                                let result = operate(a, b, c, negativeA, negativeC);
                                a = result.toString().split('');
                                if (result < 0) {
                                    a.shift();
                                    negativeA = true;
                                } else
                                    negativeA = false;
                                
                                focusOnA = true;

                                display = arrayToNumber(a, negativeA);
                                out.innerText = display;
                            }
                        } else {        // if chained "="
                            let result = operate(a, b, c, negativeA, negativeC);
                            a = result.toString().split('');
                            if (result < 0) {
                                a.shift();
                                negativeA = true;
                            } else
                                negativeA = false;

                            display = arrayToNumber(a, negativeA);
                            out.innerText = display;
                        }
                    
                        
                    } else {    // any operation not =
                        if (c.length != 0) { // if c exists
                            if (!focusOnA){ // not first time; click any other operation
                                            // operate, set a, reset b and c
                                let result = operate(a, b, c, negativeA, negativeC);
                                a = result.toString().split('');
                                if (result < 0) {
                                    a.shift();
                                    negativeA = true;
                                } else
                                    negativeA = false;
                            } 
                            b = e.target.innerText;
                            focusOnA = false;
                            c = [];

                            display = arrayToNumber(a, negativeA);
                            out.innerText = display; 
                        } else if (b != e.target.innerText) { // if b changes operation
                            b = e.target.innerText;
                            focusOnA = false;
                            c = [];
                            display = arrayToNumber(a, negativeA);
                            out.innerText = display;
                        }
                        e.target.style.color = "#F2932A";
                        e.target.style.backgroundColor = "white";
                    }
                    negativeC = false;
                    //first time, focusOnA: true to false
                    //after, focusOnA: false to false 
                    
                } 
            } else if (e.target.className === 'gray') {
                if (e.target.innerText === 'AC') {
                    focusOnA = true;
                    a = [];
                    c = [];
                    b = undefined;
                    negativeA = false;
                    negativeC = false;

                    display = arrayToNumber(a, negativeA);
                    out.innerText = display; 
                } else if (e.target.innerText === '%') {
                    if (a.length > 0 && focusOnA) {
                        focusOnA = true;
                        a.unshift(0);
                        a.unshift(0);
                        if (!a.includes('.'))
                            a.push('.');
                        let index = a.indexOf('.');
                        a.splice(index, 1);
                        a.splice(index - 2, 0, '.');

                        display = clean(arrayToNumber(a, negativeA));
                        out.innerText = display; 
                    } else if (c.length > 0 && !focusOnA) {
                        // could implement c as a percentage of a
                        // rather than c * .01
                        focusOnA = false;
                        c.unshift(0);
                        c.unshift(0);
                        if (!c.includes('.'))
                            c.push('.');
                        let index = c.indexOf('.');
                        c.splice(index, 1);
                        c.splice(index - 2, 0, '.');

                        display = clean(arrayToNumber(c, negativeC));
                        out.innerText = display; 
                    }
                } else {
                    if (focusOnA) {// toggle sign
                        negativeA = !negativeA;
                        
                        display = clean(arrayToNumber(a, negativeA));
                        out.innerText = display; 
                    }else {
                        negativeC = !negativeC;
                        
                        display = clean(arrayToNumber(c, negativeC));
                        out.innerText = display; 
                    }
                }
            } else if (focusOnA == true && a.length < 10) {
                //DONE add edge cases for 0 and . 
                //DONE add edge case for overriding previous operation
                //DONE add edge case for overflow
                if (b != undefined && c.length != 0) {
                    a = [];
                    b = undefined;
                    c = [];
                    a.push(e.target.innerText);

                    display = arrayToNumber(a, negativeA);
                    out.innerText = display;
                }else if (!a.includes('.') || !(e.target.innerText == '.')) {
                    a.push(e.target.innerText);

                    display = arrayToNumber(a, negativeA);
                    out.innerText = display;
                }
                 
            } else if (focusOnA == false && c.length < 10) {
                //add edge cases for 0's and .
                if (!c.includes('.') || !(e.target.innerText == '.')){
                    c.push(e.target.innerText);

                    display = arrayToNumber(c, negativeC);
                    out.innerText = display; 
                }
            }
            
            console.log('a: ' + a);
            console.log('b: ' + b);
            console.log('c: ' + c);
            // console.log('a: ' + arrayToNumber(a, negativeA));
            // console.log('b: ' + b);
            // console.log('c: ' + arrayToNumber(c, negativeC));
        });
    }); 
    input.forEach((button) => {
        button.addEventListener('mousedown', (e) => {
            input.forEach((btn) => {
                btn.style.color = "";
                btn.style.backgroundColor = "";
            });
            
            if (e.target.className === "gray") {
                e.target.style.backgroundColor = '#737373';
            } else if (e.target.className !== "orange") {
                e.target.style.backgroundColor = '#D9D9D9';
            }
        });
    });
}

function arrayToNumber(a, isNegative) { 
    if (a === undefined || a.length == 0) return 0; // account for if number is just '.'
    if (Number(a.join('')) == NaN) return "ERROR";
    // if (a.join('') == '.') return (isNegative) ? '-0.' : '0.';
    // if (a[a.length - 1] == '.') return Number(a.join('')) * ((isNegative) ? -1 : 1) + '.';
    // if (a.includes('.') && a.every((char, index) => index > a.indexOf('.') ? char === '0' : true) && a.length < 10) {
    //     return (isNegative ? '-' : '') + a.join('');
    // }
    if (a.includes('.')) {
        let result = a.join('');
        
        // Handle the case where the array contains only a decimal point and trailing zeros
        if (a[0] === '.' && a.slice(1).every(char => char === '0') && a.length < 10) {
            return (isNegative ? '-' : '') + '0' + result;
        }
        
        // Ensure the leading zero is included for cases like .60000
        if (a[0] === '.' && a.length < 10) {
            result = '0' + result;
        }

        result = result.replace(/^0+(?=\d)/, '');

        // Remove leading zeros before the decimal point
        if (result[0] === '0' && result[1] !== '.') {
            result = result.replace(/^0+(?=\d)/, '');
        }
        
        // Ensure trailing zeros after the decimal point are preserved
        if (a.slice(a.indexOf('.') + 1).every(char => char === '0') && a.length < 10) {
            return (isNegative ? '-' : '') + result;
        }
        
        return (isNegative ? '-' : '') + result;
    }
    
    // Remove leading zeros for non-decimal values
    return Number(a.join('')) * ((isNegative) ? -1 : 1);

}

function operate(inputA, b, inputC, negativeA, negativeC) {
    a = arrayToNumber(inputA, negativeA);
    c = arrayToNumber(inputC, negativeC);
    console.log(typeof b);
    console.log('&#215;');
    if (b === '÷'){
        return div(a, c);
    } else if (b === '×'){
        return mult(a, c);
    } else if (b === '-'){
        return min(a, c);
    } else if (b === '+'){
        return add(a, c);
    }
    
    return a;
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
addEventListener("DOMContentLoaded", () => {
    loadCalculator();
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//operations + clean function can handle strings
function add(a, b){
    return clean(Number(a) + Number(b));
}

function mult(a, b){
    return clean(Number(a) * Number(b));
}

function div(a, b){
    if (b == 0) return "u fucking dumbass";
    return clean(Number(a) / Number(b));
}

function min(a, b){
    return clean(Number(a) - Number(b));
}

function clean(a) {
    a = Math.round(Number(a) * 10000000000)/10000000000; // Number() probably sets to scientific notation after certain
                                                            // amount of decimal places. Find new way to typecast 
    if (a > MAX_DISPLAY) return NaN;
    if (Math.round(a) == a) return a;
    let lhs = Math.round(a).toString().length;
    console.log(lhs);
    let rhs = a.toString().length - lhs - 1;
    console.log(rhs);
    let digitsDisplayed = 0;
    let out = a;
    if (lhs + rhs > 10) {
        digitsDisplayed = 10 - lhs;
        out = Math.round(out * (10 ** digitsDisplayed))/(10 ** digitsDisplayed);
    }
    console.log(out);
    return out;
}