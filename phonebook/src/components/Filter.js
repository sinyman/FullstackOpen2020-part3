import React from 'react'

const Filter = ({ searchPeople, newSearch, handleSearchChange }) => {

  return (
    <div>
      <p>filter shown with:</p>
      <form onSubmit={searchPeople}>
        <input value={newSearch} onChange={handleSearchChange} />
      </form>
    </div>
  )
}

export default Filter
