// 同じ検索の結果を覚えておく秒数。誰でも呼べる API なので、毎回スプレッドシートを読まないようにする
const CACHE_SECONDS = 300;
// CacheService に入る値は 100 KB まで
const CACHE_MAX_CHARS = 30000;
// 駅名や路線名はこれより長くならない
const PARAMETER_MAX_CHARS = 100;

function doGet(e) {
    let list = e.parameter.list;//リスト表示
    let from = e.parameter.from;//出発場所
    let to = e.parameter.to;//到着場所

    if ([list, from, to].some(value => isParameter(value) && value.length > PARAMETER_MAX_CHARS)) {
        return ContentService.createTextOutput(JSON.stringify({ "type": "Error" }));
    }

    const cache = CacheService.getScriptCache();
    const key = cacheKey(list, from, to);
    const cached = cache.get(key);
    if (cached !== null) {
        return ContentService.createTextOutput(cached);
    }

    let spreadsheet = SpreadsheetApp.openById('スプレッドシートのID');
    let sheet = spreadsheet.getSheetByName('路線データベース');

    //全駅名 取得
    let length = sheet.getRange(`B3:B`).getValues().findIndex(item => item[0] === "") + 2;

    const json = main(list, from, to, sheet, length);
    if (json.length <= CACHE_MAX_CHARS && JSON.parse(json).type !== "Error") {
        cache.put(key, json, CACHE_SECONDS);
    }
    return ContentService.createTextOutput(json);
}
function cacheKey(list, from, to) {
    const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, JSON.stringify([list, from, to]), Utilities.Charset.UTF_8);
    return Utilities.base64EncodeWebSafe(digest);
}
function main(list, from, to, sheet, length) {
    try {
        if (isParameter(list)) {//一覧
            const json = JSON.stringify(list_main(list, sheet, length));
            console.log(json);
            return json;
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
