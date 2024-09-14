import React from 'react'

const DetailPage = ({params}: {params: {id: string}}) => {

    const id = params.id || 'no id'
  return (
    <div>DetailPage--{id}</div>
  )
}

export default DetailPage