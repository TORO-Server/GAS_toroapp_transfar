function from_main(from, to, sheet, length) {

    let from_sh = [];
    let from_data = [];


    let data = sheet.getRange(`B3:F${length}`).getValues();//すべてのデータ
    console.log(data)

    for (let loop = 0; loop < data.length; loop++) {
        const item = data[loop];
        if (item[4] == "") {
            item[4] = 0;
        } else {
            item[4] = toSecond(item[4]);
        }
        item.push("NoData");
    }

    console.log(data)
    for (let loop = 0; loop < data.length; loop++) {
        const item = data[loop];
        if (item[2] == from) {
            from_sh.push([[[item[3], item[1], item[4]], [item[2], item[1]]], item[4]]);
            item[5] = item[4];
        }
        if (item[3] == from) {
            from_sh.push([[[item[2], item[1], item[4]], [item[3], item[1]]], item[4]]);
            item[5] = item[4];
        }
    }
    from_data.unshift(from_sh);
    from_sh = [];
    //第一検索 終了

    for (let loops = 0; from_data[0] != ""; loops++) {
        for (let loop = 0; loop < data.length; loop++) {
            const item = data[loop];
            for (let loop2 = 0; loop2 < from_data[0].length; loop2++) {
                if (item[2] == from_data[0][loop2][0][0][0]) {
                    item[5] = from_search(from_sh, item, loop2, 3, from_data);
                }
                if (item[3] == from_data[0][loop2][0][0][0]) {
                    item[5] = from_search(from_sh, item, loop2, 2, from_data);
                }
            }
        }
        from_data.unshift(from_sh);
        from_sh = [];
    }//ループ検索終了
    from_data.shift();//空白消去

    if (from_data != "") {
        if (isParameter(to)) {//最短距離検索
            let count = 0;
            let to_data = [];
            for (let loop = 0; loop < from_data.length; loop++) {
                const item = from_data[loop];
                for (let loop2 = 0; loop2 < item.length; loop2++) {
                    if (item[loop2][0][0][0] == to) {
                        if (count > item[loop2][1] || count == 0) {
                            count = item[loop2][1];
                            to_data = item[loop2];
                        }
                    }
                }
            }
            if (to_data == "") {
                return { "type": "NothingToData" };
            } else {
                return { "main": to_data[0].reverse(), "length": to_data[1], "type": "ToData" };
            }
        } else {
            return { "main": from_data.reverse(), "type": "AllData" };
        }
    } else {
        return { "type": "NothingFromData" };
    }
}