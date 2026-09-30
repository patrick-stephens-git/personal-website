document.addEventListener('DOMContentLoaded', function() {
    // define dates
    const careerStartDate = new Date('2014-06-01');
    const seoStartDate = new Date('2015-02-01');
    const saasRanges = [
        { start: new Date('2016-07-01'), end: new Date('2025-04-30') },
        { start: new Date('2025-08-01'), end: new Date() }
    ];
    const productStartDate = new Date('2019-04-01');
    // const productEndDate = new Date('2025-04-30');
    const internalSearchStartDate = new Date('2021-09-01');
    const startupStartDate = new Date('2025-08-01');
    const startupEndDate = new Date('2026-08-30');

    function calculateYears(startDate, endDate = new Date()) { // default endDate is current date
        let yearDifference = endDate.getFullYear() - startDate.getFullYear(); // difference between end year and starting year
        const monthDifference = endDate.getMonth() - startDate.getMonth(); // difference between end month and starting month

        if (monthDifference < 0 || (monthDifference === 0 && endDate.getDate() < startDate.getDate())) {
            yearDifference--; // decrement years (reduce by 1) if monthDifference is < 0 OR if monthDifference is = 0 if endDate is < startDate
        }

        return yearDifference;
    }

    function monthsBetween(startDate, endDate) {
        let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
        if (endDate.getDate() < startDate.getDate()) {
            months--; // don't count a partial month
        }
        return months;
    }

    function calculateYearsFromRanges(ranges) { // ranges: [{ start, end }], gaps between ranges are excluded
        const totalMonths = ranges.reduce((sum, range) => sum + monthsBetween(range.start, range.end), 0);
        return Math.floor(totalMonths / 12);
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

    function checkElementByIdMultiRange(id, ranges) {
        const container = document.getElementById(id);
        if (container) {
            container.textContent = calculateYearsFromRanges(ranges);
            console.log(`${id} added successfully`);
        } else {
            console.log(`${id} not found`);
        }
    }

    checkElementById('career-years-experience', careerStartDate);
    checkElementById('seo-years-experience', seoStartDate);
    checkElementByIdMultiRange('saas-years-experience', saasRanges);
    checkElementById('product-years-experience', productStartDate);
    checkElementById('internal-search-years-experience', internalSearchStartDate);
    checkElementById('startup-years-experience', startupStartDate, startupEndDate);

});