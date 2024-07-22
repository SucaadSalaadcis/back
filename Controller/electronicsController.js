const electronicsModel = require("../Model/electronicsModel");

// get 
const GetElectronic = async (req, res)=> {
    const getData = await electronicsModel.find();
  if(getData){
    res.send(getData);
  }
};

// post
const createElectronic = async(req, res) => {
    const newData = await electronicsModel(req.body);
    const saveData = newData.save();
    if(saveData){
        res.send(newData);
    }
};

// put 
const updateElectronic = async(req, res) => {
    const updateData = await electronicsModel.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    );
    if(updateData){
        res.status(200).send({status:"Updated..."})
    }
};

// delete
const deleteElectronic = async(req, res) => {
    const deleteData = await electronicsModel.deleteOne(
        {_id: req.params.id}
    );
   
    if(deleteData){
        res.status(200).send({status:"deleted"})
    }
}


// single update
const SingleUpdate= async (req, res) => {
    const singleData = await electronicsModel.find(
        {_id : req.params.id}
        )
    if(singleData)
    res.send(singleData)
  }



// export all function 
module.exports = 
{GetElectronic, createElectronic, updateElectronic,deleteElectronic,SingleUpdate}