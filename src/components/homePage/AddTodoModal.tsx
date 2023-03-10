import  { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/init-firebase'


export const AddTodoModal = () => {

    const collectionRef = collection(db, 'todo');
    const [createTodo, setCreateTodo] = useState("")
    const submitTodo = async (e: any) => {
        e.preventDefault();

        try {
            await addDoc(collectionRef, {
                todo: createTodo,
                isChecked: false,
                timestamp: serverTimestamp()
            })
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="addModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="d-flex" onSubmit={submitTodo}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Add Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add a Todo"
                                onChange={(e) => setCreateTodo(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary">Create Todo</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}