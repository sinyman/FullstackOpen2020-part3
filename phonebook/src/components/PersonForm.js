import React from 'react'

const PersonForm = ({ savePerson, newName, newNumber, handleTextChange, handleNumberChange }) => {

  return (
    <div>
      <h3>Add new number</h3>
      <form onSubmit={savePerson}>
        <div>
          name: <input value={newName} onChange={handleTextChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
