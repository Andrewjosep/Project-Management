import React from 'react'
import { useEffect, useState } from "react";
import TeamCard from '../components/TeamCard';
import TeamForm from '../components/TeamForm';
import { allTeamAPI, deleteTeamAPI, postTeamAPI, putTeamAPI } from '../services/api';

function Team() {
   const [members, setMembers] = useState([]);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [editingMember, setEditingMember] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

      // GET team members
  const fetchMembers = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await allTeamAPI();

      setMembers(response.data);

    } catch (error) {

      setError("Failed to load team members.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // POST / PUT
  const handleSubmit = async (member) => {

    try {

      if (editingMember) {

        const response = await putTeamAPI(editingMember.id,member);
        setMembers(
          members.map((item) =>
            item.id === editingMember.id
              ? response.data
              : item
          )
        );

      } else {

        const response = await postTeamAPI(member)

        setMembers([
          ...members,
          response.data
        ]);

      }

      setEditingMember(null);
      setShowForm(false);

    } catch (error) {

      setError("Failed to save team member.");

    }

  };

  // EDIT
  const handleEdit = (member) => {

    setEditingMember(member);
    setShowForm(true);

  };

  // DELETE
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this team member?"
      );

    if (!confirmDelete) return;

    try {

      await deleteTeamAPI(id);

      setMembers(
        members.filter(
          (member) => member.id !== id
        )
      );

    } catch (error) {

      setError("Failed to delete team member.");

    }

  };

  // CANCEL
  const handleCancel = () => {

    setEditingMember(null);
    setShowForm(false);

  };

  // FILTER
  const filteredMembers = members.filter((member) => {

    const matchesSearch =
      member.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      member.department === departmentFilter;

    return (
      matchesSearch &&
      matchesDepartment
    );

  });

  return (
    <>
        <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2>Team</h2>

          <p className="text-muted">
            Manage project team members
          </p>
        </div>

        <button
          className="btn btn-success"
          onClick={() => {
            setEditingMember(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "Add Member"}
        </button>

      </div>

      {showForm && (
        <TeamForm
          onSubmit={handleSubmit}
          editingMember={editingMember}
          onCancel={handleCancel}
        />
      )}

      <div className="row mb-4">

        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search team member..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="col-md-4">

          <select
            className="form-select"
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
          >
            <option value="All">
              All Departments
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

      </div>

      {loading && (
        <p>Loading team members...</p>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && filteredMembers.length === 0 && (
        <p className="text-muted">
          No team members found.
        </p>
      )}

      <div className="row g-4">

        {filteredMembers.map((member) => (

          <div
            className="col-md-6 col-lg-4"
            key={member.id}
          >

            <TeamCard
              member={member}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </div>

        ))}

      </div>

    </>
  )
}

export default Team
