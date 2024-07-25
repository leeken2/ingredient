import React, { useState } from "react";
import * as XLSX from "xlsx";

function ExcelUpload() {
  const [file, setFile] = useState(null);
  const [workbook, setWorkbook] = useState(null);

  const [data, setData] = useState(null);

  // 文件选择改变时的处理函数
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setFile(files[0]);

    // 读取文件
    const reader = new FileReader();
    reader.onload = (e) => {
      /* 读取文件后，转换为二进制字符串 */
      console.log("e--->", e);

      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      // 获取第一个工作表
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // 将工作表转换为JSON对象数组
      const json = XLSX.utils.sheet_to_json(worksheet);

      // console.log("json--->", json);
      setData(json)

      setWorkbook(workbook);
      // const json = XLSX.utils.sheet_to_json(worksheet);
    };
    reader.readAsBinaryString(files[0]);
  };

  // 保存数据到新文件
  const saveAsNewFile = () => {
    console.log("workbook-->", workbook);
    if (!workbook) return;



    // // 写入新文件
    // const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    // const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // // 创建一个隐藏的可下载链接
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(blob);
    // link.download = 'newfile.xlsx';
    // link.click();
  };

  // 将字符串转换为ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={saveAsNewFile}>Save as New File</button>
    </div>
  );
}

export default ExcelUpload;
