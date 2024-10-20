"use client";

import { useState, useEffect, useMemo } from "react";
import Filter from "../components/Filter";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { AiOutlinePlus } from "react-icons/ai";

const initialTasks = [
  // High Priority Tasks
  {
    id: 1,
    title: "Finish the project report",
    description: "Complete the final report for the project.",
    priority: "high",
    completed: true,
  },
  {
    id: 2,
    title: "Review pull requests",
    description: "Check and approve the pending pull requests.",
    priority: "high",
    completed: false,
  },
  {
    id: 3,
    title: "Prepare presentation slides",
    description: "Create slides for the upcoming presentation.",
    priority: "high",
    completed: false,
  },
  {
    id: 4,
    title: "Fix bugs reported by QA",
    description: "Address the bugs reported during the QA testing phase.",
    priority: "high",
    completed: true,
  },

  // Medium Priority Tasks
  {
    id: 5,
    title: "Schedule team meeting",
    description: "Set up a meeting with the team to discuss project updates.",
    priority: "medium",
    completed: false,
  },
  {
    id: 6,
    title: "Update documentation",
    description: "Revise the project documentation for clarity.",
    priority: "medium",
    completed: true,
  },
  {
    id: 7,
    title: "Plan next sprint",
    description: "Outline the tasks for the next sprint.",
    priority: "medium",
    completed: false,
  },
  {
    id: 8,
    title: "Test application features",
    description: "Conduct testing on the latest application features.",
    priority: "medium",
    completed: true,
  },

  // Low Priority Tasks
  {
    id: 9,
    title: "Clean the workspace",
    description: "Organize and clean the desk and files.",
    priority: "low",
    completed: false,
  },
  {
    id: 10,
    title: "Research new technologies",
    description: "Explore new technologies relevant to the project.",
    priority: "low",
    completed: true,
  },
  {
    id: 11,
    title: "Document meeting notes",
    description: "Write down notes from the last team meeting.",
    priority: "low",
    completed: false,
  },
  {
    id: 12,
    title: "Organize project files",
    description: "Sort and archive project files for easier access.",
    priority: "low",
    completed: true,
  },
];


export default function Home() {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    completed: false,
    high: false,
    medium: false,
    low: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // Sorting state

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);



  const handleAddTask = () => {
    const newTaskObject = {
      id: tasks.length + 1,
      ...newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask({ title: "", description: "", priority: "low" });
    setShowModal(false); // Close the modal after adding the task
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTaskObject]));

  };

  const handleEditTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, ...newTask } : task
      )
    );
    setIsEditing(false);
    setEditingTaskId(null);
    setNewTask({ title: "", description: "", priority: "low" });
    setShowModal(false); // Close the modal after editing the task
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to filter tasks based only on active filters
  const filterTasks = (tasks, filters) => {
    return tasks?.filter((task) => {
      let matches = true;

      if (filters?.completed) {
        matches = matches && task?.completed;
      }

      // Check for priority filters
      if (filters.high || filters.medium || filters.low) {
        const high = filters.high ? task.priority === "high" : false;
        const medium = filters.medium ? task.priority === "medium" : false;
        const low = filters.low ? task.priority === "low" : false;

        // If any priority filter is true, at least one must match
        matches = matches && (high || medium || low);
      }

      return matches; // Return true if the task matches all filters
    });
  };


  // Function to sort tasks based on the selected sortOrder
  const sortTasks = (tasks, sortOrder) => {
    return tasks?.sort((a, b) => {
      if (sortOrder === "high-to-low") {
        return a.priority === "high"
          ? -1
          : a.priority === "medium"
            ? (b.priority === "high" ? 1 : -1)
            : 1;
      } else {
        return a.priority === "low"
          ? -1
          : a.priority === "medium"
            ? (b.priority === "low" ? 1 : -1)
            : 1;
      }
    });
  };


  const tasklist = useMemo(() => {
    let temp = tasks;
    if (Object.values(filters).some((value) => value)) {
      temp = filterTasks(temp, filters)
    }
    if (sortOrder) {
      temp = sortTasks(temp, sortOrder)
    }
    if (searchQuery) {
      temp = temp?.filter((el) => el?.title?.includes(searchQuery) || el?.description?.includes(searchQuery))
    }
    return temp;

  }, [tasks, filters, sortOrder, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Task Management App
        </h1>

        {/* Search Bar and Sort Dropdown */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-5 items-center">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <Filter filters={filters} setFilters={setFilters} />
          </div>

          <div className="flex gap-2 items-center">


            <button
              onClick={() => setShowModal(true)}
              className="ml-2 bg-blue-500  text-white p-2 font-bold rounded-full"
            >
              <AiOutlinePlus size={20} className="text-2xl font-bold" />
            </button>
          </div>
        </div>
        <div className="flex justify-end mb-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sort by priority</option>

            <option value="high-to-low">Priority: High to Low</option>
            <option value="low-to-high">Priority: Low to High</option>
          </select>
        </div>
        {/* Task List */}
        {tasklist?.length !== 0 ? (
          <TaskList
            tasks={tasklist}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            setIsEditing={setIsEditing}
            setEditingTaskId={setEditingTaskId}
            setNewTask={setNewTask}
            setShowModal={setShowModal}
          />
        ) : (
          <div className="text-center">No Task Found</div>
        )}

        {/* Task Form Modal */}
        <TaskForm
          showModal={showModal}
          setShowModal={setShowModal}
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
