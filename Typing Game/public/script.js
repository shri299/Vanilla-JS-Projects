const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDiaplayElement = document.getElementById('quoteDisplay') 
const quoteInputElement = document.getElementById('quoteInput') 
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input',()=>{
    // console.log("changed");
    const arrayQuote = quoteDiaplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;
    arrayQuote.forEach((charSpan,index)=>{
        const inputChar = arrayValue[index];
        if(inputChar==null){
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            correct = false;
        }
        else if(inputChar===charSpan.innerText){
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
            charSpan.style.color = 'green'
        } else{
            charSpan.classList.add('incorrect')
            charSpan.classList.remove('correct')
            charSpan.style.color = 'red'
            correct = false;
        }
    })
    if(correct){
        rederNewQuote();
    }
})


function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then((data=>data.content))
}

async function rederNewQuote(){
    const quote = await getRandomQuote();
    console.log(quote);
    quoteDiaplayElement.innerHTML = '';
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char;
        quoteDiaplayElement.appendChild(charSpan);
    });
    // quoteDiaplayElement.innerText = quote;
    quoteInputElement.value = null;
    startTimer()
}

let startTime;

function startTimer(){
    timerElement.innerText = '0';
    startTime = new Date();
    setInterval(()=>{
        timerElement.innerText = getTimerTime()
    },1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000);
}

rederNewQuote();