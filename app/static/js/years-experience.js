 // Define the start date
const careerStartDate = new Date('2014-06-01');
const saasStartDate = new Date('2016-07-01');
const productStartDate = new Date('2019-04-01');

// Calculate years of experience
function calculateYears(start) {
    const today = new Date();
    let years = today.getFullYear() - start.getFullYear();
    const monthDifference = today.getMonth() - start.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < start.getDate())) {
        years--;
    }

    return years;
}

// Get and update the span element
document.getElementById('career-years-experience').textContent = calculateYears(careerStartDate);
document.getElementById('saas-years-experience').textContent = calculateYears(saasStartDate);
document.getElementById('product-years-experience').textContent = calculateYears(productStartDate);