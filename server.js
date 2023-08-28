const express = require("express");
const app = express();
const ejs = require('ejs');
const mongoose= require("mongoose");
app.use(express.json());
const fs = require('fs');
const cheerio = require('cheerio');
const mongoUrl = "mongodb+srv://vishalmeena2486:Vishal123@cluster0.dz78bd3.mongodb.net/?retryWrites=true&w=majority";
const router = express.Router();
const bodyParser = require('body-parser');
const { forEach } = require("async");
router.use(bodyParser.json());

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
})
.then(() => {
console.log("Connected to database");
})
.catch((e) => console.log(e));

app.use(express.static("public"));

app.get("/",function(request,response){
    response.sendFile(__dirname+"/public/index.html");
});

app.listen(4000,function(){
    console.log("Server is Started");
});


const db = mongoose.connection;






  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to database2');
  });

  const dataSchema = new mongoose.Schema({
    date: String,
    month: String,
    Description: String,
    type:String
  });
  const Data = mongoose.model('Data', dataSchema);

//   const data = new Data({
//     date: '1',
//     month: 'dec',
//     Description:'srgr efef  fe',
//     type:'event'
//   });

//   data.save()
//     .then(() => console.log('Data saved to database'))
//     .catch((err) => console.error(err))
//     .finally(() => mongoose.connection.close());

const $ = cheerio.load(fs.readFileSync(__dirname + '/public/index.html'));

// Data.find({ type: 'event' })
// .then((docs) => {
//   // Loop through the array of documents and print each variable
//   docs.forEach((doc) => {
//     // console.log(`date: ${doc.date}, month: ${doc.month},Description:${doc.Description}`);
//     // $("#events-list li").remove();
//     // event(doc.date,doc.month,doc.Description);
    
//   });
//   console.log('event removed');
  
// })
// .catch((err) => console.error(err))
// // .finally(() => mongoose.connection.close());




Data.find({ type: 'event' })
.then((docs) => {

  docs.forEach((doc) => {
    // console.log(`date: ${doc.date}, month: ${doc.month},Description:${doc.Description}`);
    // $("#events-list li").remove();

  // comment above remove line to print data in html
  // comment above remove line to print data in html
  // comment above remove line to print data in html




    // console.log('event removed');
    event(doc.date,doc.month,doc.Description);
    
  });
  fs.writeFile(__dirname + '/public/index.html', $.html(), function(err) {
    if (err) throw err;
    console.log('event updated');
  });
  
  
})
.catch((err) => console.error(err))


//for people data add in mongodb
const dataSchema2 = new mongoose.Schema({
    facultyname: String,
    facultyimg: String,
    facultystream: String,
    collegename:String,
    areaofinterest:String,
    gmail:String,
    type:String
  });
  const Datafaculty = mongoose.model('Datafaculty', dataSchema2);
//can take data to faculty data
//   const datafaculty = new Datafaculty({
//     facultyname:'Kamal Kishor Jha',
//     facultyimg: 'img/Kamal.jpg',
//     facultystream:  '  Ph.D. (VLSI Design)',
//     collegename:'ABV-IITM, Gwalior',
//     areaofinterest:'Device-Circuit Co-Design, Hybrid Device-Circuit Interaction, Novel Semiconductor Device Design and Modeling.',
//     gmail:'kamal.nath@iitg',
//     type:'faculty'
//   });

//   datafaculty.save()
//     .then(() => console.log('Data saved to database'))
//     .catch((err) => console.error(err))
    
const $faculty = cheerio.load(fs.readFileSync(__dirname + '/public/faculty.html'));

Datafaculty.find({ type: 'faculty' })
.then((docs) => {
  // Loop through the array of documents and print each variable
  docs.forEach((doc) => {
    console.log(`date: ${doc.facultyname}, month: ${doc.facultyimg},facultystream:${doc.facultystream}`);
  
    // $faculty(".list-group li").remove();
    // newfaculty(doc.facultyname,doc.facultyimg,doc.facultystream,doc.collegename,doc.areaofinterest,doc.gmail);
    
  });
  fs.writeFile(__dirname + '/public/faculty.html', $faculty.html(), function(err) {
    if (err) throw err;
    console.log('people updated');
  });
  
})
.catch((err) => console.error(err))

function event(date,month,Description){
    console.log( date, month, Description);
    const eventData = ejs.render(fs.readFileSync(__dirname + '/public/event.ejs', 'utf8'), {
      date,
      month,
      Description
    });
    $('#events-list').append(eventData);
}


function annoucment(content,anlink,anlinkname){
    fs.readFile(__dirname + '/public/index.html', function(err, data) {
        if (err) throw err;
        const $ = cheerio.load(data);
    
        const newData = ejs.render( fs.readFileSync(__dirname + '/public/announcement.ejs', 'utf8'),{content,anlink,anlinkname});
        $('#announcement-list').append(newData);
        fs.writeFile(__dirname + '/public/index.html', $.html(), function(err) {
            if (err) throw err;
            console.log('annoucment updated');
        });
    });

}
function publications(Publication){
    fs.readFile(__dirname + '/public/index.html', function(err, data) {
        if (err) throw err;
        const $f = cheerio.load(data);
    
        const newData = ejs.render( fs.readFileSync(__dirname + '/public/publication.ejs', 'utf8'),{Publication});
        $f('#news-list').append(newData);
        fs.writeFile(__dirname + '/public/index.html', $f.html(), function(err) {
            if (err) throw err;
            console.log('publications updated');
        });
    });

}
function newfaculty(facultyname,facultyimg,facultystream,collegename,areaofinterest,gmail){
    fs.readFile(__dirname + '/public/faculty.html', function(err, data) {
        if (err) throw err;
        const $  = cheerio.load(data);
    
        const newData2 = ejs.render( fs.readFileSync(__dirname + '/public/faculty.ejs', 'utf8'),{facultyname,facultyimg,facultystream,collegename,areaofinterest,gmail});
        $('.list-group').append(newData2);
    });
    
  
}

// annoucment("hello","google.com","google");
// publications("hellow my name is visgl");
// newfaculty('Vishal Meena','img/DKS.jpg','BTech CSE','IIT Guwahati','webD','vishalmeena2486@gmail.com');













