namespace Sheetdata {

  export interface color {
    id: string;
    title: string;
    color: string;
    rating: number;
  };

  export interface SheetData {
    colors: color[];
  }

  export function getSheetData(sheetName: string): SheetData {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`Missing sheet: '${sheetName}'`);
    }
    const colors: color[] = [];
    const maxRows = sheet.getMaxRows();
    if (maxRows > 1) {
      const recordSet = sheet.getRange(2, 1, maxRows - 1, 4).getValues();
      for (const record of recordSet) {
        colors.push(
          {
            id: record[0],
            title: record[1],
            color: record[2],
            rating: record[3],
          }
        );
      }
    }
    return {
      colors
    };
  };

  export function putSheetData(sheetName: string, sheetData: SheetData): void {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`Missing sheet: '${sheetName}'`);
    }
    const maxRows = sheet.getMaxRows();
    if ((maxRows - 1) > sheetData.colors.length) {
      sheet.getRange(sheetData.colors.length + 2, 1, maxRows - 1, 4).clearContent();
      sheet.deleteRows(sheetData.colors.length + 2, maxRows - sheetData.colors.length - 1);
    }
    if (sheetData.colors.length > 0) {
      const recordSet: any[][] = [];
      for (const record of sheetData.colors) {
        recordSet.push(
          [
            record.id,
            record.title,
            record.color,
            record.rating,
          ]
        );
        sheet.getRange(2, 1, recordSet.length, 4).setValues(recordSet);
      }
    }
  };

}

export default Sheetdata;