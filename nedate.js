
const currentDate = new Date().toLocaleString();
const startDate = new Date(currentDate);
startDate.setHours(0, 0, 0, 0);
const endDate = new Date(currentDate);
endDate.setHours(23, 59, 59, 999);

console.log(startDate);
console.log(endDate);
console.log(startDate<endDate);