const express = require('express');
const app = express();
const cors = require('cors');

const todos1 = [{
    id: 1,
    title: 'walking',
    description: 'Go for a walk at 6:00PM'
},{
    id: 2,
    title: 'eating',
    description: 'eat at 12:00PM'
},{
    id: 3,
    title: 'sleeping',
    description: 'sleep at 9:00PM'
},{
    id: 4,
    title: 'job',
    description: 'Go for a job at 9:00AM'
}];

const todos2 = [{
    id: 1,
    title: 'walking',
    description: 'Go for a walk at 9:00PM'
},{
    id: 2,
    title: 'eating',
    description: 'eating at 6:00PM'
}, {
    id: 4,
    title: 'Jogging',
    description: 'Jog at 6:00pm'
}, {
    id: 5,
    title: 'cleaning',
    description: 'car cleaning at 2:00pm'
}, {
    id: 6,
    title: 'shopping',
    description: 'shop at 8:00pm'
}];

let count=0;

app.use(cors());

app.get('/allTodos', (req, res) => {

    if(count % 2 === 0) {
        res.json({
            todos: todos1
        });
    } else {
        res.json({
                todos: todos2
            })
    }
    count++;
});

app.listen(3000);