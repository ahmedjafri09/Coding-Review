import dev from './dev'
import prod from './prod'

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev

const configApp = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
}

export default configApp
