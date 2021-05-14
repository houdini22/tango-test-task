import { connect } from 'react-redux'
import { BlankPageLayout } from './BlankPageLayout'
import {
  actions as commonActions,
  selectors as commonSelectors,
} from '../../reducers/common'
import { bindActionCreators } from 'redux'

const { setConnectionErrorModalVisible, setLayoutOption } = commonActions

const mapStateToProps = (state) => ({
  common: commonSelectors['getState'](state),
})

const BlankPageLayoutContainer = connect(mapStateToProps, (dispatch) => {
  return bindActionCreators(
    {
      setConnectionErrorModalVisible,
    },
    dispatch,
  )
})(BlankPageLayout)

export { BlankPageLayoutContainer }
export default { BlankPageLayoutContainer }
