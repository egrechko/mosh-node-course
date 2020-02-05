const mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true })
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
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: String, default: Date.now() },
    price: Number,
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function saveCourse() {
    const course = new Course({
        // name: 'Node.js Course',
        author: 'Eugene',
        tags: ['node', 'backend', 'fullstack dev'],
        isPublished: true
    });
    
    try {
        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.log(err.message);
    }
}

// Query mongodb documents
// 
// Super easy
// Just use the find method on the Course object you created earlier and enter the fields you are searching for. eg: { name: 'John' }
async function getCourses() {
    
    // comparison operators
    // eq = equal
    // ne = not equal
    // gt = greater than
    // gte = greater than or equal too
    // lt = less than
    // lte = less than or equal too
    // in
    // nin = not in
    
    const courses = await Course
        // .find({ author: 'Eugene', isPublished: true }) - regular find
        // .find({ author: { $in: 'Eugene'} }) - find using comparison operators
        // finding with regex
        // syntax - /pattern/
        // find anything that starts with pattern - /^pattern/
        // find anything that ends with pattern - /pattern$/
        // case insensitive - /pattern/i
        // find anything that contains pattern - /.*pattern.*/
        .find({ author: /.*eugene.*/i }) // - find using regex
        .limit(10)
        .select( {name: 1, tags: 1} )
        .sort({ name: 1 })
        .count();
    console.log(courses);
};

async function updateCourse(id) {
    // 
    // Query first approach
    // findById()
    // Modify properties
    // save

    // find
    // const course = await Course.findById(id);
    // if (!course) {
    //     console.log('Course not found.');
    //     return;
    // };
    // modify 1 property at a time
    // course.isPublished = true;
    // course.author = 'Another Author';
    // modify multiple properties at once.
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });

    // const result = await course.save();
    // console.log(result);
    // return result;

    // 
    // Update first approach - 1
    // update directly
    // get updated document (optional)
    // const result = await Course.update({ _id: id }, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });

    // console.log(result);

    // 
    // Update first approach - 1
    // update directly
    // get updated document (optional)
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jack',
            isPublished: true
        }
    });

    console.log(course);
};

// removing documents - risky business, man.
// deleteOne method
// this method will return a result.
// async function removeCourse(id) {
//     const result = await Course.deleteOne( { _id: id} );
//     console.log(result);
// }

// findByIdAndRemove method
// this method will return the deleted course object.
async function removeCourse(id) {
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

// removeCourse('5e371adb88c7e803f3a8b4a5');
// updateCourse('5e371a665f0ef2035c3bb849');
// getCourses();
saveCourse();