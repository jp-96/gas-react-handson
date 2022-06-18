import MyLogger from './api/mylogger';
import Sheetdata from './api/sheetdata';

function doGet(e: GoogleAppsScript.Events.DoGet) {
    MyLogger.log(JSON.stringify(e));
    const template = HtmlService.createTemplateFromFile("index");
    template.querystring = JSON.stringify(e);
    return template
        .evaluate()
        .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
        .setTitle("Learning React");
}

function getData(): Sheetdata.SheetData {
    return Sheetdata.getSheetData('colorlist');
}

function putData(sheetData: Sheetdata.SheetData) {
    Sheetdata.putSheetData('colorlist', sheetData);
}