async function driver() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var currurl = tabs[0].url;

    load(currurl);
  });
}

async function getUrls(url) {
  let response = await fetch("http://127.0.0.1:3000/?url=" + url);
  return response.json();
}
async function load(url) {
  let urls = await getUrls(url);
  let dispArr = [];
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * urls.length);
    dispArr.push(urls[randomIndex]);
    urls.splice(randomIndex, 1);
  }

  for (let i = 0; i < 3; i++) {
    document.getElementById("title" + i).innerHTML = dispArr[i].title;
    document.getElementById("title" + i).href = dispArr[i].link;
    document.getElementById("origin" + i).innerHTML = dispArr[i].displayLink;
    document.getElementById("readtime" + i).innerHTML = dispArr[i].read_time;
  }
  document.getElementById("loading").style.opacity = "0.0";
  document.getElementById("outer").style.opacity = "1.0";
}
document.addEventListener("DOMContentLoaded", driver);
