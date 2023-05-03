import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
 

  useEffect(() => {
      fetch("http://localhost:4000/questions")
        .then((r) => r.json())
        .then(data => {setQuestions(data);
        });
  }, [])

  
  function addQuestion(newQuestion) {
    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);
  }
   

  function updateAnswer(id,value){

   const newQuestions=[]
   
    questions.forEach((question)=>{
    if(question.id===id){
     question.correctIndex=value;
     newQuestions.push(question);
    }
    else{
      newQuestions.push(question);
    }
   })
   
   setQuestions(newQuestions);

   //console.log(questions[id-1])


    const newForm ={ 
      correctIndex:value
    }
    fetch("http://localhost:4000/questions/"+id,{
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
     body:JSON.stringify(newForm)
  })
      .then(r => r.json())
      .then(data => console.log(data))


  }





  function deleteQuestion(id) {

    fetch("http://localhost:4000/questions/"+ id, {
     method: 'DELETE',
        })
       .then(res => res.text()) 
       .then(res => console.log(res))


       const updated = questions.filter(question => question.id !== id);
       console.log(updated);
       setQuestions(updated);
 }



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList questions={questions} delQ={deleteQuestion} updQ={updateAnswer} />}
    </main>
  );
}

export default App;
