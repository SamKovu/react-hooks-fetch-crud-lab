import React from "react";

function QuestionItem({ question , delQ, updQ}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(e){
    console.log(id);
    delQ(id);
  }

  function handleChange(e){
    console.log(e.target.value)
    updQ(id,e.target.value);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(e)=>handleChange(e)} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={(e)=>handleDelete(e)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
