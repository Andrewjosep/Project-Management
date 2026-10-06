import React from 'react'
import { useEffect, useState } from "react";

function TaskForm({ onSubmit, editingTask, onCancel, projects, team }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        projectId: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
        assignedTo: ""
    });

    useEffect(() => {
        if (editingTask) {

            setFormData({
                title: editingTask.title,
                description: editingTask.description,
                projectId: String(editingTask.projectId),
                priority: editingTask.priority,
                status: editingTask.status,
                dueDate: editingTask.dueDate,
                assignedTo: editingTask.assignedTo
                    ? String(editingTask.assignedTo)
                    : ""
            });

        } else {

            setFormData({
                title: "",
                description: "",
                projectId: "",
                priority: "Medium",
                status: "Pending",
                dueDate: "",
                assignedTo: ""
            });

        }

    }, [editingTask]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({
            ...formData,
            projectId: Number(formData.projectId),
            assignedTo: formData.assignedTo
                ? Number(formData.assignedTo)
                : ""
        });

    };
    return (
        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <h4 className="mb-4">
                    {editingTask ? "Edit Task" : "Add Task"}
                </h4>

                <form onSubmit={handleSubmit}>

                    {/* Title */}

                    <div className="mb-3">

                        <label className="form-label">
                            Task Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="row">

                        {/* Project */}

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Project
                            </label>

                            <select
                                name="projectId"
                                className="form-select"
                                value={formData.projectId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Project
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


                        {/* Status */}

                        <div className="col-md-3 mb-3">

                            <label className="form-label">
                                Status
                            </label>

                            <select
                                name="status"
                                className="form-select"
                                value={formData.status}
                                onChange={handleChange}
                            >

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


                        {/* Priority */}

                        <div className="col-md-3 mb-3">

                            <label className="form-label">
                                Priority
                            </label>

                            <select
                                name="priority"
                                className="form-select"
                                value={formData.priority}
                                onChange={handleChange}
                            >

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

                    </div>


                    {/* Due Date */}

                    <div className="mb-3">

                        <label className="form-label">
                            Due Date
                        </label>

                        <input
                            type="date"
                            name="dueDate"
                            className="form-control"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Assign To
                        </label>

                        <select
                            className="form-select"
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Team Member
                            </option>

                            {team.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name} - {member.role}
                                </option>
                            ))}

                        </select>

                    </div>


                    {/* Buttons */}

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >
                        {editingTask ? "Update Task" : "Add Task"}
                    </button>

                    {editingTask && (

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </div>

        </div>
    )
}

export default TaskForm
