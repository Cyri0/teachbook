var app = new Vue({
    delimiters: ["[[", "]]"],
    el: '#main',
    data: {
        newPostPanelVisible: false,
        new_subject: null,
        new_title: null,
        new_content: null
    },
    mounted(){

        console.log(subjects);

        let posts = document.getElementsByClassName("post");
        console.log("posztok: ");
        for (let i = 0; i < posts.length; i++){
            if(posts[i].id != "newPost"){
                let header = posts[i].childNodes[0];
                let footer = posts[i].childNodes[4];
                let db_id = posts[i].attributes.db_id.nodeValue;

                for(let subj = 0; subj < subjects.length; subj++){
                    if(subjects[subj][0] == db_id){
                        let color = subjects[subj][2];
                        header.style.backgroundColor = color;
                        footer.style.backgroundColor = color;
                    }
                }

            }
        }
        this.changeColor();
    },
    methods: {
        handleNewPostPanel: function () {
            this.newPostPanelVisible = !this.newPostPanelVisible;
            console.log(this.newPostPanelVisible);

            if(this.newPostPanelVisible){
                document.getElementById("addNewPost").innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-circle-up" class="svg-inline--fa fa-chevron-circle-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"></path></svg>';
            }
            else{
                document.getElementById("addNewPost").innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>';
            }
        },
        changeColor: function(){
            let subject = document.getElementById("subject").value;
            let subject_data = subject.split('|');
            let bgColor = "#555";

            if(subject_data.length > 1){
                console.log(subject_data);
                console.log("id: " + subject_data[0]);
                console.log("color:: " + subject_data[1]);
                bgColor = subject_data[1];
            }
            
            document.getElementById("post_header").style.backgroundColor = bgColor;
            document.getElementById("post_footer").style.backgroundColor = bgColor;
        },
        sendPostToDb: function(){
            let newContentData = {
                "user_id" : document.getElementById("user_id").value,
                "content" : this.new_content,
                "title" : this.new_title,
                "subject" : this.new_subject.split("|")[0]
            }

            console.log("Feltöltendő adatok:" +
                        "\nuser_id: " + newContentData.user_id +
                        "\ncontent: " + newContentData.content +
                        "\ntitle: " + newContentData.title +
                        "\nsubject: " + newContentData.subject)
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            console.log(JSON.stringify(newContentData));
            axios.post(url, JSON.stringify(newContentData) ).then(response => this.articleId = response.data.id);
            location.reload();
        }
    }
});