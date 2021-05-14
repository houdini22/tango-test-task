import React from 'react'
import { BookDetails } from './BookDetails'

class BookView extends React.Component {
  render() {
    return (
      <div style={{ padding: 15 }}>
        <BookDetails bookId={this.props.match.params.id} />
      </div>
    )
  }
}

export { BookView }
export default { BookView }
