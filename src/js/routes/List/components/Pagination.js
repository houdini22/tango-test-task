import React from 'react'
import { ButtonGroup } from '../../../components/ui/ButtonGroup'
import { Button } from '../../../components/ui/Button'

class Pagination extends React.Component {
  render() {
    const { page, setPage, pagination } = this.props

    return (
      <ButtonGroup>
        {pagination['first'] && (
          <Button
            onClick={() => {
              setPage(pagination['first'])
            }}
          >
            First page
          </Button>
        )}
        {pagination['prev'] && (
          <Button
            onClick={() => {
              setPage(pagination('prev'))
            }}
          >
            Previous page
          </Button>
        )}
        {pagination['next'] && (
          <Button
            onClick={() => {
              setPage(pagination['next'])
            }}
          >
            Next page
          </Button>
        )}
        {pagination['last'] && (
          <Button
            onClick={() => {
              setPage(pagination['last'])
            }}
          >
            Last page
          </Button>
        )}
      </ButtonGroup>
    )
  }
}

export { Pagination }
export default { Pagination }
