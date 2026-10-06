import React from 'react'

function SearchBar({ search, setSearch }) {
  return (
    <div>
       <input type="text" className="form-control" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}/>
    </div>
  )
}

export default SearchBar
