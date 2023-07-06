window.onload = f;

function f() {
    var tour = document.getElementById("tour_type");
    var city = document.getElementById("departure");
    var check_in = document.getElementById("check_in");
    var check_out = document.getElementById("check_out");
    var people = document.getElementById("people");
    var start_date = 0, stop_date = 0;
    var number = 0;
    var cost_per_person;
    var button = document.getElementById("book_button");

    tour.onchange = function() {
        if (tour.value == "fjords" || tour.value == "ski" || tour.value == "sun")
            cost_per_person = 150;
        else
            cost_per_person = 100;

        if (number != 0) {
            cost.innerHTML = "Cost: " + cost_per_person * number + " euros";
        }

        var opt = document.querySelectorAll("option");
        for (var i = 0; i < opt.length; i++) {
            if (opt[i].value == tour.value) {
                localStorage.setItem("tour", JSON.stringify(opt[i].innerHTML));
            }
        }
    }

    check_in.onchange = function() {
        start_date = check_in.value;
    }

    check_out.onchange = function() {
        stop_date = check_out.value;
    }

    people.onchange = function() {
        var cost = document.getElementById("cost");
        var match = cost.innerHTML.match(/(\d+)/);
        var cost_number = match[0];
        number = parseInt(people.value);
        cost_number = cost_per_person * number;
        cost.innerHTML = "Cost: " + cost_number + " euros";
    }

    button.onclick = function() {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const numberRegex = /^\d+$/;

        var currentDate = new Date().toISOString().slice(0, 10);
        if (start_date <= currentDate) {
            alert('Invalid check-in date. Please select a date that is greater than the current date');
            return;
        }    

        if (!dateRegex.test(start_date) || !dateRegex.test(stop_date) || start_date >= stop_date) {
            alert('Invalid check-out date. Please select a check-out date that is greater than the check-in date');
            return;
        }

        if (!numberRegex.test(number) || number <= 0) {
            alert('Invalid number of people. Please enter a positive number');
            return;
        }

        if (number != 0 && start_date != 0 && stop_date != 0) {
            var confirm = document.createElement("p");
            confirm.innerHTML = "You have successfully booked the " + localStorage.getItem("tour") + " tour with the " +
                city.value + " departure city starting on " + start_date + " and ending on " +
                stop_date + " for " + number + " people for the total cost of " + number * cost_per_person
                + " euros!";
            confirm.style.cssText = "font-size: x-large; margin-top: 4%; font-style: bold; border-style: double;"
            document.getElementById("confirm").appendChild(confirm);
            document.querySelector("#confirm h3").remove();

            button.disabled = true;
        } 
        else {
            var invalid = document.createElement("p");
            invalid.innerHTML = "Invalid booking. Please try again";
            invalid.cssText = "font-size: x-large; margin-top: 70%; font-style: bold; border-style: double;"
            document.getElementById("confirm").appendChild(invalid);
            document.querySelector("#confirm h3").remove();
        }
    }
}