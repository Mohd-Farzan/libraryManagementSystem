const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://ansarifarzan681:F8BwJ1cPqwiRyIeL@cluster0.usnxh.mongodb.net/library?retryWrites=true&w=majority")
.then(function(){
    console.log('database connected');
})
.catch(function(err){
    console.log(err);
})

module.exports=mongoose.connection;