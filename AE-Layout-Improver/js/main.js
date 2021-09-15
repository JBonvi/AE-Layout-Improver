function myFunction() {
    //------------------------------------------------------------------------------------------------create your own AE SMartname like this:  SMARTNAME XPath Query => //Result =  <<Result/>>
    var dato = `<<Result/>>`  //----------------------------------------------------------------------copy-paste here example.txt for testing, lately you must set here your smartname[Result]
    dato = dato.replaceAll("&lt;", "<")
    dato = dato.replaceAll("&gt;", ">")
    //console.log(dato)
    //------------------------------------------------------------------------------------------------split for every possible result
    var results = dato.split("</Result>")
    //console.log(results)
    //------------------------------------------------------------------------------------------------pop out empty line, (usually last result line is empty)
    if (results[results.length - 1].length < 10)
        results.pop();
    //console.log(results)
    //-----------------------------------------------------------------------------------------------create array of object with all the MFG created by AE
    var designs = [];
    //-----------------------------------------------------------------------------------------------push the array and create a dictionary with all the tecnincal information un the xml report
    for (var i = 0; i < results.length; i++) {
        designs.push({
            'DesignName': results[i].match(new RegExp('<DesignName>([^<]+)'))[1],
            'BoardCode': results[i].match(new RegExp('<BoardCode>([^<]+)'))[1],
            'BoardDesc': results[i].match(new RegExp('<BoardDesc>([^<]+)'))[1],
            'Units': results[i].match(new RegExp('<Units>([^<]+)'))[1],
            'ProdBlankAreaInCM2': results[i].match(new RegExp('<ProdBlankAreaInCM2>([^<]+)'))[1],
            'Area': results[i].match(new RegExp('<Area>([^<]+)'))[1],
            'CrossGrain': results[i].match(new RegExp('<CrossGrain>([^<]+)'))[1],
            'DiePress': results[i].match(new RegExp('<DiePress>([^<]+)'))[1],
            'GrainDirection': results[i].match(new RegExp('<GrainDirection>([^<]+)'))[1],
            'GutterSwap': results[i].match(new RegExp('<GutterSwap>([^<]+)'))[1],
            'GutterX': results[i].match(new RegExp('<GutterX>([^<]+)'))[1],
            'GutterY': results[i].match(new RegExp('<GutterY>([^<]+)'))[1],
            'Id': results[i].match(new RegExp('<Id>([^<]+)'))[1],
            'KnifeToKnifeLength': results[i].match(new RegExp('<KnifeToKnifeLength>([^<]+)'))[1],
            'KnifeToKnifeWidth': results[i].match(new RegExp('<KnifeToKnifeWidth>([^<]+)'))[1],
            'MFGFilePath': results[i].match(new RegExp('<MFGFilePath>([^<]+)'))[1],
            'NestingType': results[i].match(new RegExp('<NestingType>([^<]+)'))[1],
            'NestingTypeSwap': results[i].match(new RegExp('<NestingTypeSwap>([^<]+)'))[1],
            'OneupsInXDirection': results[i].match(new RegExp('<OneupsInXDirection>([^<]+)'))[1],
            'OneupsInYDirection': results[i].match(new RegExp('<OneupsInYDirection>([^<]+)'))[1],
            'PreviewFilePath': results[i].match(new RegExp('<PreviewFilePath>([^<]+)'))[1],
            'ScrapPercent': results[i].match(new RegExp('<ScrapPercent>([^<]+)'))[1],
            'SheetLength': results[i].match(new RegExp('<SheetLength>([^<]+)'))[1],
            'SheetWidth': results[i].match(new RegExp('<SheetWidth>([^<]+)'))[1],
            'TotalOneUps': results[i].match(new RegExp('<TotalOneUps>([^<]+)'))[1],
            'm2Per1000Sheets': results[i].match(new RegExp('<m2Per1000Sheets>([^<]+)'))[1]
        });
    }
    //console.log(designs);
    let tmpYeld = [];
    let maxYeld = null;
    let bestYeld = [];
    let tmpArea = [];
    let minArea = []
    let bestMinArea = [];
    let selectedDesigns = [];
    //Some controls just for example
    for (let i = 0; i < designs.length; i++) {
        const element = designs[i];
        if (designs[i].Units != "millimeters") {
            alert("ATTENTION: costum alert message")
        }

        if (designs[i].SheetLength < 1600 && designs[i].SheetWidth < 1100) {
            designs[i].DiePress === "Costum diepress name1" //you can find the correct diepress name in the xml report (in my case the name is 145 but is exported "1 4 5")
        } else if (1600 < designs[i].SheetLength < 1620 && 1100 < designs[i].SheetWidth < 1120) {
            designs[i].DiePress === "Costum diepress name2"
        } else if (designs[i].SheetLength < 1420 && designs[i].SheetWidth < 1020) {
            designs[i].DiePress === "Costum diepress name3"
        } else if (1420 < designs[i].SheetLength < 1450 && 1020 < designs[i].SheetWidth < 1050) {
            designs[i].DiePress === "Costum diepress name4"
        } else {
            alert("ATTENTION: costum alert message")  //set costum alert with your specific machine limitation
        }
    }

    for (let i = 0; i < designs.length; i++) {
        const element = designs[i];
        tmpYeld.push(designs[i].TotalOneUps);
    }
    //console.log(tmpYeld)  //check the number of design in every MFG generated andfind out the maximum result
    maxYeld = Math.max(...tmpYeld);
    //console.log(maxYeld, "it's the best result?")

    for (let i = 0; i < designs.length; i++) {
        const element = designs[i];
        if (designs[i].TotalOneUps == maxYeld) {
            bestYeld.push(designs[i]);
        }
    }
    //console.log(bestYeld) //push into a new array every MFG with the selected value of maxYeld

    for (let i = 0; i < bestYeld.length; i++) {
        const element = bestYeld[i];
        tmpArea.push(bestYeld[i].m2Per1000Sheets);
    }
    //console.log(tmpArea)
    minArea = Math.min(...tmpArea);
    //console.log(minArea)  //do the same with minArea to find the MFG with the minimum area

    for (let i = 0; i < bestYeld.length; i++) {
        const element = bestYeld[i];
        if (bestYeld[i].m2Per1000Sheets == minArea) {
            bestMinArea.push(bestYeld[i]);
        }
    }
    //console.log(bestMinArea) //push into a new array every MFG with the selected value of minArea

    for (let i = 0; i < designs.length; i++) {
        const element = designs[i];
        if (designs[i].TotalOneUps == maxYeld && designs[i].m2Per1000Sheets == minArea) {
            selectedDesigns.push(designs[i]);
        }
    }
    console.log(selectedDesigns, " design selezionato/i") // last check, just in case, every selected designs must respect maxYeld and minArea value, you can add costum control for every property of "designs" 


    for (let i = 0; i < selectedDesigns.length; i++) {
        const element = selectedDesigns[i];
        document.write("<ul></ul>" + "<li>" + "<b>" + "YELD SELECTED FOR:&nbsp;" + element.DesignName + "</b>" + "</br>" + "<b>" + "FILE PATH:&nbsp;" + "</b>" + "<a href='" + element.PreviewFilePath + "'>" + element.PreviewFilePath + "</a>" + "</br>" + "<b>" + "MFG PATH:&nbsp;" + "<a href='" + element.MFGFilePath + "'>" + element.MFGFilePath + "</a>" + "</li>" + "<br/>");
    }
}
myFunction()