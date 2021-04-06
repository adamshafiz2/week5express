const express = require("express");
const farmers = require("./Room");
const app = express()

const port = 5000;

// body parser

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// get all farmers

app.get("/farmapi/v1/farmers" ,(req, res)=> {
    res.send(farmers)
})

// get a single farmer
app.get("/farmapi/v1/farmers/:id", (req, res)=> {
    const id = req.params.id;
    const farmer = farmers.some((f)=> f.id ===id);

    if (farmer) {
        res.json(farmers.filter((farmer)=> farmer.id === id));
    } else {
        res.status(404).json({message: "not found"});
    }
});
 
// create a new farmer

app.post("/farmapi/v1/farmers", (req, res)=> {
    const newf = {
        name: req.body.name,
        crop: req.body.crop,
        id: req.body.id,
    };

    farmers.push(newf);

    res.json(farmers);
})
// delete farmer
app.delete("/farmapi/v1/farmers/:id" ,(req, res)=> {
    const id = req.params.id;
    const farmer = farmers.some((f) => f.id === id);

    if (farmer) {
        res.json({
            msg: `Farmer deleted  ${id}`,
            farmers: farmers.filter((f)=> f.id !==id),
        })
    }

    
});
// updating a farmer information
app.put("farmapi/v1/farmers/:id" ,(req, res)=> {
    const id = req.params.id;
    const farmer = farmers.some((f)=> f.id === id);

    const newName = req.body.name
    const newCrop = req.body.crop

    if (farmer) {
        farmers.forEach((f)=>{
            if(f.id === id) {
                (f.name=newName ? newName : f.name),
                (f.crop=newCrop ? newCrop : f.crop);
            }
        });
        
        res.json(farmers);
    } else {
        res.status(404).json({message: "not found"})
    }
   
})


app.listen(port,()=> console.log(`server is operational ${port}`))