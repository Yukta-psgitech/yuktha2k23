const Event = require("../models/event");
const User = require("../models/User");
const Workshop = require("../models/workshop");

//To check the user is logged in or not
async function isLogged(req) {
    return req.isAuthenticated() ? true : false;
}


//To check the Program is Open For registration or not
async function isOpen(prog, prog_id) {
    try {
        console.log(`open check ${prog} : ${prog_id} `);
        //Event is open to registration or not
        if (prog === "event") {
            const event = await Event.findOne({ "eventid": prog_id });
            return event ? event.open : console.log("Event not found");
        }

        //Workshop is open to Registration or not
        else if (prog === "workshop") {
            const workshop = await Workshop.findOne({ "workshopid": prog_id });
            return workshop ? workshop.open : console.log("Workshop not found");
        }

    } catch (err) {
        console.log(err);
        req.flash("error_msg", "Something Went Wrong,Please Try again Later");
        res.redirect('back');
        res.end();
    }

}


//To check the User is Registered to the Program or not...
async function isRegistered(username, prog, prog_id) {
    try {
        console.log(`Reg check ${prog} : ${prog_id} `);

        var user = await User.findOne({ username: username });

        //Registered for Event or not
        if (prog === "event") {
            var ireg = await user.events.some((event) => {
                return event.eventid == prog_id;
            });
            console.log(ireg);
            return ireg;
        }

        //Registered for Workshop or not
        else if (prog === "workshop") {
            var ireg = user.workshops.some((workshop) => {
                return workshop.workshopid == prog_id;
            });
            return ireg;
        }
    } catch (err) {
        console.log(err);
        req.flash("error_msg", "Something Went Wrong,Please Try again Later");
        res.redirect('back');
        res.end();
    }
} 



module.exports = { isLogged: isLogged, isOpen: isOpen, isRegistered: isRegistered };