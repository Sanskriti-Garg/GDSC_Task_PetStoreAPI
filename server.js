const express = require('express')
const app = express()
app.use(express.json())

process.on('uncaughtException', function (err) {
    console.log(err);
  });


app.listen(8000,() => {
    console.log('server is up')
})

var pets =[ 
    {
        id:"1",
        name_of_pet:"pandu",
        name_of_owner:"motu",
        age:"2",
        type:"panda",
        gender:"male"


}
]

app.get('/pets',(req,res) => {
    res.send({
        success:true,
        message:'data fetched successfully',
        data:pets
    })

})

app.post('/pets',(req , res) => {
    var name_of_pet=req.body.name_of_pet
    
    var name_of_owner=req.body.name_of_owner
    var age=req.body.age
    var type=req.body.type
    var gender=req.body.gender
    if(name_of_pet){
        pets.push({
            id:(pets.length+1).toString(),
            name_of_pet:name_of_pet,
            name_of_owner:name_of_owner,
            age:age,
            type:type,
            gender:gender
        })
    
        res.send({
            success:true,
            message:'data added successfully',
        })
    }
    else{
        res.send({
            success:false,
            message:"validation error",
             errors:[{
                feild:"name_of_pet",
                message:"cannot be null"
             }]
        })
    }
})

app.delete('/pets/:id',(req,res) => {
    var id = req.params.id
     var newpetname=pets.filter(el => el.id!=id )
     pets=newpetname

     res.send({
        success:true,
        message:"data deleted successfully "
     })
})

app.put('/pets/:id',(req,res) => {
    var id=req.params.id
    var name_of_pet=req.body.name_of_pet
    var name_of_owner=req.body.name_of_owner
    var age=req.body.age
    var type=req.body.type
    var gender=req.body.gender
    if (name_of_pet){
        var index=pets.findIndex(el => el.id == id)
    pets[index]={
        ...pets[index],
        name_of_pet:name_of_pet,
        name_of_owner:name_of_owner,
        age:age,
        type:type,
        gender:gender
    }
    res.send({
        success:true,
        message:"data updated successfully"
    })

    }
    else{
        res.send({
            success:false,
            message:"validation error",
             errors:[{
                feild:"name_of_pet",
                message:"cannot be null"
             }]
        })

    }

    
    
})