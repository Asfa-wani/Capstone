/*
 * CRUD OPERATIONS FOR USER TRAVEL BLOGS
 */

// IMPORT
const { TravelBlog } = require("../models/travelBlog");
//const joi = require("joi");
const fs = require("fs");
const _ = require("lodash");
const formidable = require("formidable");
//FUNCTION TO FIND THE TRAVEL BLOG BY ID
const travelBlogById = (req, res, next, id) => {
    TravelBlog.findById(id).exec((err, travelBlog) => {
        if (err || !travelBlog) {
            return res.status(404).json({
                error: 'Travel Blog not found'
            });
        }
        req.travelBlog = travelBlog;
        next();
    });
};

//FUNCTION TO RETRIEVE ONE TRAVEL BLOG 
const readTravelBlog = async(req, res) => {
    //travelBlog = req.travelBlog;
    req.travelBlog.photo = undefined;
    res.status(200).send(req.travelBlog);
}

//FUNCTION TO RETRIEVE ALL TRAVEL BLOGS
const readAllTravelBlogs = async(req, res) => {
    try {
        const travelBlogs = await TravelBlog.find({});
        if (!travelBlogs)
            return res.status(404).send({ message: "NO travel Blogs exist!" });

        res.status(200).send(travelBlogs);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

//FUNCTION TO RETRIEVE ALL TRAVEL BLOGS BY A PARTICULAR USER
const readUserTravelBlog = async(req, res) => {
    try {
        const travelBlogs = await TravelBlog.find({ user: req.profile._id });
        if (!travelBlogs)
            return res.status(404).send({ message: "NO travel Blogs By the user exist!" });

        res.status(200).send(travelBlogs);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

//FUNCTION TO CREATE A TRAVEL BLOG
const createTravelBlog = (req, res) => {
    try {
        //USING FORMIDABLE FORM TO EXTRACT INCOMING DATA
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async(err, fields, files) => {
            if (err)
                return res.status(400).send({ error: "Image could not be uploaded", });

            const { title, blog } = fields;
            if (!title || !blog)
                return res.status(400).json({ error: "All fields are required", });

            // CHECK IF THE BLOG ALREADY EXISTS
            const existingBlogs = await TravelBlog.findOne({ title: title });
            if (existingBlogs)
                return res.status(409).send({ message: "Blog with this title by the user already exists" });

            //CREATING TRAVEL BLOG WITHOUT IMAGE
            let travelBlog = new TravelBlog({ title: title, blog: blog, user: req.profile._id });
            // 1kb = 1000
            // 1mb = 1000000
            if (files.photo) {
                if (files.photo.size > 1000000)
                    return res.status(400).json({ error: "Image should be less than 1mb in size", });
                travelBlog.photo.data = fs.readFileSync(files.photo.filepath);
                travelBlog.photo.contentType = files.photo.type;
            };
            //SAVE THE TRAVELBLOG WITH IMAGE IN DB
            const result = await travelBlog.save();
            res.status(200).send(result);
        });
    } catch (error) {
        res.status(500).send({ message: "server error" })
    }
};

//FUNCTION TO UPDATE THE TRAVEL BLOG
const updateTravelBlog = (req, res) => {
    try {
        //USING FORMIDABLE FORM TO EXTRACT INCOMING DATA
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async(err, fields, files) => {
            if (err)
                return res.status(400).send({ error: "Image could not be uploaded", });


            // CHECK IF THE BLOG ALREADY EXISTS
            const existingBlogs = await TravelBlog.findOne({ title: fields.title });
            if (existingBlogs)
                return res.status(409).send({ message: "Blog with this title by the user already exists" });

            //RETRIEVE TRAVELBLOG BY ID
            let travelBlog = req.travelBlog;
            //PUT NEW FORM FIELDS IN THE TRAVEL BLOG THAT IS TO BE UPDATED
            travelBlog = _.extend(travelBlog, fields);

            // 1kb = 1000
            // 1mb = 1000000
            //PUT THE IMAGE IN PHOTO FIELD OF TRAVEL BLOG
            if (files.photo) {
                if (files.photo.size > 1000000)
                    return res.status(400).json({ error: "Image should be less than 1mb in size", });

                travelBlog.photo.data = fs.readFileSync(files.photo.filepath);
                travelBlog.photo.contentType = files.photo.type;
            };
            //SEND THE UPDATED TRAVEL BLOG AS RESPONSE
            const result = await travelBlog.save();
            res.status(200).send(result);
        });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};



//FUNCTION TO DELETE TRAVEL BLOG
const deleteTravelBlog = async(req, res) => {
    try {
        await TravelBlog.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}
module.exports = {
    createTravelBlog,
    updateTravelBlog,
    deleteTravelBlog,
    travelBlogById,
    readTravelBlog,
    readAllTravelBlogs,
    readUserTravelBlog
};