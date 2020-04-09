import devConfig from './dev.env'
import proConfig from './pro.env'
import testConfig from './test.env'
let envConfig = {}
if (process.env.NODE_ENV === 'production') {
  if (process.env.BUILD_ENV === 'test') {
    envConfig = testConfig
  } else if (process.env.BUILD_ENV === 'prod') {
    envConfig = proConfig
  }
} else if (process.env.NODE_ENV === 'development') {
  envConfig = devConfig
}

export default envConfig
