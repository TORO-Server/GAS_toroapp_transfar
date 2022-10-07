function from_search(data, item, loop2, value, from_data) {
    if (item[5] == "NoData" || item[5] > from_data[0][loop2][1]) {
        data.unshift([[], item[4] + from_data[0][loop2][1]]);
        for (let loop3 = 0; loop3 < from_data[0][loop2][0].length; loop3++) {
            data[0][0].push(from_data[0][loop2][0][loop3]);
        }
        data[0][0].unshift([item[value], item[1], item[4]]);
        return item[4] + from_data[0][loop2][1];
    }
}