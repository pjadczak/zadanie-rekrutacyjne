const toIsoString = date => {
    // return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    if (!date || !(typeof date === 'object')) return null;
    return new Date(date.getTime()).toISOString();
}

const dateTZ = (date = new Date()) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
}

export const stringDateToFormat = (date) => {

    return dateToString(dateTZ(new Date(date)));
}

const isValidDate = d => {
    return d instanceof Date && !isNaN(d);
  }

const dateToString = (date, seconds = false) => {
    if (!date || !(typeof date === 'object') || !isValidDate(date)) return null;
    const stringDate = toIsoString(date);
    return stringDate.substr(0,10)+(seconds ? ' '+stringDate.substr(11,8) : '');
}