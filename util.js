function toSecond(time) {
    return Math.floor((time.getTime() + 2209194000000) / 1000)
}

function isParameter(item) {
    return item != undefined && item != "";
}