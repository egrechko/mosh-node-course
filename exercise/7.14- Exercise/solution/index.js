const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('Connected to mongodb...'))
    .catch( (err) => console.log(err));

// create schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: String, default: Date.now() },
    price: Number,
    isPublished: Boolean
});

// create model
const Course = mongoose.model('Course', courseSchema);

// query courses
    //  sort them by name
    //  show only their name and author

async function getCourses() {
    return await Course
        // .find({ isPublished: true, $or: [ [ { price: { $gte: 15 } }], { name: /.*by.*/i } ] });
        .find({ isPublished: true, $or: [ { price: { $gte: 15 }}, { name: /.*by.*/i } ] })
};

async function displayCourses() {
    const courses = await getCourses();
    console.log(courses);
};

displayCourses();