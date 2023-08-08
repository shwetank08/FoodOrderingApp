import React from 'react'
import {useRouteError} from "react-router-dom"

const ErrorElement = () => {
    const err = useRouteError();
  return (
    <div>
        <h1>OOPS!!</h1>
        <h1>Something went wrong!!</h1>
        <h3>{err.status}: {err.statusText}</h3>
    </div>
  )
}

export default ErrorElement