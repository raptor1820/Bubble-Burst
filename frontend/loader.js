function driver() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const currurl = tabs[0].url;

    load(currurl);
  });
}

async function getUrls(url) {
  const response = await fetch(
    "https://resonant-tube-372613.el.r.appspot.com/?url=" + url
    // " https://dummy.restapiexample.com/api/v1/employees"
  );
  return response.json();
}
async function load(url) {
  const urls = await getUrls(url);
  const dispArr = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * urls.length);
    dispArr.push(urls[randomIndex]);
    urls.splice(randomIndex, 1);
  }

  for (let i = 0; i < 3; i++) {
    document.getElementById("title" + i).innerHTML = dispArr[i].title;
    document.getElementById("title" + i).href = dispArr[i].link;
    document.getElementById("origin" + i).innerHTML = dispArr[i].displayLink;
    // document.getElementById("readtime" + i).innerHTML = dispArr[i].read_time;
  }
  document.getElementById("loading").style.opacity = "0.0";
  document.getElementById("outer").style.opacity = "1.0";
}
document.addEventListener("DOMContentLoaded", driver);
