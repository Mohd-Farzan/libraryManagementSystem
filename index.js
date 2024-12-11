const express = require('express')
const app = express()
const userHomeRoute=require('./routes/user-home-routes')
const db = require('./config/db')
const bookRoutes=require('./routes/bookRoutes')
const authRoutes=require('./routes/auth-routes')
const maintenanceRoutes = require('./routes/maintenanceRoutes')
const transactionRoutes = require('./routes/transectionRoutes')
const adminRoutes = require('./routes/adminRoutes')
const path = require('path')
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));

const PORT=2000
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use("/user/",userHomeRoute)
app.use('/', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/transactions', transactionRoutes);
app.get('/', (req, res) => {
    res.render('home');
  });
app.use('/', adminRoutes);





app.listen(PORT,() => {
    console.log("Listening on Port",PORT);
    
})