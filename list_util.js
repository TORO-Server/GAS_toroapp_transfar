function list_createArray(items, data) {
    for (const item of items) {
        if (data.indexOf(item[0]) == -1) {
            data.push(item[0]);
        }
    }
    return data;
}