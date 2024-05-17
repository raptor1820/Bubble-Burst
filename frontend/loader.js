function driver() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const currurl = tabs[0].url;

        load(currurl);
    });
}

async function getUrls(url) {
    const response = await fetch(
        "https://apibubbleburst.ritwic.com/?url=" + url
    );

    return response.json();
}
async function load(url) {
    const dispArr = await getUrls(url);

    for (let i = 0; i < 10; i++) {
        print(dispArr[i]);
        if (!dispArr[i]) {
            console.log("breaking");
        }
        document.getElementById("title" + i).innerHTML = dispArr[i].title;
        document.getElementById("title" + i).href = dispArr[i].link;
        document.getElementById("origin" + i).innerHTML =
            dispArr[i].displayLink;
        // document.getElementById("readtime" + i).innerHTML = dispArr[i].read_time;
    }
    document.getElementById("loading").style.opacity = "0.0";
    document.getElementById("outer").style.opacity = "1.0";
    document.getElementById("buttons").style.opacity = "1.0";
}
document.addEventListener("DOMContentLoaded", driver);
