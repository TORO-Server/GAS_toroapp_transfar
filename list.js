function list_main(list, sheet, length) {
    switch (list) {
        case "line":
            return line(sheet, length);
        case "station":
            return station(sheet, length);
        case "company":
            return company(sheet, length);
        default:
            return { "type": "NothingListData" };
    }
}

//----------util----------//
function line(sheet, length) {//-----路線名データ-----
    let data1 = sheet.getRange(`C3:C${length}`).getValues();//すべての線データ
    const data = list_createArray(data1, []);
    return { "main": data, "type": "LineList" };
}
function station(sheet, length) {//-----駅データ-----
    let data1 = sheet.getRange(`D3:D${length}`).getValues();//すべての駅1データ
    let data2 = sheet.getRange(`E3:E${length}`).getValues();//すべての駅2データ

    let data = list_createArray(data1, []);
    list_createArray(data2, data);
    return { "main": data, "type": "StationList" };
}
function company(sheet, length) {//-----鉄道会社のデータ-----
    let data1 = sheet.getRange(`B3:B${length}`).getValues();//すべての鉄道会社データ
    const data = list_createArray(data1, []);
    return { "main": data, "type": "CompanyList" };
}
//----------util----------//