import React from 'react'
import { Row } from '../../../components/ui/Row'
import { Col } from '../../../components/ui/Col'
import { Select } from '../../../components/form/Select'
import { Pagination } from './Pagination'

class CharactersFooter extends React.Component {
  render() {
    const { setItemsPerPage, page, setPage, pagination } = this.props

    return (
      <>
        <Row>
          <Col xs={3}>
            <strong>Items per page:</strong>
          </Col>
          <Col xs={9}>
            <Select
              name="items_per_page"
              options={[
                {
                  label: 5,
                  value: 5,
                },
                {
                  label: 10,
                  value: 10,
                  selected: true,
                },
                {
                  label: 15,
                  value: 15,
                },
                {
                  label: 20,
                  value: 20,
                },
                {
                  label: 25,
                  value: 25,
                },
              ]}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
              }}
            ></Select>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Pagination page={page} setPage={setPage} pagination={pagination} />
          </Col>
        </Row>
      </>
    )
  }
}

export { CharactersFooter }
export default { CharactersFooter }
