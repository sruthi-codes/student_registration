// ==========================================
// DARK / LIGHT MODE
// ==========================================

const themeButton =
    document.getElementById("themeButton");

const themeIcon =
    document.getElementById("themeIcon");

const themeText =
    document.getElementById("themeText");


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const darkMode =
        document.body.classList.contains("dark-mode");


    if (darkMode) {

        themeIcon.className =
            "bi bi-sun-fill";

        themeText.textContent =
            "Light Mode";

    } else {

        themeIcon.className =
            "bi bi-moon-fill";

        themeText.textContent =
            "Dark Mode";
    }

});


// ==========================================
// DOB - PREVENT FUTURE DATE
// ==========================================

const dobInput =
    document.getElementById("dob");

const today =
    new Date().toISOString().split("T")[0];

dobInput.setAttribute("max", today);


// ==========================================
// FORM
// ==========================================

const form =
    document.getElementById("studentForm");

const resultSection =
    document.getElementById("resultSection");


form.addEventListener("submit", function (event) {

    event.preventDefault();


    // ==========================================
    // PERSONAL DETAILS
    // ==========================================

    const name =
        document.getElementById("studentName")
        .value.trim();

    const email =
        document.getElementById("email")
        .value.trim();

    const phone =
        document.getElementById("phone")
        .value.trim();

    const dob =
        document.getElementById("dob")
        .value;

    const gender =
        document.getElementById("gender")
        .value;

    const course =
        document.getElementById("course")
        .value;


    // ==========================================
    // MARKS
    // ==========================================

    const html =
        Number(document.getElementById("htmlMarks").value);

    const bootstrap =
        Number(document.getElementById("bootstrapMarks").value);

    const javascript =
        Number(document.getElementById("javascriptMarks").value);

    const database =
        Number(document.getElementById("databaseMarks").value);

    const java =
        Number(document.getElementById("javaMarks").value);

    const dsa =
        Number(document.getElementById("dsaMarks").value);


    // ==========================================
    // VALIDATION
    // ==========================================

    let valid = true;


    // Name

    if (name === "") {

        showError("studentName");

        valid = false;

    } else {

        removeError("studentName");

    }


    // Email

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError("email");

        valid = false;

    } else {

        removeError("email");

    }


    // Phone

    const phonePattern =
        /^[0-9]{10}$/;


    if (!phonePattern.test(phone)) {

        showError("phone");

        valid = false;

    } else {

        removeError("phone");

    }


    // DOB

    if (dob === "") {

        showError("dob");

        valid = false;

    } else {

        removeError("dob");

    }


    // Gender

    if (gender === "") {

        showError("gender");

        valid = false;

    } else {

        removeError("gender");

    }


    // Course

    if (course === "") {

        showError("course");

        valid = false;

    } else {

        removeError("course");

    }


    // ==========================================
    // MARK VALIDATION
    // ==========================================

    const markData = [

        ["htmlMarks", html],

        ["bootstrapMarks", bootstrap],

        ["javascriptMarks", javascript],

        ["databaseMarks", database],

        ["javaMarks", java],

        ["dsaMarks", dsa]

    ];


    markData.forEach(function (item) {

        const id = item[0];

        const mark = item[1];

        const input =
            document.getElementById(id);


        if (
            input.value === "" ||
            mark < 0 ||
            mark > 100
        ) {

            showError(id);

            valid = false;

        } else {

            removeError(id);

        }

    });


    // Stop if invalid

    if (!valid) {

        alert(
            "Please enter all details correctly."
        );

        return;

    }


    // ==========================================
    // TOTAL
    // ==========================================

    const total =
        html +
        bootstrap +
        javascript +
        database +
        java +
        dsa;


    // ==========================================
    // PERCENTAGE
    // ==========================================

    const percentage =
        (total / 600) * 100;


    // ==========================================
    // GRADE
    // ==========================================

    let grade;


    if (percentage >= 90) {

        grade = "A+";

    } else if (percentage >= 80) {

        grade = "A";

    } else if (percentage >= 70) {

        grade = "B";

    } else if (percentage >= 60) {

        grade = "C";

    } else if (percentage >= 50) {

        grade = "D";

    } else if (percentage >= 35) {

        grade = "E";

    } else {

        grade = "F";

    }


    // ==========================================
    // PASS / FAIL
    // ==========================================

    const passed =
        html >= 35 &&
        bootstrap >= 35 &&
        javascript >= 35 &&
        database >= 35 &&
        java >= 35 &&
        dsa >= 35;


    // ==========================================
    // DISPLAY STUDENT DETAILS
    // ==========================================

    document.getElementById("resultName")
        .textContent = name;

    document.getElementById("resultEmail")
        .textContent = email;

    document.getElementById("resultPhone")
        .textContent = phone;


    // ==========================================
    // FORMAT DOB
    // ==========================================

    const dobDate =
        new Date(dob + "T00:00:00");


    const formattedDob =
        dobDate.toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "long",

            year: "numeric"

        });


    document.getElementById("resultDob")
        .textContent = formattedDob;


    document.getElementById("resultGender")
        .textContent = gender;

    document.getElementById("resultCourse")
        .textContent = course;


    // ==========================================
    // DISPLAY RESULT
    // ==========================================

    document.getElementById("totalMarks")
        .textContent = total;


    document.getElementById("percentage")
        .textContent =
        percentage.toFixed(2);


    document.getElementById("grade")
        .textContent = grade;


    document.getElementById("progressText")
        .textContent =
        percentage.toFixed(2);


    // ==========================================
    // PROGRESS BAR
    // ==========================================

    const progressBar =
        document.getElementById("progressBar");


    progressBar.style.width =
        percentage + "%";


    // ==========================================
    // STATUS
    // ==========================================

    const statusBox =
        document.getElementById("statusBox");


    statusBox.classList.remove(
        "status-pass",
        "status-fail"
    );


    if (passed) {

        statusBox.classList.add(
            "status-pass"
        );


        statusBox.innerHTML =
            "🎉 Congratulations! You Passed! 🎉";


        // Celebration

        createCelebration();

    } else {

        statusBox.classList.add(
            "status-fail"
        );


        statusBox.innerHTML =
            "❌ Unfortunately, You Failed. Keep Practicing!";

    }


    // ==========================================
    // SHOW RESULT
    // ==========================================

    resultSection.classList.remove("d-none");


    resultSection.scrollIntoView({

        behavior: "smooth"

    });

});


