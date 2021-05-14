import React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { CharactersFilters } from './CharactersFilters'
import { CharactersData } from './CharactersData'
import { CharactersFooter } from './CharactersFooter'

class CharactersList extends React.Component {
  render() {
    const {
      characters,
      isLoading,
      setFilter,
      setItemsPerPage,
      page,
      setPage,
      pagination,
    } = this.props

    return (
      <Card>
        <CharactersFilters setFilter={setFilter} />
        <CharactersData characters={characters} />
        <CharactersFooter
          setItemsPerPage={setItemsPerPage}
          page={page}
          setPage={setPage}
          pagination={pagination}
        />
        {isLoading && <LoadingOverlay />}
      </Card>
    )
  }
}

export { CharactersList }
export default { CharactersList }
