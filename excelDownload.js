function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    ////If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    //var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    //Generate a file name
    var fileName = "My_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    ////Initialize file format you want csv or xls
    //var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension   

    var csvData = Papa.unparse(JSONData);

    var blob = new Blob([csvData]);
    if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        window.navigator.msSaveBlob(blob, fileName + ".csv");
    else {
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
        a.download = fileName + ".csv";
        document.body.appendChild(a);
        a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        document.body.removeChild(a);
    }

}