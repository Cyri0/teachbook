var app = new Vue({
    delimiters: ["[[", "]]"],
    el: '#main',
    data: {
        newPostPanelVisible: false,
        new_subject: null,
        new_title: null,
        new_content: null,
        fileIsChoosed: false,
        emptyPage: false
    },
    mounted(){

        console.log(subjects);

        let posts = document.getElementsByClassName("post");

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

        if(document.getElementsByClassName("post").length == 1){
            this.emptyPage = true;
        }
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

            // POST JSON DATA
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            console.log(JSON.stringify(newContentData));
            axios.post(url, JSON.stringify(newContentData) ).then(response => this.articleId = response.data.id);

            //POST FILE
            let my_file = document.getElementById("fileUploader").files;

            if(my_file[0] == null){
                console.log("ÜRES")

            }else{
                my_file = my_file[0];
                let formData = new FormData();
                formData.append("file", my_file)

                axios.defaults.xsrfCookieName = 'csrftoken';
                axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    
                axios.post(
                    fileUploaderUrl,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(response => this.articleId = response.data.id);
            }

            location.reload();
        },
        downloadFile: function (post_id){
            console.log(post_id + " megnyitva!");
        },
        redirectToProfilePage: function(user_id){
            alert(user_id);
        },
        like: function(post_id){

            let url = likeUrl;
            let data = {
                "post_id":post_id
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            
            axios.post(url, JSON.stringify(data) ).then(response => this.articleId = response.data.id);

            let id = "like_"+post_id;
            let likes_on_post = 0;
            likes_on_post = document.getElementById(id).innerHTML * 1;
            likes_on_post++;
            document.getElementById(id).innerHTML = likes_on_post;

        },
        fileChanged: function(){
            let new_file_name = document.getElementById("fileUploader").files[0].name;
            console.log(new_file_name + " is choosed for upload!");
            document.getElementById("uploadFileName").innerText = new_file_name;
            this.fileIsChoosed = true;
        },
        removeSelectedFile: function(){
            document.getElementById("fileUploader").value = null;
            this.fileIsChoosed = false;
        }
    }
});