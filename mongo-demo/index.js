const mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://localhost/playground')
    .then( () => console.log('Connected to mongodb...'))
    .catch(err => console.error('Could not connect to mongodb...', err));

// Creating new documents in mongodb
// 
// Mongodb structure
// 1. Database
//   2. Collection -> like a table
//     3. Document -> like a row
// 
// Creating new documents
// 1. Create schema from mongoose schema class
// 2. Create a model from schema
// 3. Write to db and await the result

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function saveCourse() {
    const course = new Course({
        name: 'Vue.js Course',
        author: 'Eugene',
        tags: ['vue', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

// Query mongodb documents
// 
// Super easy
// Just use the find method on the Course object you created earlier and enter the fields you are searching for. eg: { name: 'John' }
async function getCourses() {
    const courses = await Course
        .find({ author: 'Eugene', isPublished: true })
        .limit(1)
        .select( {name: 1, tags: 1, date: 1} );
    console.log(courses);
}

getCourses();
// saveCourse();