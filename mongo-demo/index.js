const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('conntected to mongoDb'))
    .catch(
        (error) => {
            console.log(error.message);
        }
    );

//Validation using required keyword
const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    try {
        console.log('pushing data');

        const course = new Course({
            // name: 'node.js Course',
            author: 'Mosh',
            tags: ['node', 'MongoDb'],
            isPublished: true
        });

        const result = course.save();
        console.log(result);
    }
    catch (error) {
        console.log(error.message);
    };
}

async function getCourses() {
    try {
        const courses = await Course.find({ author: 'Mosh' }).limit(10).select({ name: 1, tags: 1 });
        courses.forEach((d) => {
            console.log(d.name);
        });
    } catch (error) {

    }
}


async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.name = 'Khan';

    const result = await course.save();
    console.log(result);
}

// updateCourse('5e6d47811107c7233045f8e6');
// getCourses();
createCourse();