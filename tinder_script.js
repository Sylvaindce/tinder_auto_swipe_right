var like_button_index = -1;

var action_buttons = null;

var run = false;

var max_timeout = 1000;
var min_timeout = 200;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function get_delay() {
    return Math.random() * (max_timeout - min_timeout) + min_timeout;
}

function get_like_button() {
    var button_container = document.getElementsByClassName("recsCardboard__cardsContainer");
    if (button_container.length == 1) {
        action_buttons = button_container[0].getElementsByClassName("button");
        for (i = 0; i < action_buttons.length; ++i) {
            tmp_button = action_buttons[i].getElementsByClassName("Hidden");
            if (tmp_button.length == 1) {
                if (tmp_button[0].innerText.toLowerCase() == "like") {
                    like_button_index = i;
                    break;
                }
            }
        }
    } else {
        like_button_index = -1;
    }
}

async function like_it() {
    while (run) {
        get_like_button();
        if (like_button_index > -1) {
            await sleep(get_delay());
            if (!action_buttons[like_button_index].disabled) {
                action_buttons[like_button_index].click();
            }
        }
    }
}

function run_it() {
    if (!run) {
        run = confirm("Start swiping right ?");
        like_it();
    } else {
        window.alert("Tinder auto swipe going to stop, press S key to start it over")
        run = false;
    }
}

document.addEventListener("keypress", (event) => {
    if (event.code == "KeyS") {
        run_it();
    }
});

run_it();