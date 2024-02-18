// traversing the dom

// const btns = document.querySelectorAll('.question-btn');

// btns.forEach(function(btn){
//     btn.addEventListener('click', function(e){
//         const question = e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     });
// });

//using selectors inside the element

const questions = document.querySelectorAll('.question');

questions.forEach(function(qsn){
    const btn = qsn.querySelector('.question-btn');
    btn.addEventListener('click', function(){
        questions.forEach(function(item){
            if (item != qsn){
                item.classList.remove('show-text');
            }
        })

        qsn.classList.toggle('show-text');
    })
})

