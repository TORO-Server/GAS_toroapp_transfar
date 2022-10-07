function doGet(e) {
    let spreadsheet = SpreadsheetApp.openById('スプレッドシートのID');
    let sheet = spreadsheet.getSheetByName('路線データベース');

    let list = e.parameter.list;//リスト表示
    let from = e.parameter.from;//出発場所
    let to = e.parameter.to;//到着場所

    //全駅名 取得
    let length = sheet.getRange(`B3:B`).getValues().findIndex(item => item[0] === "") + 2;

    return ContentService.createTextOutput(main(list, from, to, sheet, length));
}
function main(list, from, to, sheet, length) {
    try {
        if (isParameter(list)) {//一覧
            const json = JSON.stringify(list_main(list, sheet, length));
            console.log(json);
            return ContentService.createTextOutput(json);
        } else if (isParameter(from) && from != to) {//検索
            const json = JSON.stringify(from_main(from, to, sheet, length));
            console.log(json);
            return json;
        } else {//エラー
            return JSON.stringify({ "type": "Error" });
        }
    } catch (err) {
        console.log(err);
        return JSON.stringify({ "type": "Error" });
    }
}


function test() {
    let spreadsheet = SpreadsheetApp.openById('スプレッドシートのID');
    let sheet = spreadsheet.getSheetByName('路線データベース');
    //全駅名 取得
    let length = sheet.getRange(`B3:B`).getValues().findIndex(item => item[0] === "") + 2;
    main(undefined, "test_1", undefined, sheet, length);
}