"use client";

import React from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai"; // Import outlined icons

const TaskList = ({
    tasks,
    handleCompleteTask,
    handleDeleteTask,
    setIsEditing,
    setEditingTaskId,
    setNewTask,
    setShowModal,
}) => {

    // Function to get the color of the priority chip based on priority
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-400 text-white"; // Red for high priority
            case "medium":
                return "bg-yellow-300 text-white"; // Yellow for medium priority
            case "low":
                return "bg-green-300 text-white"; // Green for low priority
            default:
                return "bg-gray-300 text-white"; // Default color
        }
    };

    return (
        <ul className="w-full overflow-x-hidden overflow-y-auto h-[68vh] flex flex-col gap-3">
            {tasks?.map((task) => (
                <li
                    key={task.id}
                    className={`p-5 rounded-lg bg-white shadow-md transition-transform transform hover:scale-[1.01] flex flex-wrap justify-between items-start`}
                >
                    <div className="flex-1">
                        <h3 className="text-lg text-black font-semibold flex items-center">
                            {task.completed && (
                                <AiOutlineCheckCircle className="text-green-500 mr-2" />
                            )}
                            {task.title}
                            {/* Priority Chip */}
                            <span
                                className={`ml-3 px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(task.priority)}`}
                            >
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                        </h3>
                        <p className="mt-1 text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-normal space-x-3">
                        {/* Toggle Switch */}
                        <label className="flex items-center cursor-pointer">
                            <span className="mr-2 text-black">{!task.completed ? "Pending" : "Completed"}</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCompleteTask(task.id)}
                                    className="hidden"
                                />
                                <div className="toggle-bg w-12 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                                <div
                                    className={`toggle-dot absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform ${task.completed ? "transform translate-x-full bg-green-400" : ""
                                        }`}
                                ></div>
                            </div>
                        </label>
                        <div>
                            <button
                                onClick={() => {
                                    setIsEditing(true);
                                    setEditingTaskId(task.id);
                                    setNewTask({
                                        title: task.title,
                                        description: task.description,
                                        priority: task.priority,
                                    });
                                    setShowModal(true);
                                }}
                                className="p-2 font-bold text-blue-500 hover:bg-blue-100 rounded-full transition-colors"
                            >
                                <AiOutlineEdit size={20} />
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-2 font-extrabold text-red-500 hover:bg-red-100 rounded-full transition-colors"
                            >
                                <AiOutlineDelete size={20} />
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
