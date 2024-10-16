const { Schema, models, model } = require("mongoose");

const WordSchema = new Schema({
    noun: {
        type: String,
        required: [true, 'Noun is required']
    },
    article: {
        type: String,
        required: [true, 'Article is required']
    },
    plural: {
        type: String,
    }
});

const ListSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    list: {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        words: {
            type: [WordSchema],
            required: [true, 'Words array is required'],
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
})

const List = models.List || model('List', ListSchema);

export default List;