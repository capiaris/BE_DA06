const getHoursDifference = (targetDate, baseDate) => {
    return (targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60);
};

const getDaysDifference = (targetDate, baseDate) => {
    return getHoursDifference(targetDate, baseDate) / 24;
};

const isValidPrioritySlot = (date) => {
    const minutes = date.getMinutes();
    return minutes === 0 || minutes === 30;
};

module.exports = {
    getHoursDifference,
    getDaysDifference,
    isValidPrioritySlot
};