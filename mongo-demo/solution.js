const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('MongoDb connected'))
    .catch((err) => {
        console.log('Error:', err.message);
    });


const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number,
    __v: Number
});


const Course = mongoose.model('Course', courseSchema);
async function getCourses() {
    console.log('test');
    //    const result = await Course.find({isPublished:true,tags:{$in:['frontend','backend']}})
    //                         .sort({price:1})
    //                         .select({name:1,author:1,price:1});
    const result = await Course.find({ isPublished: true}).or([ {name: /.*by.*/i},{price: { $gte: 15 } , }]);
    console.log(result);
}


getCourses();