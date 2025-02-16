import express from 'express';

const app = express();
const PORT = 3001

app.listen(PORT,()=>{
    console.log(`Server Running On this Link http://localhost:${PORT}`);
});