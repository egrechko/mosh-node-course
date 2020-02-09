const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema],
  likes: Number
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $inc: {
      likes: -1
    }
    // $set to update properties
    // $unset to remove properties
  });

  console.log(course);
  
  // course.author.name = 'Eugene Grechko';
  // course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);

  course.authors.push(author);

  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);

  const author = course.authors.id(authorId);
  author.remove();

  course.save();
}

removeAuthor('5e3f80abca61b52540b0337f', '5e3f80abca61b52540b0337e');

// addAuthor('5e3f80abca61b52540b0337f', new Author({name: 'Person Smith'}));

// updateCourse('5e3f79e4c8f1501e2d41769b');
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Amy' }),
//   new Author({ name: 'Peter' })
// ]);
