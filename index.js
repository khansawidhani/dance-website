const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { timeStamp } = require('console');
const app = express();
const PORT = 3000;

// EXPRESS RELATED CONFIGURATION
app.use("/static", express.static("static")); // set static folder
app.use(express.urlencoded({ extended: true })); // encode html form


// PUG RELATED SETTINGS
app.set('view engine', 'pug'); // set the template engine as pug
app.set("views", path.join(__dirname, "views")); // set the views directory

// MONGOOSE RELATED CONFIGURATIONS
// establishing connection
mongoose.connect('mongodb://localhost:27017/widhaniDanceStudio'); // connect to db
// defining schema
const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    message: String,
    timeStamp: String, 
});
//   converting schema into model
const Contacts = mongoose.model('Contact', contactSchema);


// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render("index");
});
app.get('/contact', (req, res) => {
    res.status(200).render("contact");
});
app.post('/contact', async(req, res) => {
    try{
        const fullName = req.body.fullName;
        const email = req.body.email;
        const message = req.body.message;
        if(fullName != "" && email != "" & message != ""){
            
            // get current timestamp
            const currentTimeStamp = () => {
                ts = Date.now();
                date_obj = new Date(ts);
                date = date_obj.getDate();
                month = date_obj.getMonth() + 1;
                year = date_obj.getFullYear();
                sec = date_obj.getSeconds();
                min = date_obj.getMinutes();
                hour = date_obj.getHours();
                md = 'AM';
                if(hour > 12) {
                    md = 'PM'
                    hour = hour -12;
                }
                currentDate = date + "/" + month + "/" + year;
                currentTime = hour + ":" + min + " " + md;
                return currentTime + " - " + currentDate;
            }
            // converting to mongoose schema
            const data = new Contacts({
                fullName: fullName, 
                email: email,
                message: message,
                timeStamp: currentTimeStamp()
            });
            console.log(data);
            data.save().then((error, data)=>{
                res.status(200).render('done');
            }).catch(error => console.log(error))

        }
        else{
            console.log('Fill in all the fields');
        }
    }
    catch (error){

        console.log(error);
    }
   
});
app.get('/messages', async (req, res)=>{
    const getAllDocuments = async ()=> {
        const result = await Contacts.find();
        console.log(result.length);
        return result
    }   
    
    // const query =  Contacts.find();
    // const data = {};
    params = await getAllDocuments();

    console.log(params);
    res.status(200).render('admin/admin', params);
})

app.listen(PORT, () => {
    console.log('App is running at port 3000');
})