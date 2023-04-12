import { useEffect, useState } from "react";
import { db } from "../../lib/init-firebase";
import { AddTodoModal } from "./AddTodoModal";
import { collection, getDocs, doc, deleteDoc, runTransaction, orderBy, query } from 'firebase/firestore';
import { EditTodo } from "./EditTodo";

interface Todo {
    id: string;
    todo: string;
    isChecked: boolean;
    timestamp: {
        seconds: number;
        nanoseconds: number;
    };
}

const Todos = () => {
    const [todos, setTodo] = useState<Todo[]>([]);
    const [checked, setChecked] = useState<Todo[]>([]);
    const collectionRef = collection(db, 'todo');

    useEffect(() => {
        const getTodo = async () => {
            const q = query(collectionRef, orderBy('timestamp'));
            await getDocs(q)
                .then((todo) => {
                    let todoData = todo.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Todo[];
                    setTodo(todoData);
                    setChecked(todoData);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getTodo();
    }, []);

    const deleteTodo = async (id: string) => {
        try {
            if (window.confirm("Are you sure you want to delete this Task!")) {
                const documentRef = doc(db, "todo", id);
                await deleteDoc(documentRef)
                window.location.reload()
            }
        } catch (err) {
            console.log(err);
        }
    }

    const checkHandler = async (event: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
        setChecked((state) => {
            const indexToUpdate = state.findIndex((checkBox) => checkBox.id.toString() === event.target.name);
            let newState = state.slice();
            newState.splice(indexToUpdate, 1, {
                ...state[indexToUpdate],
                isChecked: !state[indexToUpdate].isChecked,
            });
            setTodo(newState);
            return newState;
        });
        try {
            const docRef = doc(db, "todo", event.target.name);
            await runTransaction(db, async (transaction) => {
                const todoDoc = await transaction.get(docRef);
                if (!todoDoc.exists()) {
                    throw Error("Document does not exist!");
                }
                const newValue = !todoDoc.data().isChecked;
                transaction.update(docRef, { isChecked: newValue });
            });
            console.log("Transaction successfully committed!");
        } catch (error) {
            console.log("Transaction failed: ", error);
        }
    };

    return (
        <div className="container mt-2">
            <button data-bs-toggle="modal" data-bs-target="#addModal" type="button" className="btn btn-info">
                Add Todo
            </button>
            <div className="row">
                {todos.map(({ todo, id, isChecked, timestamp }) => (
                    <div className="todo-list" key={id}>
                        <div className="todo-item row">
                            <hr />
                            <span className={`col-md-6 ${isChecked === true ? 'done' : ''}`}>
                                <div className="checker">
                                    <span className="">
                                        <input
                                            type="checkbox"
                                            defaultChecked={isChecked}
                                            name={id}
                                            onChange={(event) => checkHandler(event, { id, todo, isChecked, timestamp })}
                                        />
                                    </span>
                                </div>
                                &nbsp;{todo}
                                <br />
                                <i>{new Date(timestamp.seconds * 1000).toLocaleString()}</i>
                            </span>
                            <div className="offset-md-4 col-md-2">
                                <span><EditTodo todo={todo} id={id} /></span>
                                <button type="button" className="btn btn-danger" onClick={() => deleteTodo(id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AddTodoModal />
        </div>

    );
};

export default Todos;

//1161.70  factuurnummer:23240058 Adam Abou Daoud