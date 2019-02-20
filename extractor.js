var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require("fs");

var myUrl = "https://developer.mozilla.org/en-US/docs/Web/API";

getHTMLFromUrl(myUrl)
.then( responseText => {
    var res = "# Lista \n";
    
    var divList = responseText.match(/<div class="index">[\s\S]*?<\/div>/);
    
    divList.forEach( e => {
        //console.log(e);
        e.match(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g).forEach(element => {
            element = element.replace("/en-US/docs/Web/API","https://developer.mozilla.org/en-US/docs/Web/API");
            res += `- [ ] ${element} \n`;
            
        });
    });

    

    fs.writeFile('./output/list.md', res, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    
})
.catch( e=> console.log(e));







function getHTMLFromUrl(url){
    return new Promise(function(res,rej){    

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function()
        {
            if (xhr.readyState==4 && xhr.status==200)
            {                
                res(xhr.responseText);
            }else{
                rej(xhr.status);
            }
        }
        xhr.open("GET", url, false );
        xhr.send();
    });
}