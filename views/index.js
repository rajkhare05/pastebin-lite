let data = { content: null, max_views: null, ttl_seconds: null };

const content = document.getElementById("content");
const maxViews = document.getElementById("maxViews");
const ttlSeconds = document.getElementById("ttlSeconds");
const container = document.getElementById("container");
const submitPaste = document.getElementById("submitPaste");
const views = document.getElementById("views");
const ttl = document.getElementById("ttl");
const popup = document.getElementById("popup");
const url = document.getElementById("url");
const copy = document.getElementById("copy");
const closePopUp = document.getElementById("closePopUp");

views.addEventListener("click", () => {
    maxViews.checked = true;
});

ttl.addEventListener("click", () => {
    ttlSeconds.checked = true;
});

container.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (content && content.value.length > 0) {
        data["content"] = content.value;
    }

    if (maxViews.checked) {
        data["max_views"] = views.value;
    }

    if (ttlSeconds.checked) {
        data["ttl_seconds"] = ttl.value;
    }

    try {
        const PROTOCOL = location.protocol;
        const HOST = location.host;
        const URL = `${PROTOCOL}//${HOST}/api/pastes`
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const paste = await res.json();

        if (paste != null && paste.url != null) {
            popup.style.display = "block";
            url.textContent = paste.url;

            // cleanup
            content.value = "";
            views.value = "";
            ttl.value = "";
            maxViews.checked = false;
            ttlSeconds.checked = false;
        }

    } catch(err) {
        console.error(err);
    }
});

copy.addEventListener("click", () => {
    navigator.clipboard.writeText(url.textContent);
});

closePopUp.addEventListener("click", () => {
    url.textContent = "";
    popup.style.display = "none";
});

