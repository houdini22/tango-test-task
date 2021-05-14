import React from 'react'
import { Switch, withRouter, HashRouter as Router } from 'react-router-dom'

import { BlankPageLayout } from './layouts'

import { ListView } from './routes/List'
import { BookView } from './routes/Book'

const AppContainer = () => (
  <Router>
    <Switch>
      <BlankPageLayout path="/book/:id" component={BookView} />
      <BlankPageLayout exact path="/" component={ListView} />
    </Switch>
  </Router>
)

export const App = withRouter(AppContainer)
export default App
