document.addEventListener('DOMContentLoaded', function() {
    // define dates
    const careerStartDate = new Date('2014-06-01');
    const saasStartDate = new Date('2016-07-01');
    const productStartDate = new Date('2019-04-01');

    function calculateYears(startDate) {
        const today = new Date(); // current date
        let yearDifference = today.getFullYear() - startDate.getFullYear(); // difference between current year and starting year
        const monthDifference = today.getMonth() - startDate.getMonth(); // difference between current month and starting month

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < startDate.getDate())) {
            yearDifference--; // decrement years (reduce by 1) if monthDifference is < 0 OR if monthDifference is = 0 if today's date is < startDate
        }

        return yearDifference;
    }

    function checkElementById(id, startDate) {
        const container = document.getElementById(id); // gets existing element from html with id="id"
        if (container) { // if container exists 
            document.getElementById(id).textContent = calculateYears(startDate); // add text to container
            console.log(`${id} added successfully`); // log: success
        } else { // if container does not exist
            console.log(`${id} not found`); // log: failure
        }
    }

    checkElementById('career-years-experience', careerStartDate);
    checkElementById('saas-years-experience', saasStartDate);
    checkElementById('product-years-experience', productStartDate);

});