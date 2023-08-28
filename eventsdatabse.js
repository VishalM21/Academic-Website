const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
    date: String, 
    month: String,
    description:String
},
{
    collection: "EventInfo",
}
);
mongoose.model("EventInfo", UserDetailsSchema);