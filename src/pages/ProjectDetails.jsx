import React from 'react'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskCard from '../components/TaskCard';
import { detailProjectAPI, taskProjectAPI } from '../services/api';

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchProjectDetails = async () => {

    try {

      setLoading(true);

      // Get project
      const projectResponse = await detailProjectAPI(id);

      setProject(projectResponse.data);

      // Get tasks belonging to this project
      const tasksResponse = await taskProjectAPI(id);

      setTasks(tasksResponse.data);

      setError("");

    } catch (error) {

      console.log(error);

      setError("Failed to load project details.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProjectDetails();

  }, [id]);


  if (loading) {

    return (
      <p className="text-center">
        Loading project...
      </p>
    );

  }


  if (error) {

    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );

  }


  if (!project) {

    return (
      <div className="alert alert-warning">
        Project not found.
      </div>
    );

  }


  return (
    <>
      {/* Back button */}

      <Link
        to="/projects"
        className="btn btn-secondary mb-4"
      >
        ← Back to Projects
      </Link>


      {/* Project Header */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="d-flex justify-content-between">

            <div>

              <h2>
                {project.name}
              </h2>

              <p className="text-muted">
                {project.description}
              </p>

            </div>

            <span className="badge bg-primary align-self-start">
              {project.status}
            </span>

          </div>


          {/* Project Information */}

          <div className="row mt-4">

            <div className="col-md-3">

              <strong>Priority</strong>

              <p>
                {project.priority}
              </p>

            </div>

            <div className="col-md-3">

              <strong>Start Date</strong>

              <p>
                {project.startDate}
              </p>

            </div>

            <div className="col-md-3">

              <strong>Due Date</strong>

              <p>
                {project.dueDate}
              </p>

            </div>

            <div className="col-md-3">

              <strong>Progress</strong>

              <p>
                {project.progress}%
              </p>

            </div>

          </div>


          {/* Progress */}

          <div className="mt-2">

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: `${project.progress}%`
                }}
              >
                {project.progress}%
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Tasks */}

      <div>

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h3>
            Project Tasks
          </h3>

          <span className="badge bg-dark">
            {tasks.length} Tasks
          </span>

        </div>


        {tasks.length === 0 ? (

          <div className="alert alert-info">
            No tasks found for this project.
          </div>

        ) : (

          tasks.map((task) => (

            <TaskCard
              key={task.id}
              task={task}
              project={project}
              showActions={false}
              // onEdit={() => { }}
              // onDelete={() => { }}
            />

          ))

        )}

      </div>

    </>
  )
}

export default ProjectDetails
