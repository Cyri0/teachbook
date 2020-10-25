let user_profile = new Vue({
    delimiters: ["[[", "]]"],
    el: '#user_profile_container',
    data: {
        user_subjects_text:[]
    },
    mounted(){
        this.renderSubjects();
        this.colorizePosts();
    },
    methods: {
        renderSubjects: function (){
            for(let i = 0; i < user_subjects.length; i++){
                for(let j = 0; j < allSubjects.length; j++){
                    if(user_subjects[i] == allSubjects[j][0]){
                        this.user_subjects_text.push(allSubjects[j][1]);
                    }
                }
            }
        },
        colorizePosts: function (){
            let posts = document.getElementsByClassName("user_post");

            console.log(allSubjects);
            let color = "gray";

             for (let i = 0; i < posts.length; i++){
                console.log(posts[i].childNodes)
                let header = posts[i].childNodes[0];
                let footer = posts[i].childNodes[4];
                let db_id = posts[i].attributes.db_id.nodeValue;

                for(let subj = 0; subj < allSubjects.length; subj++){
                    if(allSubjects[subj][0] == db_id){
                        color = allSubjects[subj][2];
                    }
                }

                header.style.backgroundColor = color;
                footer.style.backgroundColor = color;
           }
        }
    }
});