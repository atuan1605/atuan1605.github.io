const URL_API = "http://localhost:8015/api/course";
const URL_SUPPORTER_API = "http://localhost:8015/api/supporter";

const linkParams = new URLSearchParams(window.location.search)

// khoa hoc
const breadcrumbEl = document.querySelector(".breadcrumb");
const titleEl = document.querySelector(".course-title");
const descriptionEl = document.querySelector("course-description");

//supporter
const supporterEl = document.querySelector(".supporter");

// thong tin khoa hoc
const getCourseAPI = () =>{
    let id = linkParams.get("id");
    console.log(id);
    return axios.get(`${URL_API}?id=${id}`);
}

const getSupporterAPI = (id) =>{
    const res = axios.get(`${URL_SUPPORTER_API}?id=${id}`);
    
    return res;
}

const getCourse = async () => {
    try {
        let course = await getCourseAPI();
        console.log(course.data);
       
        let supporter = await getSupporterAPI(course.data.supporterId)
        console.log(supporter.data);
        
        renderCourse(course.data, supporter.data);
        
    } catch (error) {
        console.log(error)
    }
}

const renderCourse = (course, target) => {
   
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



getCourse(); 