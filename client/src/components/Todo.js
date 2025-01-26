import React,{useState} from 'react';


const ToDo = () => {
  const [toDos, setToDos] = useState([])
  const [currentToDo, setCurrentToDo] = useState({ id: '', text: '', isEditing: false, isCompleted: false })


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentToDo.text.trim()) {
         return alert ('Please Enter ToDo')
    }

    if (currentToDo.isEditing) {
       setToDos((pre)=>pre.map((toDo)=>toDo.id===currentToDo.id?{...toDo,text:currentToDo.text}:toDo))
    } else {
      setToDos((pre) => [
        ...pre,
        { id: Date.now(), text: currentToDo.text, isCompleted: false },
      ]);
    }
    setCurrentToDo({ id: '', text: '', isEditing: false, isCompleted: false });
  }


  const handleToggle = (id) => {
    setToDos((pre) =>
      pre.map((toDo) =>
        toDo.id === id ? { ...toDo, isCompleted: !toDo.isCompleted } : toDo,
      ),
    );
  }

  const handleEdit = (item) => {
    setCurrentToDo({
      id: item.id,
      text: item.text,
      isEditing: true,
    });
  };

  const handleDelete = (id) => {
setToDos(toDos.filter((item)=>item.id !==id))
  }

console.log(toDos)
console.log(currentToDo);
  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          <input
            type='text'
            name='name'
            placeholder='Enter your ToDo'
            value={currentToDo.text}
            onChange={(e) =>
              setCurrentToDo({
                ...currentToDo,
                text: e.target.value,
              })
            }
          />
        </label>
        <button type='submit'>
          {currentToDo.isEditing ? 'Update' : 'Add'}
        </button>
      </form>
      {toDos.length > 0 ? (
        <div>
          {toDos.map((item) => (
            <ul key={item?.id}>
              <li
                style={{
                  textDecoration: `${
                    item?.isCompleted ? 'line-through' : 'none'
                  }`,
                }}
              >
                {item?.text}
              </li>
              <input
                type='checkbox'
                value={currentToDo?.isCompleted}
                onChange={() => handleToggle(item?.id)}
              />

              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item?.id)}>Delete</button>
            </ul>
          ))}
        </div>
      ) : (
        <div>
          <h1>No ToDo list found</h1>
        </div>
      )}
    </div>
  );
}

export default ToDo
