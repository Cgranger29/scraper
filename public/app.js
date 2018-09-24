$.getJSON("/articles",function(data){
    let html;
    for(let i=0; i < data.length;i++){
        html+="<div class=\"row\">";
        html+="<div class=\"col-9\" id=\"articles\">";
        html+="<div class=\"list-group\">";
        html+="<a href=\"" + data[i].link + "\" class=\"list-group-item list-group-item-action flex-column align-items-start\">";
        html+="<div class =\"d-flex w-100 justify-content-between\">";
        html+="<h5 class=\"mb-1\">" + data[i].title + "</h5>"
        html+="</div>";
        html+="<p class=\"mb-1\">" + "Artice Summary will go here" + "</p>";
        html+="<small>" + data[i].link + "</small>";
        html+="<br>";
        html+="<br>";
        html+="<div class=\"row\">";
        html+="<p><strong>" + "User Comment here" + "</strong></p>";
        html+="</div>";
        html+="</a>";
        html+="</div>";
        html+="</div>";
        html+="</div>";

        
    };
    $("#article_list").append(html);
})


/* <div class="row">

<!-- List the articles will be added to-->
<div class="col-9" id="article_list">
    <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Article Title</h5>
            </div>
            <p class="mb-1">Article Summary</p>
            <small>Article URL</small>
            <br>
            <br>
            <div class="row">
                <p><strong>User Comments:</strong></p>

            </div>
        </a>
    </div>     
</div>

<!-- Comment form -->
<div class="col-2">
    <form>
        <div class="form-group">
            <label>Enter a Comment Below:</label>
            <input type="text" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Post Comment</button>
    </form>
</div>
</div> */