import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if(message.split(":")[0] === "Error") {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

export default Notification
