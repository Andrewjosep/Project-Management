import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectForm from '../components/ProjectForm'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'
import { addProjectAPI, allProjectAPI, deleteProjectApi, updateProjectAPI } from '../services/api'

function Projects() {
  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [editingProject, setEditingProject] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // GET PROJECTS
  const fetchProjects = async () => {

    try {

      setLoading(true);

      const response = await allProjectAPI();

      setProjects(response.data);

      setError("");

    } catch (error) {

      console.log(error);

      setError("Failed to load projects.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProjects();
  }, []);

   // ADD / UPDATE PROJECT
  const handleSubmit = async (project) => {

    try {

      if (editingProject) {

        const response = await updateProjectAPI(editingProject.id,project)

        setProjects(
          projects.map((item) =>
            item.id === editingProject.id
              ? response.data
              : item
          )
        );

        setEditingProject(null);

      } else {

        const response = await addProjectAPI(project)

        setProjects([
          ...projects,
          response.data
        ]);

      }

      setShowForm(false);

    } catch (error) {

      console.log(error);

      setError("Failed to save project.");

    }

  };

   // DELETE PROJECT
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteProjectApi(id);

      setProjects(
        projects.filter((project) => project.id !== id)
      );

    } catch (error) {

      console.log(error);

      setError("Failed to delete project.");

    }

  };

  // EDIT PROJECT
  const handleEdit = (project) => {

    setEditingProject(project);

    setShowForm(true);

  };

  // CANCEL EDIT
  const handleCancel = () => {

    setEditingProject(null);

    setShowForm(false);

  };

  // SEARCH + FILTER
  const filteredProjects = projects.filter((project) => {

    const matchesSearch =
      project.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      project.status === filter;

    return matchesSearch && matchesFilter;

  });


  return (
    <div>
    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2>Projects</h2>
          <p className="text-muted">
            Manage all your projects
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingProject(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "+ Add Project"}
        </button>

      </div>


      {/* FORM */}

      {showForm && (
        <ProjectForm
          onSubmit={handleSubmit}
          editingProject={editingProject}
          onCancel={handleCancel}
        />
      )}


      {/* SEARCH + FILTER */}

      <div className="row mb-4">

        <div className="col-md-8 mb-2">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

        </div>

        <div className="col-md-4">

          <Filter
            filter={filter}
            setFilter={setFilter}
          />

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
          Loading projects...
        </p>
      )}


      {/* PROJECTS */}

      {!loading && filteredProjects.length === 0 && (
        <div className="alert alert-info">
          No projects found.
        </div>
      )}


      {!loading && filteredProjects.length > 0 && (

        <div className="row g-4">

          {filteredProjects.map((project) => (

            <div
              className="col-md-6 col-lg-4"
              key={project.id}
            >

              <ProjectCard
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

            </div>

          ))}

        </div>

      )}
    </div>
  )
}

export default Projects
