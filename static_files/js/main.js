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
        // this.$nextTick(function () {
        //     // let targyak = document.getElementsByClassName("stored_post_subject");
            
        //     // for(let i = 0; i < targyak.length; i++){
        //     //     console.log(i + ". tárgy: " + targyak[i].value);
        //     // }

        //     // let authors = document.getElementsByClassName("stored_post_author");

        //     // for(let i = 0; i < authors.length; i++){
        //     //     console.log(i + ". user id: " + authors[i].value);
        //     // }
        // })
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
            let postFooter = document.getElementById("post_footer");
            let postHeader = document.getElementById("post_header");
            
            let classlist = document.getElementById("newPost").classList;

            let first = true;
            for(let i = 0; i < classlist.length;i++){
                if(classlist[i] !== 'post' &&
                classlist[i] !== 'newPost' && 
                classlist[i] !== 'newPostOpen'){
                    classlist.replace(classlist[i], subject);
                    first = false;
                }
            }
            if(first){
                classlist.add(subject);
            }

            console.log(classlist);
        },
        sendPostToDb: function(){
            let newContentData = {
                "user_id" : document.getElementById("user_id").value,
                "content" : this.new_content, 
                "title" : this.new_title,
                "subject" : this.new_subject
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
        }
    }
});