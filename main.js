document.addEventListener("keypress", KeyboardEvent => {
    document.getElementById("type box").innerHTML = KeyboardEvent.key;
    console.log(KeyboardEvent.key);
});

done = function() {
    console.log("done yeah");
}