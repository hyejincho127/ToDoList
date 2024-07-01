const express = require('express')
// const fs = require('fs')
const cors = require('cors');
const multer = require('multer')

const app = express();
const PORT = 3001;

let tasks = [];

// app.use(express.json());
app.use(cors()); 

// 이미지를 저장할 경로 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// multer 설정
const upload = multer({ storage: storage });


app.post('/tasks', upload.single('image'), (req, res) => {
    const task = req.body.task;
    const note = req.body.note;
    const dueDate = req.body.dueDate;
    const image = req.file; // 업로드된 파일 정보

    console.log(task);
    console.log(note);
    console.log(dueDate);
    console.log(image); // 업로드된 파일 정보 확인
    
    // 새로운 task 객체 생성
    const newTask = {
        id: tasks.length + 1,
        task: task,
        dueDate: dueDate,
        note: note,
        image: image ? image.filename : null
    };
    
// upload.single('image'), express.json(), 
// app.post('/tasks', (req, res) => {
//     const task = req.body.task;
//     const note = req.body.dueDate;
//     const dueDate = req.body.dueDate;
//     // const image = req.file;

//     console.log(task)
//     console.log(note)
//     console.log(dueDate)
//     // console.log(image)
    
//     const newTask = {
//         id: tasks.length + 1,
//         task: task,
//         dueDate: dueDate,
//         note: note,
//         // image: image ? image.filename : null 

//     };
    
tasks.push(newTask);

// console.log(tasks)
// console.log(newTask)

saveTasksToFile();

res.json(newTask);
// res.status(200).send('Image uploaded successfully');
});


function saveTasksToFile() {
    fs.writeFile('./data/tasks.json', JSON.stringify(tasks), err => { 
        if (err) {
            console.error('Error writing tasks to file:', err);
        } else {
            console.log('Tasks saved to file');
        }
    });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));