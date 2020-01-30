const express = require('express')
const app = express()
const port = 3000
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//middleware
const middleware = require('./middlewares/middleware')
//routes
const routes = require('./routes')
//view
app.use(express.static(__dirname))
app.set('view engine','ejs')
app.use(cookieParser('keyboard cat'))
app
  .use(
    session(
      {
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized:true,
        cookie: {maxAge: 60000}       
      }
    )
  )
app.use(flash())
app.use(express.urlencoded({extended:true}))
app.locals.user = null


app.use('/admin',routes.admin)
app.use('/',middleware.checkSession,routes.app)

app.listen(port, () => console.log(`app listening on port ${port}!`))
