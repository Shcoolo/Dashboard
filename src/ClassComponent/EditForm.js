import React, {useState} from 'react';

export const EditForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(value, task.id);
      };
  return (
    <form onSubmit={handleSubmit} className="ClassForm">
    <button type="submit" className='class-btn'>first class</button>
    <button type="submit" className=' class-btn'>second class</button>

  </form>
  )
}
