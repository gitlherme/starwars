import { useEffect, useState } from 'react'
import { genericController, PageableResponse, PageData } from './api/generic-api';
import React from 'react';
import { People } from './api/schemas/people';

export const App = () => {
  const { getAll } = genericController<People>('people')
  const [people, setPeople] = useState<People[]>();
  const [page, setPage] = useState<PageData>();
  useEffect(() => {
    getAll(1).then(value => {
      setPeople(value.data);
      setPage(value.page);
    })
  }, [])

  if (people) {
    return(
      <>
      <div>Paginação anterior: {page?.previous} - Próximo: {page?.next}</div>
      {people.map(person=><div>{person.name}</div>)}
      </>
    )
  } else {
    return (<div></div>)
  }
}