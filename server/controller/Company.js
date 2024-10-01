const Company  = require('../models/Company');

const mongoose = require('mongoose');

exports.addcompany = async (req, res) => {
    const { companyname, domain } = req.body.company;

    if (!companyname || !domain) {
        return res.status(400).json({ message: 'All info are required', success: false });
    }

    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === companyname);

        if (collectionExists) {
            return res.status(400).json({ message: 'Company already registered', success: false });
        }

        const db = mongoose.connection.db;
        await db.createCollection(companyname);

        const initialCompanyData = {
            companyname,
            domain,
            createdAt: new Date()
        };
        await db.collection(companyname).insertOne(initialCompanyData);


        const company = new Company({
            companyname,
            domain
        });

        await company.save();

        return res.status(200).json({ message: 'Company registered successfully', success: true });
    } catch (err) {
        console.error(err); 
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};


exports.getCompany = async (req,res) => {
    try{
        const companyInfo = await Company.find();
        if(!companyInfo){
            return res.status(400).json({message:'company not found', success:false})
        }

        return res.status(200).json({message:'company', companyInfo:companyInfo, success:true})

    }catch(err){
        return res.status(400).json({message:'internal server error', success:false})
    }
}

exports.getCompanyByid = async (req,res) => {
    const {id} = req.params;

    try{
        const companyInfo = await Company.findOne({_id:id});
        if(!companyInfo){
            return res.status(400).json({message:'company not found', success:false})
        }

        return res.status(200).json({message:'company', companyInfo:companyInfo, success:true})

    }catch(err){
        return res.status(400).json({message:'internal server error', success:false})
    }
}


exports.editcompany = async (req, res) => {
    const { id } = req.params;
    const { companyname, domain } = req.body.company;

    if (!companyname || !domain) {
        return res.status(400).json({ message: 'All info are required', success: false });
    }

    try {
        const existcompany = await Company.findById(id);
        if (!existcompany) {
            return res.status(404).json({ message: 'Company not found', success: false });
        }

        const existingCompanyWithSameName = await Company.findOne({
            companyname: companyname,
            _id: { $ne: id } 
        });

        if (existingCompanyWithSameName) {
            return res.status(400).json({ message: 'A company with this name already exists', success: false });
        }

        existcompany.companyname = companyname;
        existcompany.domain = domain;

        await existcompany.save();

        return res.status(200).json({ message: 'Company updated successfully', success: true });
    } catch (err) {
        console.error('Error updating company:', err);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.deletecompany = async (req, res) => {
    const { id } = req.params;
    try {
      const company = await Company.deleteOne({ _id: id });
      if (company.deletedCount > 0) {
        return res.status(200).json({ message: 'Company deleted', success: true });
      } else {
        return res.status(404).json({ message: 'Company not found', success: false });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', success: false });
    }
};
  
  