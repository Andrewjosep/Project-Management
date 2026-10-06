import React from 'react'

function Filter({ filter, setFilter }) {
    return (
        <div>
            <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>

                <option value="All">
                    All Status
                </option>

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
    )
}

export default Filter
