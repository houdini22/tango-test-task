import React from 'react'
import { Table, Typography } from '../../../components'
import { Link } from 'react-router-dom'

class CharactersData extends React.Component {
  render() {
    const { characters } = this.props

    return (
      <>
        <Typography.Container>
          <h1>Data</h1>
        </Typography.Container>
        <Table.Container>
          <Table.THead>
            <Table.Tr>
              <Table.Th xs={3}>Name</Table.Th>
              <Table.Th xs={3}>Gender</Table.Th>
              <Table.Th xs={2}>Culture</Table.Th>
              <Table.Th xs={2}>Books</Table.Th>
              <Table.Th xs={2}>Seasons</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {characters.map((character) => {
              return (
                <Table.Tr key={character['url']}>
                  <Table.Td xs={3}>
                    {character['name'] === '' && <span>---</span>}
                    {character['name'] !== '' && (
                      <span>{character['name']}</span>
                    )}
                    <br />
                    {character['aliases'].join(', ')}
                  </Table.Td>
                  <Table.Td xs={3}>{character['gender']}</Table.Td>
                  <Table.Td xs={2}>
                    {character['culture'] === '' && <span>Unknown</span>}
                    {character['culture'] !== '' && (
                      <span>{character['culture']}</span>
                    )}
                  </Table.Td>
                  <Table.Td xs={2}>
                    {character['books'].map((url) => {
                      const split = url.split(/\//)
                      const id = split[split.length - 1]

                      return (
                        <p>
                          <Link to={`/book/${id}`}>{id}</Link>
                        </p>
                      )
                    })}
                  </Table.Td>
                  <Table.Td xs={2}>{character['tvSeries'].length}</Table.Td>
                </Table.Tr>
              )
            })}
          </Table.TBody>
        </Table.Container>
      </>
    )
  }
}

export { CharactersData }
export default { CharactersData }
