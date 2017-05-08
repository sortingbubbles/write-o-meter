function getNumOfWords(){
        var numOfWords = $.trim($('[name="textAnalysis"]').val()).split(' ').filter(function(v){return v!==''}).length;
        document.getElementById("wordCount").innerText = numOfWords;
}