// ==========================================
// ERROR FUNCTION
// ==========================================

function showError(id) {

    document
        .getElementById(id)
        .classList.add("is-invalid");

}


// ==========================================
// REMOVE ERROR
// ==========================================

function removeError(id) {

    document
        .getElementById(id)
        .classList.remove("is-invalid");

}


// ==========================================
// CELEBRATION EFFECT
// ==========================================

function createCelebration() {

    const celebration =
        document.getElementById("celebration");


    const colors = [

        "#22c55e",

        "#4ade80",

        "#86efac",

        "#facc15",

        "#fb7185",

        "#38bdf8"

    ];


    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");


        piece.classList.add("confetti");


        // Random horizontal position

        piece.style.left =
            Math.random() * 100 + "vw";


        // Random color

        piece.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        // Random delay

        piece.style.animationDelay =
            Math.random() * 0.8 + "s";


        celebration.appendChild(piece);


        // Remove after animation

        setTimeout(function () {

            piece.remove();

        }, 3500);

    }

}


// ==========================================
// RESET
// ==========================================

document.getElementById("resetBtn")
    .addEventListener("click", function () {

        resultSection.classList.add("d-none");


        document.querySelectorAll(
            ".form-control, .form-select"
        ).forEach(function (element) {

            element.classList.remove(
                "is-invalid"
            );

        });

    });