import React from 'react'
import { useEffect, useState } from "react";
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import { allProjectAPI, allTasksAPI, allTeamAPI, deleteTasksAPI, postTasksAPI, putTasksAPI } from '../services/api';
function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [projectFilter, setProjectFilter] = useState("All");

  const [editingTask, setEditingTask] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [team, setTeam] = useState([]);

  // GET TASKS AND PROJECTS

  const fetchData = async () => {

    try {

      setLoading(true);

      const [tasksResponse, projectsResponse, teamResponse] = await Promise.all([allTasksAPI(), allProjectAPI(), allTeamAPI()]); //Api fetching

      setTasks(tasksResponse.data);

      setProjects(projectsResponse.data);

      setTeam(teamResponse.data);

      setError("");

    } catch (error) {

      console.log(error);

      setError("Failed to load tasks.");

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchData();

  }, []);

  const handleSubmit = async (task) => {

    try {

      if (editingTask) {

        const response = await putTasksAPI(editingTask.id,task); 

        setTasks(
          tasks.map((item) =>
            item.id === editingTask.id
              ? response.data
              : item
          )
        );

        setEditingTask(null);

      } else {

        const response = await postTasksAPI(task);

        setTasks([...tasks,response.data]);

      }

      setShowForm(false);

    } catch (error) {

      console.log(error);

      setError("Failed to save task.");

    }

  };

  // DELETE TASK

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteTasksAPI(id);

      setTasks(
        tasks.filter((task) => task.id !== id)
      );

    } catch (error) {

      console.log(error);

      setError("Failed to delete task.");

    }

  };


  // EDIT TASK

  const handleEdit = (task) => {

    setEditingTask(task);

    setShowForm(true);

  };


  // CANCEL

  const handleCancel = () => {

    setEditingTask(null);

    setShowForm(false);

  };


  // FIND PROJECT

  const getProject = (projectId) => {

    return projects.find(
      (project) => project.id === projectId
    );

  };


  // SEARCH + FILTER

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesProject =
      projectFilter === "All" ||
      task.projectId === Number(projectFilter);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesProject
    );

  });

  const getTeamMember = (memberId) => {

  return team.find(
    (member) => member.id === memberId
  );

};

  return (
     <div>

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>
            Tasks
          </h2>

          <p className="text-muted">
            Manage all project tasks
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={() => {

            setEditingTask(null);

            setShowForm(!showForm);

          }}
        >
          {showForm ? "Close Form" : "+ Add Task"}
        </button>

      </div>


      {/* FORM */}

      {showForm && (

        <TaskForm
          onSubmit={handleSubmit}
          editingTask={editingTask}
          onCancel={handleCancel}
          projects={projects}
          team={team}
        />

      )}


      {/* SEARCH */}

      <div className="row mb-3">

        <div className="col-md-6">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

        </div>


        {/* STATUS FILTER */}

        <div className="col-md-2">

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>


        {/* PRIORITY FILTER */}

        <div className="col-md-2">

          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >

            <option value="All">
              All Priority
            </option>

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

        </div>


        {/* PROJECT FILTER */}

        <div className="col-md-2">

          <select
            className="form-select"
            value={projectFilter}
            onChange={(e) =>
              setProjectFilter(e.target.value)
            }
          >

            <option value="All">
              All Projects
            </option>

            {projects.map((project) => (

              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>

            ))}

          </select>

        </div>

      </div>


      {/* ERROR */}

      {error && (

        <div className="alert alert-danger">
          {error}
        </div>

      )}


      {/* LOADING */}

      {loading && (

        <p className="text-center">
          Loading tasks...
        </p>

      )}


      {/* NO TASKS */}

      {!loading && filteredTasks.length === 0 && (

        <div className="alert alert-info">
          No tasks found.
        </div>

      )}


      {/* TASK LIST */}

      {!loading && filteredTasks.length > 0 && (

        <div>

          {filteredTasks.map((task) => (

            <TaskCard
              key={task.id}
              task={task}
              project={getProject(task.projectId)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              member={getTeamMember(task.assignedTo)}
            />

          ))}

        </div>

      )}

    </div>
  )
}

export default Tasks
