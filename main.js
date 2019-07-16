$(document).ready(function () {

    //Declare variables / instantiate objects
    let students = [new Student(1, 'John', 'Doe', '1981-05-05', '2000'),
        new Student(2, 'George', 'Doe', '1981-05-05', '2000'),
        new Student(3, 'Anna', 'Doe', '1981-05-05', '2500'),
        new Student(4, 'Sarah', 'Doe', '1981-05-05', '2000'),
        new Student(5, 'John', 'Smith', '1981-05-05', '2000'),
        new Student(6, 'George', 'Smith', '1981-05-05', '2500'),
        new Student(7, 'Anna', 'Smith', '1981-05-05', '2000'),
        new Student(8, 'Sarah', 'Smith', '1981-05-05', '2000')
    ];

    let trainers = [new Trainer(1, 'Albert', 'Einstein', 'Physicist'),
        new Trainer(2, 'Max', 'Planck', 'Mathematician'),
        new Trainer(3, 'Niels', 'Bohr', 'Physicist'),
        new Trainer(4, 'Enrico', 'Fermi', 'Biologist')
    ];

    let courses = [
        new Course(1, 'Physics', 'Fluid Dynamics', 'Full Time', '2019-06-06', '2019-06-30'),
        new Course(2, 'Mathematics', 'Algebra', 'Part Time', '2019-06-06', '2019-06-30'),
        new Course(3, 'Chemistry', 'Organic', 'Full Time', '2019-06-06', '2019-06-30'),
        new Course(4, 'Biology', 'Genetics', 'Part Time', '2019-06-06', '2019-06-30')
    ];

    let assignments = [
        new Assignment(1, 'Matrices', 'Description', '2019-06-06'),
        new Assignment(2, 'Tensor Analysis', 'Description', '2019-06-06'),
        new Assignment(3, 'Non Linear Algebra', 'Description', '2019-06-06'),
        new Assignment(4, 'Vector Analysis', 'Description', '2019-06-06')
    ];

    let marks = [
        new Mark(2, 1, 79, 100),
        new Mark(3, 1, 80, 100),
        new Mark(3, 3, 70, 80),
        new Mark(4, 2, 97, 98)
    ]

    courses[0].students = [1, 3, 4]
    courses[1].students = [7, 2]
    courses[2].students = [4, 5, 3]
    courses[3].students = [6, 7]

    courses[0].trainers = [4, 1]
    courses[1].trainers = [1, 2]
    courses[2].trainers = [4, 3]
    courses[3].trainers = [2, 3]

    courses[0].assignments = [2, 3]
    courses[1].assignments = [4, 1]
    courses[2].assignments = [4, 2, 3]
    courses[3].assignments = [1, 2]

    //Define click events
    $('#filterPerCourse').siblings('div').children('button').click(function () {
        let courseId, studentId;
        let courseName = $('#filterPerCourse').val()
        let studentName = $('#filterPerStudent').val()
        if ($('#filterPerCourse').val() != "Any Course") {
            courseId = (courses.find(x => x.title == $('#filterPerCourse').val())).id
        }
        if ($('#filterPerStudent').val() != "Any Student") {
            studentId = Number($('#filterPerStudent').val().charAt(0))
        }
        let studentCourses = courses.filter(c => c.students.includes(studentId));
        let currentCourse = courses.find(c => c.id == courseId)
        if (!studentCourses.includes(currentCourse)) {
            $('.invalid-message').show().html('Student not in course. Please try a new search.')
        }
        get(objects, courseId, studentId)
        $('#filterPerCourse').val(courses => courses.find)
        $('#filterPerCourse').val(courseName)
        $('#filterPerStudent').val(studentName)
    });

    $('#students').on('click', function () {
        objects = students;
        get(objects)
        $('#filterPerCourse').parent().show();
        $('#filterPerStudent').hide();
    })

    $('#trainers').on('click', function () {
        $('#filterPerCourse').parent().show();
        $('#filterPerStudent').hide();
        objects = trainers;
        get(objects)
    })

    $('#assignments').on('click', function () {
        $('#filterPerCourse').parent().show();
        $('#filterPerStudent').show();
        objects = assignments;
        get(objects)
    })

    $('#courses').on('click', function () {
        $('#filterPerCourse').parent().hide()
        objects = courses;
        get(objects)
    })

    $('#courses').click()

    //Constructors
    function Student(id, first, last, date, fees) {
        this.id = id;
        this.firstName = first;
        this.lastName = last;
        this.dateOfBirth = date;
        this.tuitionFees = fees;
        this.listName = 'students';
    }

    function Trainer(id, first, last, subject) {
        this.id = id;
        this.firstName = first;
        this.lastName = last;
        this.subject = subject;
        this.listName = 'trainers';
    }

    function Course(id, title, stream, type, start, end) {
        this.id = id;
        this.title = title;
        this.stream = stream;
        this.type = type;
        this.startDate = start;
        this.endDate = end;
        this.listName = 'courses';
        this.assignments = [];
        this.students = [];
        this.trainers = [];
    }

    function Assignment(id, title, desc, subDate) {
        this.id = id;
        this.title = title;
        this.description = desc;
        this.submissionDate = subDate;
        this.listName = 'assignments';
    }

    function Mark(aId, sId, oral = 0, total = 0) {
        this.assignmentId = aId;
        this.studentId = sId;
        this.oral = oral;
        this.total = total;
        this.listName = 'marks';
    }

    //columns in each row
    function columns(object, studentId) {
        let row;
        if (object instanceof Student) {
            row = `<th scope="row">${object['id']} </th>
        <td><input type="text" class="form-control" name="firstName" placeholder="First name"  value="${object['firstName']}" required>
        <p>${object['firstName']}</p>
        <div class="invalid-feedback">
            Please provide a valid name
        </div>
        </td><td>
        <input type="text"  class="form-control" name="lastName" placeholder="Last name" value="${object['lastName']}"  required>
        <p>${object['lastName']}</p>
        <div class="invalid-feedback">
            Please provide a valid name
        </div>
        </td>
        <td>
        <input type="date" min="1950-01-01" max="2015-01-01" class="form-control" name="dateOfBirth" value="${object['dateOfBirth']}"
            placeholder="Date Of Birth" required>
            <p>${object['dateOfBirth']}</p>
        <div class="invalid-feedback">
            Please provide a valid date of birth between 1950-01-01 and 2015-01-01
        </div>
        </td>
        <td>
        <input type="number" min="0" max="20000" step="1"  class="form-control" name="tuitionFees" value="${object['tuitionFees']}"
            placeholder="Tuition Fees"  required>
            <p>${object['tuitionFees']}</p>
        <div class="invalid-feedback">
            Please provide a valid number.
        </div>
        </td>`
        }
        if (object instanceof Trainer) {
            row = `<th scope="row">${object['id']} </th> 
        <td><input type="text" class="form-control" name="firstName" placeholder="First name"  value="${object['firstName']}" required>
        <p>${object['firstName']}</p>
        <div class="invalid-feedback">
            Please provide a valid name
        </div>
        </td>
        <td>
        <input type="text"  class="form-control" name="lastName" placeholder="Last name" value="${object['lastName']}"  required>
        <p>${object['lastName']}</p>
        <div class="invalid-feedback">
            Please provide a valid name
        </div>
        </td>
        <td>
        <input type="text"  class="form-control" name="subject" placeholder="Subject" value="${object['subject']}"  required>
        <p>${object['subject']}</p>
        <div class="invalid-feedback">
            Please provide a subject
        </div>
        </td>`
        }
        if (object instanceof Assignment) {
            row = `<th scope="row">${object['id']} </th>
        <td><input type="text" class="form-control" name="title" placeholder="Title"  value="${object['title']}" required>
        <p>${object['title']}</p>
        <div class="invalid-feedback">
            Please provide a title
        </div>
        </td>
        <td>
        <input type="text"  class="form-control" name="description" placeholder="Description" value="${object['description']}"  required>
        <p>${object['description']}</p>
        <div class="invalid-feedback">
            Please provide a description
        </div>
        </td>
        <td>
        <input type="date"  class="form-control" name="submissionDate" placeholder="Submission Date" value="${object['submissionDate']}"  required>
        <p>${object['submissionDate']}</p>
        <div class="invalid-feedback">
            Please provide a valid submission date
        </div>
        </td>`
            if (studentId != null) {
                mark = marks.find(x => x.assignmentId == object.id && x.studentId == studentId)
                if (mark == null) {
                    mark = new Mark()
                }
                row += `<td>
            <input type="number" min="0" max="100" class="form-control" name="oral" placeholder="Oral Mark" value="${mark['oral']}">
            <p>${mark['oral']}</p>
            <div class="invalid-feedback">
                Please choose a number between 0 and 100
            </div>
                </td><td>
                <input type="number" min="0" max="100" class="form-control" name="total" placeholder="Total Mark" value="${mark['total']}">
                <p>${mark['total']}</p>
                <div class="invalid-feedback">
                    Please choose a number between 0 and 100
                </div>
            </td>`
            }
        }
        if (object instanceof Course) {
            row = `<th scope="row">${object['id']} </th>
        <td><input type="text" class="form-control" name="title" placeholder="Title"  value="${object['title']}" required>
        <p>${object['title']}</p>
        <div class="invalid-feedback">
            Please provide a title
        </div>
        </td>
        <td>
        <input type="text"  class="form-control" name="stream" placeholder="Stream" value="${object['stream']}"  required>
        <p>${object['stream']}</p>
        <div class="invalid-feedback">
            Please provide a stream
        </div>
        </td>
        <td>
        <input type="text"  class="form-control" name="type" placeholder="Type" value="${object['type']}"  required>
        <p>${object['type']}</p>
        <div class="invalid-feedback">
            Please provide a type
        </div>
        </td>
        <td>
        <input type="date"  class="form-control" name="startDate" placeholder="Start Date" value="${object['startDate']}"  required>
        <p>${object['startDate']}</p>
        <div class="invalid-feedback">
            Please provide a valid date
        </div>
        </td>
        <td>
        <input type="date" class="form-control" name="endDate" placeholder="End Date" value="${object['endDate']}"  required>
        <p>${object['endDate']}</p>
        <div class="invalid-feedback">
            Please provide a valid date after start date
        </div>
        </td>`
        }

        if (object instanceof Course == false && studentId == null) {
            row += `<td><div class="showCourses">${showCourses(object)}</div>
                <div class="selectCourses" style="display:none">
        ${selectCourses(object)}
        </div>
        </td>`
        }
        row += `<td><button class="btn btn-outline-secondary"><i class="fas fa-edit"></i></button></td>`
        return row;
    }

    function heading(objects, studentId) {
        let hrow = $(`<tr></tr>`)
        hrow.html(columns(objects[0], studentId))
        hrow.children('th').html('#')
        hrow.children().children('input').each(function () {
            $(this).parent().replaceWith(`<th scope="column">${$(this).attr('placeholder').toUpperCase()}</th>`)
        })
        hrow.children().children('.selectCourses').parent().replaceWith('<th scope="column">COURSE</th>')
        hrow.children().children('.btn').parent().replaceWith('<th scope="column">ACTIONS</th>')
        return hrow
    }

    function newRow(objects, studentId) {
        let nrow = $(`<tr id="0"></tr>`)
        nrow.html(columns(objects[0], studentId))
        nrow.children('th').html('#')
        nrow.children().children('input').each(function () {
            $(this).removeAttr('value')
            $(this).removeClass('is-invalid')
            $(this).siblings('p').hide()
            if (this.name == "oral" || this.name == "total") {
                $(this).hide()
            }
        })
        nrow.children().children('.showCourses').hide()
        nrow.children().children('.selectCourses').html(selectCourses(new objects[0].constructor)).show()
        nrow.children().children('.btn').children('.fa-edit').toggleClass('fa-edit').toggleClass('fa-plus')
        return nrow
    }

    function get(objects, courseId, studentId) {
        $('.invalid-message').hide();
        $('h2').html(objects[0].listName.toUpperCase())
        updateCourseFilter();
        updateStudentFilter();
        $('thead').html(heading(objects, studentId))
        if (courseId != null && studentId == null) {
            list(objects.filter(x => courses[courseId - 1][objects[0].listName].includes(x.id)))
        } else if (courseId != null && studentId != null) {
            list(objects.filter(a => courses.find(c => c.id == courseId)[objects[0].listName].includes(a.id)), studentId)
        } else {
            list(objects)
        }
        $('tbody').append(newRow(objects, studentId));
        $('.fa-plus').parent().on('click', function () {
            addNew(objects, courseId)
        })
    }

    function selectCourses(object) {
        let checkboxes = ``
        for (let c of courses) {
            checkboxes += `<div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="check${object.id}${c.title}">
        <label class="custom-control-label" for="check${object.id}${c.title}">${c.title}</label></div>`
        }
        return checkboxes;
    }

    function showCourses(object) {
        let str = '';
        for (let c of courses) {
            if (c[object['listName']].includes(object.id)) {
                str += c.title + '<br>'
            }
        }
        return str;
    }

    function checkCourses(object) {
        for (let c of courses) {
            if (c[object['listName']].includes(object.id)) {
                $(`#check${object.id}${c.title}`).attr('checked', true)
            }
        }
    }

    function list(objects, studentId) {
        $('tbody').empty()
        for (let o of objects) {
            let row = $(`<tr id=${o.id} class=${o.constructor.name}></tr>`).html(columns(o, studentId))
            $('tbody').append(row)
            row.children().children('input').hide()
            if (objects != courses) {
                checkCourses(o)
            }
        }
        $('i.fa-edit').parent().on('click', edit)
    }

    function edit(e) {
        let row = $(e.currentTarget).parent().parent()
        row.children().children('input').removeClass('is-valid').show()
        row.children().children('p').hide()
        $(e.currentTarget).children('.fa-edit').toggleClass('fa-edit').toggleClass('fa-check')
        $(e.currentTarget).on('click', update)
        if (row.get(0).className != 'Course') {
            $(e.currentTarget).parent().siblings().children('.showCourses').hide()
            $(e.currentTarget).parent().siblings().children('.selectCourses').show()
        }
    }

    function update(e) {
        let row = $(e.currentTarget).parent().parent()
        let thisId = Number(row.attr('id'))
        let object = objects.find(x => x.id == thisId);
        let inputs = row.children().children('input')
        let studentId = Number($('#filterPerStudent').val().charAt(0))
        let mark;
        if (marks.map(x => x.assignmentId).includes(thisId) && marks.map(x => x.studentId).includes(studentId)) {
            mark = marks.find(x => x.assignmentId == thisId && x.studentId == studentId)
        } else {
            mark = new Mark(thisId, studentId)
            inputs.each(function () {
                mark[this.name] = Number(this.value)
            })
            marks.push(mark)
        }
        if (allValidated(inputs)) {
            inputs.each(function () {
                $(this).hide()
                $(this).siblings('p').html(this.value).show()
                object[this.name] = this.value
            })
            $(e.currentTarget).children('.fa-check').toggleClass('fa-check').toggleClass('fa-edit')
            $(e.currentTarget).on('click', edit)
            if (object instanceof Course == false) {
                for (let c of courses) {
                    if ($(`#check${object.id}${c.title}`).prop('checked') == true && !c[object.listName].includes(object.id)) {
                        c[object.listName].push(object.id)
                    } else if ($(`#check${object.id}${c.title}`).prop('checked') == false && c[object.listName].includes(object.id)) {
                        let index = c[object.listName].indexOf(object.id);
                        if (index > -1) {
                            c[object.listName].splice(index, 1);
                        }
                    }
                }
                $(e.currentTarget).parent().siblings().children('.selectCourses').hide()
                $(e.currentTarget).parent().siblings().children('.showCourses').html(showCourses(object)).show()
            }
        }
    }

    function addNew(objects, courseId) {
        let inputs = $('#0').children().children('input')
        tempObj = new objects[0].constructor();

        if (allValidated(inputs)) {
            inputs.each(function () {
                tempObj[this.name] = this.value
            })
            tempObj.id = objects.length + 1
            objects.push(tempObj)

            if (objects != courses) {
                for (let c of courses) {
                    if ($(`#checkundefined${c.title}`).prop('checked') == true) {
                        c[tempObj.listName].push(tempObj.id)
                    }
                }
            }
            get(objects, courseId)
        }
    }

    function updateCourseFilter() {
        $('#filterPerCourse').html('<option>Any Course</option>');
        for (let c of courses) {
            $('#filterPerCourse').append('<option>' + c.title + '</option>');
        }
    }

    function updateStudentFilter() {
        $('#filterPerStudent').html('<option>Any Student</option>');
        for (let s of students) {
            $('#filterPerStudent').append('<option> ' + s.id + '. ' + s.firstName + ' ' + s.lastName + '</option>');
        }
    }

    //Validation
    function allValidated(inputs) {
        let allValidated = true;
        let courseEnd, courseStart;
        inputs.each(function () {
            if (this.checkValidity()) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
                allValidated = false;
            }
            if (this.name == "startDate") {
                courseStart = this.value;
            }
            if (this.name == "endDate") {
                courseEnd = this.value;
                $(this).attr('min',courseStart)
                if (new Date(courseStart) > new Date(courseEnd)) {
                    console.log($(this))
                    $(this).addClass('is-invalid').removeClass('is-valid');
                    allValidated = false;
                }
            } 
        })
        return allValidated
    }
})