const  express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT,function () {
    console.log("sever is running...");
});
// share.api access alt
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Allow-Header","Origin, X-Requested-With,Content-Type,Accept");
    next();
})
// config to connect mysql
const configDB = {
    host: "139.180.186.20",
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password: "t2207e123",
    multipleStaments: true //cho phép sử dụng nhiều câu SQL 1 lần gửi yêu cầu
};
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// api t all class
app.get("/get-classes",function (req,res){
    const sql = "Select * from classes";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else {
            res.send(data);
        }
    })
});
app.get("/student-by-class",function (req,res){
    const cid = req.query.cid;
    const sql = "Select * from students where cid = "+cid;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else {
            res.send(data);
        }
    })
});

//search by name
app.get("/search-students",function (req,res){
    const cname = req.query.cname;
    const sql = `select * from students where name like '%${q}' or email like '%$(q)'`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else {
            res.send(data);
        }
    })
});
//search by class name
app.get("/search-by-class-students",function (req,res){
    const q = req.query.q;
    const sql = `select * from students where cid in ( select cid from classes where name like '%{q}%)`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else {
            res.send(data);
        }
    })
});

// get 1 student by sid
app.get("/detail-student",function (req,res){
    const sid = req.query.sid;
    const sql = `select * from students where sid= ${sid}`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else if(data.length > 0){
            res.send(data[0]);
        }else {
            res.send("404 not found");
        }
    })
});

app.get("/student",function (req,res){
    //liet ke sinh vien
    res.send("student with GET")
})

app.post("/student",function (req,res){
    //them 1 sv
    res.send("student with POST")
})

app.put("/student",function (req,res){
    //update sv
    res.send("student with PUT")
})

app.delete("/student",function (req,res){
    //xoa sv
    res.send("student with DELETE")
})
