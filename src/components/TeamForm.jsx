import React from 'react'
import { useEffect, useState } from "react";

function TeamForm({onSubmit, editingMember, onCancel}) {
     const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: ""
  });

  useEffect(() => {

    if (editingMember) {
      setFormData({
        name: editingMember.name,
        email: editingMember.email,
        role: editingMember.role,
        department: editingMember.department
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "",
        department: ""
      });
    }

  }, [editingMember]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

  };
  return (
    <div className="card mb-4">
       <div className="card-body">

        <h5 className="card-title">
          {editingMember
            ? "Edit Team Member"
            : "Add Team Member"}
        </h5>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Role
            </label>

            <input
              type="text"
              className="form-control"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Department
            </label>

            <select
              className="form-select"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Department
              </option>

              <option value="Development">
                Development
              </option>

              <option value="Design">
                Design
              </option>

              <option value="Management">
                Management
              </option>

              <option value="Testing">
                Testing
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success me-2"
          >
            {editingMember ? "Update" : "Add Member"}
          </button>

          {editingMember && (
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

export default TeamForm
