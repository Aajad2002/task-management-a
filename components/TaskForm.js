"use client";


import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const TaskForm = ({ showModal, setShowModal, newTask, setNewTask, handleAddTask, handleEditTask, isEditing }) => {
    return (
        showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl text-black font-semibold">{isEditing ? "Edit Task" : "Add a New Task"}</h2>
                        <button onClick={() => setShowModal(false)} className="text-red-500 text-xl">
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <textarea
                            placeholder="Description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        ></textarea>
                        <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <div className="flex justify-end">

                            <button
                                onClick={isEditing ? handleEditTask : handleAddTask}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-lg w-auto"
                            >
                                {isEditing ? "Update Task" : "Add Task"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default TaskForm;
