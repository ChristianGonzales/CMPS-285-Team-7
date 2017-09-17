var popUpWindow = document.getElementById('popUpWindow'); //Get modal
var startButton = document.getElementById("startButton"); // Get the button that opens the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
var characterButton = document.getElementById("characterButtons"); //Button for tank, wizard, elf
// When the user clicks the button, open the modal
startButton.onclick = function () {
    popUpWindow.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function (){
    popUpWindow.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        popUpWindow.style.display = "none";
    }
}
// When the user clicks any of the character buttons
characterButton.onclick = createCharacter(getCharacterType()) {
}
