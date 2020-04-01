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
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 15,
        // match: /pattern/  reguler expression
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 1000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    category: {
        type: String,
        enum: ['web', 'network', 'graphics', 'mobile'],
        required: true,
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 20,
        max: 500,
    }
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {

    const course = new Course({
        name: 'Flutter course',
        author: 'Amjad',
        category: '-',
        tags: [],
        isPublished: true,
        price: 200
    });

    try {

        const result = course.save();
        console.log(result);
    }
    catch (ex) {
        for(field in ex.errors){
            console.log(ex.errors[field]);
        }
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