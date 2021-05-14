import React from 'react'
import { CharactersManager } from '../../../containers/CharactersManager'
import { CharactersList } from './CharactersList'

export class ListView extends React.Component {
  render() {
    return (
      <CharactersManager>
        {({
          characters,
          isLoading,
          setFilter,
          setItemsPerPage,
          page,
          setPage,
          pagination,
        }) => (
          <div style={{ padding: 15 }}>
            <CharactersList
              characters={characters}
              isLoading={isLoading}
              setFilter={setFilter}
              setItemsPerPage={setItemsPerPage}
              page={page}
              setPage={setPage}
              pagination={pagination}
            />
          </div>
        )}
      </CharactersManager>
    )
  }
}

ListView.propTypes = {}

export default ListView
