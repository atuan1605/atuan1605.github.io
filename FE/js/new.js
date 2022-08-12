const URL_COURSE_API = "http://localhost:8015/api/courses";
const URL_SUPPORTER_API = "http://localhost:8015/api/supporter";
// const params = new URLSearchParams(window.location.search)
const params = new URLSearchParams(window.location.search)

// Course
const breadcrumbEl = document.querySelector(".breadcrumb")
const titleEl = document.querySelector(".course-title")
const descriptionEl = document.querySelector(".course-description")

// Supporter 
const supporterEl = document.querySelector(".supporter")

// Lay thong tin khoa hoc
const getCourseAPI = () => {
    let id = params.get("id");
    console.log(id);
    return axios.get(`${URL_COURSE_API}?id=${id}`);
} 

// Lay thong tin supporter
const getSupporterAPI = (id) => {
    const res = axios.get(`${URL_SUPPORTER_API}?id=${id}`);
    console.log(res);
    return res;
}

const getCourse = async () => {
    try {
        let course = await getCourseAPI();
        console.log(course.data);
        let term = course.data.supporterId;
        console.log(course.data.supporterId)
        let supporter = await getSupporterAPI(course.data.supporterId)
        console.log(supporter.data);

        render(course.data, supporter.data);
    } catch (error) {
        console.log(error)
    }
}

const render = (course, target) => {
    if(course == null){
        breadcrumbEl.innerHTML = `
            <li class="breadcrumb-item"><a href="./course-list.html">Khóa học</a></li>
            <li class="breadcrumb-item active" aria-current="page"></li>
        `
        titleEl.innerText = "";
        descriptionEl.innerText = "";
    } else {
        breadcrumbEl.innerHTML = `
            <li class="breadcrumb-item"><a href="./course-list.html">Khóa học</a></li>
            <li class="breadcrumb-item active" aria-current="page">${course.title}</li>
        `
        titleEl.innerText = course.title;
        descriptionEl.innerText = course.description;

        if(target == null){
            supporterEl.innerHTML = `<p>No supporter</p>`
        } else {
            supporterEl.innerHTML = `
            <div class="supporter d-flex align-items-center">
                <div class="supporter-image">
                    <img src="${target.avatar}" alt="tư vấn viên" class="rounded-circle w-75 h-75">
                </div>
                <div class="supporter-info">
                    <p>
                        <b>Tư vấn viên :</b>
                        ${target.name}
                    </p>
                    <p>
                        <b>Email :</b>
                        ${target.email}
                    </p>
                    <p>
                        <b>Số điện thoại :</b>
                        ${target.phone}
                    </p>
                </div>
             </div>
            `
        }
    }
}

getCourse(); 