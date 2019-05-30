import { Injectable } from '@angular/core';

declare var ActiveXObject: any;

@Injectable({
  providedIn: 'root'
})
export class ExceloutService {

  constructor() { }

  idTmr: any;

// 非ie浏览器下执行
  tableToNotIE = (() => {
  // 编码要用utf-8不然默认gbk会出现中文乱码
  const uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)));

    },

    format = (s, c) => {
      return s.replace(/{(\w+)}/g,
        (m, p) => {
          return c[p];
        });
    };
  return (table, name) => {
    const ctx = {
      worksheet: name,
      table
    };

    // 创建下载
    const link = document.createElement('a');
    link.setAttribute('href', uri + base64(format(template, ctx)));

    link.setAttribute('download', name);


    // window.location.href = uri + base64(format(template, ctx))
    link.click();
  };
})();
  getExplorer = () => {
  const explorer = window.navigator.userAgent;
  // ie
  if (explorer.indexOf('MSIE') >= 0) {
    return 'ie';
  } else if (explorer.indexOf('Firefox') >= 0) {
    return 'Firefox';
  } else if (explorer.indexOf('Chrome') >= 0) {
    return 'Chrome';
  } else if (explorer.indexOf('Opera') >= 0) {
    return 'Opera';
  } else if (explorer.indexOf('Safari') >= 0) {
    return 'Safari';
  }
}
// 判断浏览器是否为IE
 exportToExcel = (data, name) => {

  // 判断是否为IE
  if (this.getExplorer() === 'ie') {
    this.tableToIE(data, name);
  } else {
    this.tableToNotIE(data, name);
  }
}

 Cleanup = () => {
  window.clearInterval(this.idTmr);
}

// ie浏览器下执行
 tableToIE = (data, name) => {
  // const curTbl = data;
  // let oXL = new ActiveXObject('Excel.Application');
  //
  // // 创建AX对象excel
  // const oWB = oXL.Workbooks.Add();
  // // 获取workbook对象
  // const xlsheet = oWB.Worksheets(1);
  // // 激活当前sheet
  // const sel = document.body.createTextRange();
  // sel.moveToElementText(curTbl);
  // // 把表格中的内容移到TextRange中
  // sel.select;
  // // 全选TextRange中内容
  // sel.execCommand('Copy');
  // // 复制TextRange中内容
  // xlsheet.Paste();
  // // 粘贴到活动的EXCEL中
  //
  // oXL.Visible = true;
  // // 设置excel可见属性
  //  const fname: any;
  // try {
  //    fname = oXL.Application.GetSaveAsFilename('Excel.xls', 'Excel Spreadsheets (*.xls), *.xls');
  // } catch (e) {
  //   print('Nested catch caught ' + e);
  // } finally {
  //   oWB.SaveAs(fname);
  //
  //   oWB.Close(savechanges = false);
  //   // xls.visible = false;
  //   oXL.Quit();
  //   oXL = null;
  //   // 结束excel进程，退出完成
  //   window.setInterval('Cleanup();', 1);
  //   idTmr = window.setInterval('Cleanup();', 1);
  // }
}

// 导出函数
 export2Excel = (theadData, tbodyData, dataname) => {

    const re = /http/; // 字符串中包含http,则默认为图片地址
    const th_len = theadData.length; // 表头的长度
    const tb_len = tbodyData.length; // 记录条数
    const width = 40; // 设置图片大小
    const height = 60;

    // 添加表头信息
    let thead = '<thead><tr>';
    for (let i = 0; i < th_len; i++) {
      thead += '<th>' + theadData[i] + '</th>';
    }
    thead += '</tr></thead>';

    // 添加每一行数据
    let tbody = '<tbody>';
    for (let i = 0; i < tb_len; i++) {
      tbody += '<tr>';
      const row = tbodyData[i]; // 获取每一行数据

      for (const key in row) {
        if (re.test(row[key])) { // 如果为图片，则需要加div包住图片
          //
          tbody += '<td style="width:' + width + 'px; height:' + height + 'px; text-align: center; vertical-align: middle"><div style="display:inline"><img src=\'' + row[key] + '\' ' + ' ' + 'width=' + '\"' + width + '\"' + ' ' + 'height=' + '\"' + height + '\"' + '></div></td>';
        } else {
          tbody += '<td style="text-align:center">' + row[key] + '</td>';
        }
      }
      tbody += '</tr>';
    }
    tbody += '</tbody>';

    const table = thead + tbody;

    // 导出表格
    this.exportToExcel(table, dataname);
  }



}
