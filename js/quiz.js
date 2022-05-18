let button = document.getElementById("button");
let introText = document.getElementById("introText");

// let questionIntro = document.getElementById("questionIntro");
let questionText = document.getElementById("questionText");
let questionBox = document.getElementById("questionBox");
let slider = document.getElementById("slider");
let slider_container = document.getElementById("slider-container");

let current_question = 0;
let answers = [];

function beginQuestioniare() {
    button.style.visibility = "hidden";
    button.style.opacity = "0";

    introText.style.top = "-120px";
    questionText.style.visibility = "visible";
    questionText.style.opacity = "1";
    questionBox.style.visibility = "visible";
    questionBox.style.opacity = "1";

    initQuestion();
}

function nextQuestion(value) {
    answers[current_question] = value;
    ++current_question;

    console.log("answer: " + value);

    if (current_question == questions.length) {
        results();
        console.log(answers);
    } else {
        initQuestion();
    }
}

function initQuestion() {
    introText.innerHTML = questions[current_question].intro;
    questionText.innerHTML = questions[current_question].text;
    for (let i = 0; i < 5; ++i) {
        var option = "option" + (i + 1);
        document.getElementById(option).innerHTML = questions[current_question].options[i];
    }
}

function percentage(value, min, max) {
    let ans = (value - min) / (max - min) * 100;
    return ans.toFixed(1);
}

function m(i) {
    return answers[i - 1];
}

function results() {
    // http://geerthofstede.com/wp-content/uploads/2016/07/Manual-VSM-2013.pdf
    let extreme_values = {
        "pdi": 240,
        "idv": 280,
        "mas": 280,
        "uai": 260,
        "lto": 260,
        "ivr": 300
    };
    let abs_values = [];
    abs_values[0] = 35 * (m(07) - m(02)) + 25 * (m(20) - m(23)); // PDI
    abs_values[1] = 35 * (m(04) - m(01)) + 35 * (m(09) - m(06)); // IDV
    abs_values[2] = 35 * (m(05) - m(03)) + 35 * (m(08) - m(10)); // MAS
    abs_values[3] = 40 * (m(18) - m(15)) + 25 * (m(21) - m(24)); // UAI
    abs_values[4] = 40 * (m(13) - m(14)) + 25 * (m(19) - m(22)); // LTO
    abs_values[5] = 35 * (m(12) - m(11)) + 40 * (m(17) - m(16)); // IVR

    let rel_values = [];
    rel_values[0] = percentage(abs_values[0], -extreme_values["pdi"], extreme_values["pdi"]); // PDI
    rel_values[1] = percentage(abs_values[1], -extreme_values["idv"], extreme_values["idv"]); // IDV
    rel_values[2] = percentage(abs_values[2], -extreme_values["mas"], extreme_values["mas"]); // MAS
    rel_values[3] = percentage(abs_values[3], -extreme_values["uai"], extreme_values["uai"]); // UAI
    rel_values[4] = percentage(abs_values[4], -extreme_values["lto"], extreme_values["lto"]); // LTO
    rel_values[5] = percentage(abs_values[5], -extreme_values["ivr"], extreme_values["ivr"]); // IVR

    let new_location = `results.html` +
        `?pdi=${rel_values[0]}` +
        `&idv=${rel_values[1]}` +
        `&mas=${rel_values[2]}` +
        `&uai=${rel_values[3]}` +
        `&lto=${rel_values[4]}` +
        `&ivr=${rel_values[5]}`;

    location.href = new_location;
}