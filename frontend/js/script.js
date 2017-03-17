document.getElementById("submitbtn").onclick = function(e){
    e.preventDefault();
    var author = document.getElementById("author").value;
    var citation = document.getElementById("citation").value;
    var episode = document.getElementById("episode").value;
    var saison = document.getElementById("saison").value;
    if (saison != "" && citation != "" &&episode != "" &&author != "" ){
    $("#ModalAjout").modal("hide");

    if (document.getElementById("fileupload").files) {
        
        var FR= new FileReader();
        
        FR.addEventListener("load", function(e) {
        console.log(e.target.result);
        }); 
        
    }
    var obj = {
        "author": author,
        "chapter": saison,
        "episode": episode,
        "content": citation,
        "date": new Date(),
        "image": ""
    }
    console.log(obj);
    var xhr = new XMLHttpRequest();
	xhr.open('POST', "http://localhost:3000/articles")
    xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.send(JSON.stringify(obj));	
    GetArticles();

    }
}
$(document).ready(function(){
    GetArticles();
});


function GetArticles(){
    $( ".articles" ).empty();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == XMLHttpRequest.DONE){
            if (xhr.status == 200){
                AddArticles(JSON.parse(xhr.response));
            }
        }
    }
	xhr.open('GET', "http://localhost:3000/articles")
	xhr.send();	

}
function Delete(_this){
    var target = $(_this).data("target").replace(" ", "");
    $("."+target).remove();
    var xhr = new XMLHttpRequest();
	xhr.open('DELETE', "http://localhost:3000/articles/" + target.replace("article", ""))
    xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.send();	
}
function AddArticles(articles){
    for (objarticle of articles) {

    var article = "<div class=\"col-sm-6 col-md-4 col-xs-12 article"+ objarticle.id +"\">\
        <div class=\"thumbnail\">\
          <div class=\"img-box\">\
            <img class=\"kaamelott-underline\" src=\""+ objarticle.image +"\" alt=\""+ objarticle.author + "," + objarticle.chapter + "," + objarticle.episode + "\">\
          </div>\
          <div class=\"quote\">\
            <blockquote> "+ objarticle.content + "</blockquote>\
            <p class=\"source\">\
              " + objarticle.author + ",\
              <i>" + objarticle.chapter + "," + objarticle.episode + "</i>\
            </p>\
            <span class=\"hider\"></span>\
          </div>\
          <p class=\"item-actions\">\
          <a class=\"btn btn-danger\" role=\"button\" onclick=\"Delete(this);\" data-target=\" article"+ objarticle.id +"\">Supprimer</a>\
            <a class=\"btn btn-kaamelott\" role=\"button\" data-toggle=\"modal\" data-target=\"#" + objarticle.id +"\">Voir plus</a></p>\
        </div>\
      </div>\
      <div class=\"modal fade article"+ objarticle.id +"\" id=\"" + objarticle.id +"\" tabindex=\"-1\" role=\"dialog\">\
        <div class=\"modal-dialog\" role=\"document\">\
          <div class=\"modal-content\">\
            <div class=\"modal-header\">\
              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\
            </div>\
            <div class=\"modal-body\">\
            <blockquote> "+ objarticle.content + "</blockquote>\
                <p class=\"source\">" + objarticle.author + "<i> " + objarticle.chapter + "," + objarticle.episode + "</i>\
             </p>\
            </div>\
          </div>\
        </div>\
      </div>"
      $( ".articles" ).append( article );
    }
}