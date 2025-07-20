const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
var exampletxt = "working fine";
var items =[];
app.get('/',(req,res)=>{
   const selectedpriority = req.query.priority ||"all";
   let tasks = items
   if(selectedpriority !== "all")
   {
     tasks = items.filter(item => item.priority===selectedpriority)
   }
   res.render("list",{
    items:tasks,
    selectedPriority: selectedpriority
   })
})
app.post('/',(req,res)=>{
    var item = req.body.Todo;
    var priority = req.body.priority;
    items.push({item:item,priority:priority});
    res.redirect("/");
})
app.post('/delete/:index',(req,res)=>{
    const index = parseInt(req.params.index)
    if(!isNaN(index)){
        items.splice(index,1);
    }
    res.redirect("/");
})
app.put('/edit/:index',(req,res)=>{
    const index = parseInt(req.params.index)
    const indexitem = items[index];
    res.render("list",{indexitem:indexitem})
})
app.post('/update/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const updatedTask = req.body.updatedTask;

  if (
    !isNaN(index) &&
    index >= 0 &&
    index < items.length &&
    updatedTask.trim() !== ""
  ) {
    items[index].item = updatedTask.trim(); 
   
  } else {

  }

  res.redirect('/');
});

app.listen(3000,()=>{
    console.log("server started");
})