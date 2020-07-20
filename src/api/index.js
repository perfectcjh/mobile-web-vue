import * as app from './app.js'
import * as user from './user'
import * as order from './order'
import * as auth from './auth'
import * as account from './account'
import * as upload from './upload'
import * as ocr from './ocr.js'
import * as customer from './customer.js'
import * as search from './search.js'
import * as car from './car.js'

export default {
  ...app,
  ...user,
  ...order,
  ...auth,
  ...account,
  ...upload,
  ...ocr,
  ...customer,
  ...search,
  ...car
}
