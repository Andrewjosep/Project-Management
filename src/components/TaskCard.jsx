import React from 'react'

function TaskCard({ task, project, onEdit, onDelete, showActions = true, member }) {
    return (
        <div className="card mb-3 shadow-sm">

            <div className="card-body">

                <div className="d-flex justify-content-between">

                    <div>

                        <h5 className="card-title">
                            {task.title}
                        </h5>

                        <p className="text-muted">
                            {task.description}
                        </p>

                        <p className="mb-1">
                            <strong>Assigned To:</strong>{" "}
                            {member ? member.name : "Unassigned"}
                        </p>

                    </div>

                    <span className="badge bg-secondary align-self-start">
                        {task.status}
                    </span>

                </div>


                <div className="row mt-3">

                    <div className="col-md-3">

                        <small className="text-muted">
                            Project
                        </small>

                        <p className="mb-0">
                            {project ? project.name : "Unknown"}
                        </p>

                    </div>


                    <div className="col-md-3">

                        <small className="text-muted">
                            Priority
                        </small>

                        <p className="mb-0">
                            {task.priority}
                        </p>

                    </div>


                    <div className="col-md-3">

                        <small className="text-muted">
                            Due Date
                        </small>

                        <p className="mb-0">
                            {task.dueDate}
                        </p>

                    </div>


                    <div className="col-md-3">

                        {showActions && (
                            <div className="d-flex gap-2">

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => onEdit(task)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(task.id)}
                                >
                                    Delete
                                </button>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default TaskCard
