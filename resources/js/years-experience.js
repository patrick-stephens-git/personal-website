document.addEventListener('DOMContentLoaded', function() {
    // define dates
    const careerStartDate = new Date('2014-06-01');
    const seoStartDate = new Date('2015-02-01');
    const saasStartDate = new Date('2016-07-01');
    const saasEndDate = new Date('2025-04-30');
    const productStartDate = new Date('2019-04-01');
    // const productEndDate = new Date('2025-04-30');
    const internalSearchStartDate = new Date('2021-09-01');

    function calculateYears(startDate, endDate = new Date()) { // default endDate is current date
        let yearDifference = endDate.getFullYear() - startDate.getFullYear(); // difference between end year and starting year
        const monthDifference = endDate.getMonth() - startDate.getMonth(); // difference between end month and starting month

        if (monthDifference < 0 || (monthDifference === 0 && endDate.getDate() < startDate.getDate())) {
            yearDifference--; // decrement years (reduce by 1) if monthDifference is < 0 OR if monthDifference is = 0 if endDate is < startDate
        }

        return yearDifference;
    }

    function checkElementById(id, startDate, endDate = new Date()) { // default endDate is current date
        const container = document.getElementById(id); // gets existing element from html with id="id"
        if (container) { // if container exists 
            document.getElementById(id).textContent = calculateYears(startDate, endDate); // add text to container
            console.log(`${id} added successfully`); // log: success
        } else { // if container does not exist
            console.log(`${id} not found`); // log: failure
        }
    }

    checkElementById('career-years-experience', careerStartDate);
    checkElementById('seo-years-experience', seoStartDate);
    checkElementById('saas-years-experience', saasStartDate, saasEndDate);
    checkElementById('product-years-experience', productStartDate);
    checkElementById('internal-search-years-experience', internalSearchStartDate);

});