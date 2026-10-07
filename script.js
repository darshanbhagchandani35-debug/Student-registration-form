// Get HTML elements

const form =
    document.getElementById("studentForm");

const studentList =
    document.getElementById("studentList");

const studentCount =
    document.getElementById("studentCount");

const message =
    document.getElementById("message");


// Get existing students from localStorage

let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


// Save students to localStorage

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// Display students

function displayStudents() {

    studentList.innerHTML = "";


    // Update student count

    studentCount.textContent =
        students.length +
        (students.length === 1
            ? " Student"
            : " Students");


    // If no students

    if (students.length === 0) {

        studentList.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="empty"
                >
                    No students registered yet.
                </td>
            </tr>
        `;

        return;
    }


    // Display each student

    students.forEach(
        (student, index) => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeHTML(student.name)}
                </td>

                <td>
                    ${escapeHTML(student.course)}
                </td>

                <td>
                    ${escapeHTML(student.semester)}
                </td>

                <td>
                    ${escapeHTML(student.mobile)}
                </td>

                <td>
                    ${escapeHTML(student.city)}
                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${index})"
                    >
                        Delete
                    </button>

                </td>
            `;


            studentList.appendChild(row);

        }
    );
}


// Protect table from HTML injection

function escapeHTML(value) {

    return String(value).replace(
        /[&<>"']/g,

        function (character) {

            const characters = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return characters[character];
        }
    );
}


// Form submit

form.addEventListener(
    "submit",

    function (event) {

        // Stop page refresh

        event.preventDefault();


        // Get mobile number

        const mobile =
            document
                .getElementById("mobile")
                .value
                .trim();


        // Check mobile number

        if (!/^[0-9]{10}$/.test(mobile)) {

            showMessage(
                "Please enter a valid 10-digit mobile number.",
                true
            );

            return;
        }


        // Create student object

        const student = {

            name:
                document
                    .getElementById("name")
                    .value
                    .trim(),

            email:
                document
                    .getElementById("email")
                    .value
                    .trim(),

            mobile: mobile,

            dob:
                document
                    .getElementById("dob")
                    .value,

            gender:
                document
                    .getElementById("gender")
                    .value,

            course:
                document
                    .getElementById("course")
                    .value,

            semester:
                document
                    .getElementById("semester")
                    .value,

            city:
                document
                    .getElementById("city")
                    .value
                    .trim(),

            address:
                document
                    .getElementById("address")
                    .value
                    .trim()
        };


        // Add student

        students.push(student);


        // Save data

        saveStudents();


        // Update table

        displayStudents();


        // Clear form

        form.reset();


        // Show success message

        showMessage(
            "Student registered successfully!"
        );

    }
);


// Delete student

function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (confirmDelete) {

        students.splice(index, 1);

        saveStudents();

        displayStudents();

        showMessage(
            "Student deleted successfully."
        );
    }
}


// Show message

function showMessage(
    text,
    error = false
) {

    message.textContent = text;

    message.style.color =
        error
            ? "#dc2626"
            : "#15803d";


    setTimeout(
        function () {

            message.textContent = "";

        },
        3000
    );
}


// Display students when page opens

displayStudents();