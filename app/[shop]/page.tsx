import React from 'react'

const page = ({params}: {params : { shop : string}} ) => {
  return (
    <div>{params.shop}</div>
  )
}

export default page