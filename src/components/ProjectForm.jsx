import React from 'react'
import { useEffect, useState } from "react";

function ProjectForm({ onSubmit, editingProject, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        startDate: "",
        dueDate: "",
        progress: 0
    });

    useEffect(() => { if (editingProject) { setFormData(editingProject); } }, [editingProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({ ...formData, progress: Number(formData.progress) });

        if (!editingProject) {
            setFormData({
                name: "",
                description: "",
                status: "Pending",
                priority: "Medium",
                startDate: "",
                dueDate: "",
                progress: 0
            });
        }

    };
    return (
        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <h4 className="mb-4">
                    {editingProject ? "Edit Project" : "Add Project"}
                </h4>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Project Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                        <div className="col-md-4 mb-3">

                            <label className="form-label">
                                Status
                            </label>

                            <select
                                name="status"
                                className="form-select"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>

                        </div>

                        <div className="col-md-4 mb-3">

                            <label className="form-label">
                                Priority
                            </label>

                            <select
                                name="priority"
                                className="form-select"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>

                        </div>

                        <div className="col-md-4 mb-3">

                            <label className="form-label">
                                Progress (%)
                            </label>

                            <input
                                type="number"
                                name="progress"
                                className="form-control"
                                min="0"
                                max="100"
                                value={formData.progress}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Start Date
                            </label>

                            <input
                                type="date"
                                name="startDate"
                                className="form-control"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

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

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >
                        {editingProject ? "Update Project" : "Add Project"}
                    </button>

                    {editingProject && (
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

export default ProjectForm
