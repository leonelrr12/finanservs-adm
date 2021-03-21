import React from 'react'

const MissingRoute = (props) => {
  const {type, message, setMsg} = props

  setTimeout(() => {
    setMsg(null)
  }, 2000)  

  return ( 
    <div className={"alert alert-" + type + " mt-3 " + (message ? "d-block" : "d-none")} role="alert">
      {message}
    </div>
   )
}
 
export default MissingRoute;