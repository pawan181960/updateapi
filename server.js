const express=require ("express");
var app=express();
var hbs= require('express-handlebars');
app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: '',
  layoutsDir: __dirname + '/views'
}));
app.listen(5000,()=>{
  console.log("server started....");
})
 app.set('view engine','hbs'); 

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));
const Login=require('./model/login');
const additems=require('./model/items');
const URL="mongodb://localhost:27017/food";
const mongoose=require('mongoose');
mongoose.connect(URL);


app.get('/page',(request,response)=>{
	response.render('page')
})
app.get('/Items',(request,response)=>{
  response.render('Items');
})
app.post('/Items',(request,response)=>{
    var additem=additems( {
    lat:request.body.lat,
    long:request.body.long
});
additem.save().then(data=>{
  additems.find((err,result)=>{
    console.log(result);
    if(err)throw err;
      else
      response.render('viewitems',{items:result});   
      })
      });

app.get('/viewitems',(request,response)=>{
  additems.find(function(err,result){
    if(err)throw err;
    else
    response.render('viewitems',{items:result});
  });

});
app.get('/updated',(request,response)=>{
  additems.findOne({_id:request.query.id},(err,result)=>{                
   if(err) throw err;
    else
      response.render('updateitems',{item:result});
  });  
});     
});

app.post('/updateAction',(request,response)=>{
  additems.findByIdAndUpdate(request.body.id,{
    lat:request.body.lat,
    long:request.body.long,
  },(err)=>{
      if(err) throw err;
    else{
      additems.find((err,result)=>{
        if(err) throw err;
        else
        response.render('viewitems',{items:result,msg:'Data Updated'});
      });
    }
  });
});

