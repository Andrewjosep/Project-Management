import React from 'react'
import { useEffect, useState } from "react";
import { allProjectAPI, allTasksAPI, allTeamAPI } from '../services/api';

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        setLoading(true);
        setError("");

        const [
          projectsResponse,
          tasksResponse,
          teamResponse
        ] = await Promise.all([
          allProjectAPI(),
          allTasksAPI(),
          allTeamAPI()
        ]);

        setProjects(projectsResponse.data);
        setTasks(tasksResponse.data);
        setTeam(teamResponse.data);

      } catch (error) {

        setError("Failed to load dashboard data.");

      } finally {

        setLoading(false);

      }

    };

    fetchDashboardData();

  }, []);

  // -------------------------
  // PROJECT STATISTICS
  // -------------------------

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const activeProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  // -------------------------
  // TASK STATISTICS
  // -------------------------

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  // -------------------------
  // RECENT TASKS
  // -------------------------

  const recentTasks = [...tasks]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  // -------------------------
  // PROJECT LOOKUP
  // -------------------------

  const getProject = (projectId) => {

    return projects.find(
      (project) => project.id === projectId
    );

  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  return (
    <>
    {/* Header */}

      <div className="mb-4">

        <h2>Dashboard</h2>

        <p className="text-muted">
          Overview of your projects, tasks and team
        </p>

      </div>


      {/* Statistics */}

      <div className="row g-4 mb-4">

        {/* Total Projects */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <p className="text-muted mb-1">
                Total Projects
              </p>

              <h2 className="mb-0">
                {totalProjects}
              </h2>

            </div>

          </div>

        </div>


        {/* Completed Projects */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <p className="text-muted mb-1">
                Completed Projects
              </p>

              <h2 className="mb-0">
                {completedProjects}
              </h2>

            </div>

          </div>

        </div>


        {/* Total Tasks */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <p className="text-muted mb-1">
                Total Tasks
              </p>

              <h2 className="mb-0">
                {totalTasks}
              </h2>

            </div>

          </div>

        </div>


        {/* Team Members */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <p className="text-muted mb-1">
                Team Members
              </p>

              <h2 className="mb-0">
                {team.length}
              </h2>

            </div>

          </div>

        </div>

      </div>


      {/* Second Row */}

      <div className="row g-4 mb-4">

        {/* Active Projects */}

        <div className="col-md-4">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6 className="text-muted">
                Active Projects
              </h6>

              <h3>
                {activeProjects}
              </h3>

            </div>

          </div>

        </div>


        {/* Pending Tasks */}

        <div className="col-md-4">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6 className="text-muted">
                Pending Tasks
              </h6>

              <h3>
                {pendingTasks}
              </h3>

            </div>

          </div>

        </div>


        {/* In Progress Tasks */}

        <div className="col-md-4">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6 className="text-muted">
                Tasks In Progress
              </h6>

              <h3>
                {inProgressTasks}
              </h3>

            </div>

          </div>

        </div>

      </div>


      {/* Main Dashboard Content */}

      <div className="row g-4">


        {/* Project Progress */}

        <div className="col-lg-7">

          <div className="card shadow-sm">

            <div className="card-body">

              <h5 className="mb-4">
                Project Progress
              </h5>

              {projects.length === 0 ? (

                <p className="text-muted">
                  No projects available.
                </p>

              ) : (

                projects.map((project) => (

                  <div
                    key={project.id}
                    className="mb-4"
                  >

                    <div className="d-flex justify-content-between mb-1">

                      <span>
                        {project.name}
                      </span>

                      <span>
                        {project.progress}%
                      </span>

                    </div>

                    <div className="progress">

                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${project.progress}%`
                        }}
                      >
                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>


        {/* Task Statistics */}

        <div className="col-lg-5">

          <div className="card shadow-sm">

            <div className="card-body">

              <h5 className="mb-4">
                Task Statistics
              </h5>


              {/* Completed */}

              <div className="mb-3">

                <div className="d-flex justify-content-between">

                  <span>
                    Completed
                  </span>

                  <strong>
                    {completedTasks}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-success"
                    style={{
                      width:
                        totalTasks > 0
                          ? `${(completedTasks / totalTasks) * 100}%`
                          : "0%"
                    }}
                  />

                </div>

              </div>


              {/* In Progress */}

              <div className="mb-3">

                <div className="d-flex justify-content-between">

                  <span>
                    In Progress
                  </span>

                  <strong>
                    {inProgressTasks}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width:
                        totalTasks > 0
                          ? `${(inProgressTasks / totalTasks) * 100}%`
                          : "0%"
                    }}
                  />

                </div>

              </div>


              {/* Pending */}

              <div>

                <div className="d-flex justify-content-between">

                  <span>
                    Pending
                  </span>

                  <strong>
                    {pendingTasks}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-danger"
                    style={{
                      width:
                        totalTasks > 0
                          ? `${(pendingTasks / totalTasks) * 100}%`
                          : "0%"
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Recent Tasks */}

      <div className="card shadow-sm mt-4">

        <div className="card-body">

          <h5 className="mb-4">
            Recent Tasks
          </h5>

          {recentTasks.length === 0 ? (

            <p className="text-muted">
              No tasks available.
            </p>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover">

                <thead>

                  <tr>

                    <th>
                      Task
                    </th>

                    <th>
                      Project
                    </th>

                    <th>
                      Priority
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Due Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentTasks.map((task) => {

                    const project =
                      getProject(task.projectId);

                    return (

                      <tr key={task.id}>

                        <td>
                          {task.title}
                        </td>

                        <td>
                          {project
                            ? project.name
                            : "Unknown Project"}
                        </td>

                        <td>
                          {task.priority}
                        </td>

                        <td>
                          {task.status}
                        </td>

                        <td>
                          {task.dueDate}
                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </>
  )
}

export default Dashboard
