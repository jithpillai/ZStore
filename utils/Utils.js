const formatDateAndTime = (theDateStamp) => {
    let actualDate = new Date(theDateStamp);
    if (!actualDate) {
        return "";
    }
    return actualDate.getHours() + ":" + actualDate.getMinutes() + ", "+ actualDate.toDateString();
}

const getFixedDecimal = (value, decimals) => {
    if (isNaN(value)) {
        return "0.00";
    }
    return Number(value).toFixed(decimals);
}
const myUtils = { formatDateAndTime, getFixedDecimal };
export default myUtils;