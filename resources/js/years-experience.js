 // Define the start date
const startDate = new Date('2019-04-01');

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
document.getElementById('years-experience').textContent = calculateYears(startDate);