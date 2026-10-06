import React from 'react'

function TeamCard({ member, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm h-100">
         <div className="card-body">

        <h5 className="card-title">
          {member.name}
        </h5>

        <p className="mb-1">
          <strong>Email:</strong> {member.email}
        </p>

        <p className="mb-1">
          <strong>Role:</strong> {member.role}
        </p>

        <p className="mb-3">
          <strong>Department:</strong> {member.department}
        </p>

        <div className="d-flex gap-2">

          <button
            className="btn btn-primary btn-sm"
            onClick={() => onEdit(member)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(member.id)}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  )
}

export default TeamCard
