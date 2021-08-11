let f_data;

// fetching data from the url
fetch('https://opentdb.com/api.php?amount=30&category=18&difficulty=easy&type=multiple').then(response=>{
    return response.json();
}).then(data=>{
    assign(data);
}).catch(error=>{
    console.log(error)
})


// function assign -> storing data
function assign(data){
    data.results.splice(1,1); // have done this because there is problem in checking correct answer
    f_data = data;
    questionset(q_no);
}


// getting elements
let ques = document.querySelector('.question-container');
let nex = document.getElementById('nex');
let pre = document.getElementById('pre');
let che = document.getElementById('che');
let cr_ans = document.getElementById("cr_ans")
let wr_ans = document.getElementById("wr_ans")
let score = document.getElementById("score")


// initailizing variables
let q_no = 0;
let correct_answer = 0;
let wrong_answer = 0;
let t_score = 0;


// function questionset
function questionset(index){
    
    // generating random no. and adjusting correct answer randomly in array
    let rand =parseInt(Math.random()*4);
    let ar = f_data.results[index].incorrect_answers;
    ar.splice(rand,0,f_data.results[index].correct_answer);

    let html;
    html = `
    <h2><span>Q-${index+1} : </span>${f_data.results[index].question}</h2>
    <ul>
        <li class="li" id="li1">
            <input type="radio" id="a" name="answer" value="${ar[0]}" checked>
            <label for="a">${ar[0]}</label>
        </li>
        <li class="li" id="li2">
            <input type="radio" id="b" name="answer" value="${ar[1]}">
            <label for="b">${ar[1]}</label>
        </li>
        <li class="li" id="li3">
            <input type="radio" id="c" name="answer" value="${ar[2]}">
            <label for="c">${ar[2]}</label>
        </li>
        <li class="li" id="li4">
            <input type="radio" id="d" name="answer" value="${ar[3]}">
            <label for="d">${ar[3]}</label>
        </li>
    </ul>
    `;
    ar.splice(rand,1)
    ques.innerHTML = html;
}


// next button click function
nex.addEventListener('click',(e)=>{
    q_no++;
    questionset(q_no);
})


// previous button click function
pre.addEventListener('click',(e)=>{
    if(q_no>0){
    pre.style.disabled = 'undisabled'
    q_no--;
    questionset(q_no);
    }
    else{
        pre.style.disabled = 'disabled'
    }
})


// check button click function
che.addEventListener('click',(e)=>{

    let a = document.getElementById('a');
    let b = document.getElementById('b');
    let c = document.getElementById('c');
    let d = document.getElementById('d');
    let answer;

    if(a.checked){
        answer = a.value;
    }
    else if(b.checked){
        answer = b.value;
    }
    else if(c.checked){
        answer = c.value
    }
    else{
        answer = d.value;
    }

    if(f_data.results[q_no].correct_answer == answer){
        correct_answer++;
        cr_ans.className = 'cr_ani';
        cr_ans.innerText = `Correct Answers : ${correct_answer}`;
    }
    else{
        wrong_answer++;
        wr_ans.className = 'wr_ani';
        wr_ans.innerText = `Wrong Answers : ${wrong_answer}`;
    }
    t_score = correct_answer-wrong_answer;
    score.className = 'score_ani';
    score.innerText = `Total Score : ${t_score}`;
    setTimeout(() => {
        cr_ans.className = '';
        wr_ans.className = '';
        score.className = '';   
    }, 1000);
})
