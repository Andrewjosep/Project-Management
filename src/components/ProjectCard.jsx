import React from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({ project, onEdit, onDelete }) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                    <h5 className="card-title">
                        {project.name}
                    </h5>

                    <span className="badge bg-secondary">
                        {project.status}
                    </span>

                </div>

                <p className="card-text text-muted">
                    {project.description}
                </p>

                <p className="mb-1">
                    <strong>Priority:</strong>{" "}
                    {project.priority}
                </p>

                <p className="mb-1">
                    <strong>Start Date:</strong>{" "}
                    {project.startDate}
                </p>

                <p className="mb-3">
                    <strong>Due Date:</strong>{" "}
                    {project.dueDate}
                </p>

                <div className="mb-3">

                    <div className="d-flex justify-content-between">
                        <small>Progress</small>
                        <small>{project.progress}%</small>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{ width: `${project.progress}%` }}
                        >
                            {project.progress}%
                        </div>
                    </div>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        to={`/projects/${project.id}`}
                        className="btn btn-success btn-sm"
                    >
                        View
                    </Link>

                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onEdit(project)}
                    >
                        Edit
                    </button>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(project.id)}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ProjectCard
