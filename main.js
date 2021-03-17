var key = "AIzaSyBHbxss9C0fVG-y-UqoyQqYy-c1kEGBcvI";

var videoList = document.querySelector(".video-list");
var search = document.querySelector(".search input");
var searchButton = document.querySelector(".search button");
var videoPreview = document.querySelector(".video-preview");

function onSearch() {
  search.value.trim() && getData(search.value);
  search.value = "";
}

function getData() {

  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=" +
  search.value +
  "&key=" +
  key;
  var req = new XMLHttpRequest();
  req.open("GET",url);
  req.onload = function(){
    listVideos(JSON.parse(req.responseText))
  }
  req.send();
}
function listVideos(data) {
  videoList.innerHTML=" ";
  data.items.forEach(function(video) {
    createVideo(video)
  });
  
}
function createVideo(video) {
  var container = document.createElement("div");
  var textWrapper = document.createElement("div")

  var image = document.createElement("img");
  image.setAttribute("src",video.snippet.thumbnails.default.url);
  container.appendChild(image);

  var title = document.createElement("h3");
  title.textContent = video.snippet.title;
  textWrapper.appendChild(title);

  var desc = document.createElement("p");
  desc.textContent = video.snippet.description;
  textWrapper.appendChild(desc);

  container.appendChild(textWrapper);
    container.addEventListener("click",function(){
    videoPreview.setAttribute('src','https://www.youtube.com/embed/' + video.id.videoId);
  }) 
  videoList.appendChild(container);

  textWrapper.querySelectorAll("h3","image").forEach(function(element){
    element.addEventListener('click', function() {
			openVideo(video.id.videoId)
		});
	});
  textWrapper.querySelectorAll("h3","image").forEach(function(element){
    element.addEventListener('click', function() {
			getRelatedVideos(video.id.videoId)
		});
	});
}


searchButton.addEventListener("click",getData)

function getRelatedVideos(id) {
  var relatedVideosRequest = new XMLHttpRequest();

  relatedVideosRequest.open(
    "GET",
    " https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=" +
      id +
      "&type=video&key=" +
      key
  );

  relatedVideosRequest.onload = function() {
    listVideos(JSON.parse(relatedVideosRequest.responseText));
  };

  relatedVideosRequest.send();
}
function openVideo(id) {
	videoPreview.innerHTML = '<iframe width="100%" src="https://www.youtube.com/embed/' + id + 
	'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
};
searchButton.addEventListener("click", onSearch);

