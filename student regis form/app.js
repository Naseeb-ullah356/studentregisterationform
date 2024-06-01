const firebaseConfig = {
    apiKey: "AIzaSyCAbYDmRrCByhb04cjCmYUTk54FXYpHCvg",
    authDomain: "promising-keep-421410.firebaseapp.com",
    databaseURL: "https://promising-keep-421410-default-rtdb.firebaseio.com",
    projectId: "promising-keep-421410",
    storageBucket: "promising-keep-421410.appspot.com",
    messagingSenderId: "1069922014190",
    appId: "1:1069922014190:web:78b445b6fd71137d9a74ff"
};


firebase.initializeApp(firebaseConfig);
var database = firebase.database();


var studentsRef = database.ref('students');


document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var course = document.getElementById('course').value;

    var newStudentRef = studentsRef.push();
    newStudentRef.set({
        name: name,
        email: email,
        course: course
    });

    document.getElementById('studentForm').reset();
    alert('Student Registered Successfully!');
});


document.getElementById('showStudents').addEventListener('click', function () {
    studentsList.innerHTML = '';
    studentsRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var student = childSnapshot.val();
            var studentDiv = document.createElement('div');
            studentDiv.className = 'card mb-3';
            studentDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${student.name}</h5>
                    <p class="card-text">Email: ${student.email}</p>
                    <p class="card-text">Course: ${student.course}</p>
                </div>
            `;
            studentsList.appendChild(studentDiv);
        });
    });
});