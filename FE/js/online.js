const URL_API = "https://course-api-springboot.herokuapp.com/api/courses?type=online"
let SUB_URL = "";
//truy cap cac thanh phan
const courseTopicEl = document.querySelector(".col-md-3");
const searchIpnut = document.querySelector(".seach-form-input")
const courseListEl = document.querySelector(".course-list");

//luu lai cong viec
let courses = [];

//danh sach api
// lay danh sach tat ca course
const getCourseAPI = () => {
    return axios.get(URL_API); // tra ve promise
}

// ham xu ly
//1.lay danh sach tat ca course
const getAllCourse = async () =>{
    try {
        let res = await getCourseAPI();
        console.log(res);

        courses =res.data
        renderCourse(courses);
    } catch (error) {
        console.log(error)
    }
}
//2. loc danh dach theo topic
courseTopicEl.addEventListener("change", async (e) => {
    try {
        let target = e.target;
        let topic = checkRender(target);
        if (!SUB_URL.includes("title=")) {
            SUB_URL = `&topic=${topic}`;
        } else {
            let nums = SUB_URL.indexOf("title=");
            let urlLength = SUB_URL.length;
            SUB_URL = `&topic=${topic}&` + SUB_URL.slice(nums, urlLength);
        }

        let res = await axios.get(URL_API + SUB_URL);
        let courses = res.data;
        console.log(courses);

        renderCourse(courses);
    } catch (error) {
        console.log(error);
    }
})
//lay danh sach topic theo bo loc
const checkRender = (obj) => {
    let topic = "";
    switch (obj.id) {
        case "backend":
            topic = "Backend";
            break;
        case "frontend":
            topic = "Frontend";
            break;
        case "mobile":
            topic = "Mobile";
            break;
        case "database":
            topic = "Database";
            break;
    }
    return topic;
}
// 3. Loc theo title
// Loc theo danh sach topic

searchIpnut.addEventListener("keydown", async (event) => {
    try {
        if (event.key == "Enter") {
            if(SUB_URL.includes("title=")){
                let nums = SUB_URL.indexOf("title=");
                SUB_URL = SUB_URL.slice(0, nums + 6); // nums + 7: vi sau dau "=" trong ?title=
                SUB_URL += searchIpnut.value;
            } else {
                if(!SUB_URL.includes("topic=")){
                    SUB_URL = `&title=${searchIpnut.value}`;
                } else {
                    SUB_URL += `&title=${searchIpnut.value}`;
                }
            }

            let res = await axios.get(URL_API + SUB_URL);
            let courses = res.data;
            console.log(courses);

            renderCourse(courses);
        }
    } catch (error) {
        console.log(error)
    }
})



//hien thi danh sach ra ngoai giao dien
//danh sach khoa hoc
const renderCourse = arr =>{
    courseListEl.innerHTML = "";
    html = "";
    if (arr.length == 0) {
        courseListEl.innerHTML = "Không có khóa học nào trong danh sách"
        return;
    }
    arr.forEach(t => {
        html +=`
            <div class="col-md-4">
                <a href="./detail.html?id=${t.id}">
                    <div class="course-item shadow-sm rounded mb-4">
                        <div class="course-item-image">
                            <img src="${t.image}"
                                alt="khoa hoc">
                        </div>
                        <div class="course-item-info p-3">
                            <h2 class="fs-5 mb-3 text-dark">${t.title}</h2>
                            <p class="type fw-light text-black-50">${t.type}</p>
                        </div>
                    </div>
                </a>
            </div>
        `
    })
    courseListEl.innerHTML = html;
}
//
getAllCourse();