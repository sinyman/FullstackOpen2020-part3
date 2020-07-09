import React from 'react'

const People = ({people, deleteButtonClick}) => {
  const listPeople = () => {
    return (
      people.map(person =>
        <div key={person.id}>
          <li>
            {person.name} {person.number}
            <button id={person.id} type="submit" onClick={deleteButtonClick} >Delete</button>
          </li>
        </div>
      )
    )
  }

  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {listPeople()}
      </ul>
    </div>
  )
}

export default People
