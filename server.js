const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// const crypto = require('crypto');

const app = express();
const PORT = 3001;

let tasks = [];


// Ensure the 'data' directory exists
const dataDir = path.join(__dirname, 'data');
const tasksFilePath = path.join(dataDir, 'tasks.json');

// Ensure the 'data' directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Ensure the 'tasks.json' file exists
if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, JSON.stringify({ tasks: [] }, null, 2));
}

app.use(express.json());
app.use(cors()); 


// 기본 루트 경로 엔드포인트 추가
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API');
});

// // 이미지 저장할 디렉토리 설정
// const uploadDir = path.join(__dirname, 'uploads');

// // multer 설정
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         // 파일명 해싱
//         const hash = crypto.createHash('md5').update(file.originalname).digest('hex');
//         const filename = `${Date.now()}-${hash.slice(0, 5)}${path.extname(file.originalname)}`;
//         cb(null, filename);
//     }
// });
// const upload = multer({ storage });

// // tasks 이미지 업로드 처리 엔드포인트
// app.post('/upload', upload.single('image'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     res.send({ filename: req.file.filename });
// });

// tasks 디테일 내용 엔드포인트
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    const newTask = {
        id: tasks.length + 1,
        task: task
    };
tasks.push(newTask);

console.log(tasks)
console.log(newTask)

saveTasksToFile();

res.json(newTask);
});


// 완료된 항목 일괄 삭제 엔드 포인트
app.post('/tasks/deleteCompleted', async (req, res) => {
    try {
        await Task.deleteMany({ isCompleted: true });
        res.status(200).send('Completed tasks deleted');
    } catch (error) {
        res.status(500).send('Error deleting completed tasks');
    }
});

// tasks 파일로 저장하는 함수
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