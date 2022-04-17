function doGet(e) {
    let spreadsheet = SpreadsheetApp.openById('スプレッドシートのIDをここに入力');
    let sheet = spreadsheet.getSheetByName('路線データベース');

    let from = e.parameter.from;//出発場所
    let to = e.parameter.to;//到着場所

    let list = e.parameter.list;

    let from_search = [];
    let from_data = [];

    let length = sheet.getRange(`B3:B`).getValues().findIndex(item => item[0] === "") + 2;

    if (list != undefined && list != "") {
        if (list == "line") {//線データ
            let data1 = sheet.getRange(`C3:C${length}`).getValues();//すべての線データ
            let data = [];

            for (let loop = 0; loop < data1.length; loop++) {
                if (data.indexOf(data1[loop][0]) == -1) {
                    data.push(data1[loop][0]);
                }
            }
            return ContentService.createTextOutput(JSON.stringify({ "main": data, "type": "LineList" }));
        } else if (list == "station") {//駅データ

            let data1 = sheet.getRange(`D3:D${length}`).getValues();//すべての駅1データ
            let data2 = sheet.getRange(`E3:E${length}`).getValues();//すべての駅2データ

            let data = [];

            for (let loop = 0; loop < data1.length; loop++) {
                if (data.indexOf(data1[loop][0]) == -1) {
                    data.push(data1[loop][0]);
                }
            }
            for (let loop = 0; loop < data2.length; loop++) {
                if (data.indexOf(data2[loop][0]) == -1) {
                    data.push(data2[loop][0]);
                }
            }

            return ContentService.createTextOutput(JSON.stringify({ "main": data, "type": "StationList" }));
        } else if (list == "company") {//鉄道会社のデータ

            let data1 = sheet.getRange(`B3:B${length}`).getValues();//すべての鉄道会社データ
            let data = [];

            for (let loop = 0; loop < data1.length; loop++) {
                if (data.indexOf(data1[loop][0]) == -1) {
                    data.push(data1[loop][0]);
                }
            }
            return ContentService.createTextOutput(JSON.stringify({ "main": data, "type": "CompanyList" }));
        } else {
            return ContentService.createTextOutput(JSON.stringify({ "type": "NothingListData" }));
        }
    } else {

        if (from == undefined || from == "" || from == to) { return ContentService.createTextOutput(JSON.stringify({ "type": "Error" })); }

        let data = sheet.getRange(`B3:F${length}`).getValues();//すべてのデータ

        for (let loop = 0; loop < data.length; loop++) {
            if (data[loop][4] == "") { data[loop][4] = 0; }
            data[loop].push("NoData");
        }

        for (let loop = 0; loop < data.length; loop++) {
            if (data[loop][2] == from) {
                from_search.push([[[data[loop][3], data[loop][1], data[loop][4]], [data[loop][2], data[loop][1]]], data[loop][4]]);
                data[loop][5] = data[loop][4];
            }
            if (data[loop][3] == from) {
                from_search.push([[[data[loop][2], data[loop][1], data[loop][4]], [data[loop][3], data[loop][1]]], data[loop][4]]);
                data[loop][5] = data[loop][4];
            }
        }
        from_data.unshift(from_search);
        from_search = [];
        //第一検索 終了

        for (let loops = 0; from_data[0] != ""; loops++) {
            for (let loop = 0; loop < data.length; loop++) {
                for (let loop2 = 0; loop2 < from_data[0].length; loop2++) {
                    if (data[loop][2] == from_data[0][loop2][0][0][0]) {
                        if (data[loop][5] == "NoData" || data[loop][5] > from_data[0][loop2][1]) {
                            from_search.unshift([[], data[loop][4] + from_data[0][loop2][1]]);
                            for (let loop3 = 0; loop3 < from_data[0][loop2][0].length; loop3++) {
                                from_search[0][0].push(from_data[0][loop2][0][loop3]);
                            }
                            from_search[0][0].unshift([data[loop][3], data[loop][1], data[loop][4]]);
                            data[loop][5] = data[loop][4] + from_data[0][loop2][1];
                        }
                    }
                    if (data[loop][3] == from_data[0][loop2][0][0][0]) {
                        if (data[loop][5] == "NoData" || data[loop][5] > from_data[0][loop2][1]) {
                            from_search.unshift([[], data[loop][4] + from_data[0][loop2][1]]);
                            for (let loop3 = 0; loop3 < from_data[0][loop2][0].length; loop3++) {
                                from_search[0][0].push(from_data[0][loop2][0][loop3]);
                            }
                            from_search[0][0].unshift([data[loop][2], data[loop][1], data[loop][4]]);
                            data[loop][5] = data[loop][4] + from_data[0][loop2][1];
                        }
                    }
                }
            }
            from_data.unshift(from_search);
            from_search = [];
        }//ループ検索終了
        from_data.shift();//空白消去

        if (from_data != "") {
            if (to != undefined && to != "") {//最短距離検索
                let count = 0;
                let to_data = [];
                for (let loop = 0; loop < from_data.length; loop++) {
                    for (let loop2 = 0; loop2 < from_data[loop].length; loop2++) {
                        if (from_data[loop][loop2][0][0][0] == to) {
                            if (count > from_data[loop][loop2][1] || count == 0) {
                                count = from_data[loop][loop2][1];
                                to_data = from_data[loop][loop2];
                            }
                        }
                    }
                }
                if (to_data == "") {
                    return ContentService.createTextOutput(JSON.stringify({ "type": "NothingToData" }));
                } else {
                    return ContentService.createTextOutput(JSON.stringify({ "main": to_data[0].reverse(), "length": to_data[1], "type": "ToData" }));
                }
            } else {
                return ContentService.createTextOutput(JSON.stringify({ "main": from_data.reverse(), "type": "AllData" }));
            }
        } else {
            return ContentService.createTextOutput(JSON.stringify({ "type": "NothingFromData" }));
        }
    }
}