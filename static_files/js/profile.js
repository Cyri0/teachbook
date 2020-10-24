let profile = new Vue({
    delimiters: ["[[", "]]"],
    el: '#profile',
    data: {
        actual_subjects: ""
    },
    mounted(){
        let profile_pics = document.getElementById('profile_pics_big');
        profile_pics.style.backgroundImage = 'url("'+profilepicsurl+'")';

        let subject_holder = document.getElementById('subjects_holder');
        
        this.actual_subjects = user_subjects.split("|");
        console.log(this.actual_subjects);
        console.log(subjects);

        for(let i = 0; i < this.actual_subjects.length; i++){
            subject_holder.innerHTML += "<b>" + this.subjectIdConverter(this.actual_subjects[i])+ "</b>" + "<br>";
        }
    },
    methods: {
        subjectIdConverter: function(id){
            for(let i = 0; i < subjects.length; i++){
                if(subjects[i][0] == id){
                    return subjects[i][1];
                }
            }
        },
        subjectNameConverter: function(name){
            for(let i = 0; i < subjects.length; i++){
                if(subjects[i][1] == name){
                    return subjects[i][0];
                }
            }
        },
        saveChanges: function(){
            console.log("Mentés");
            let username = document.getElementById("username").value;
            let email = document.getElementById("email").value;

            if(username.length != 0 && email.length != 0){
                console.log("Username and Email changed!\nNew username: "+ username);
                if(this.emailIsValid(email)){
                    console.log("New email: " + email);
                }else{
                    console.log("Invalid email!");
                }
            }
            else{
                if(username.length != 0){
                    console.log("Username changed to: " + username);
                }
                if(email.length != 0){
                    if(this.emailIsValid(email)){
                        console.log("Email changed to: " + email);
                    }else{

                    }
                }
            }
        },
        emailIsValid: function(email){
            console.log("Email változtatás (tesztelendő email: "+email+")");
        },
        changeProfilePics: function(){
            alert("Képváltoztatás!");
        },
        addNewSubjectVisibility: function(){
            let btn = document.getElementById("add_subject_btn");
            let row = document.getElementById("subject_selector_row"); 
            if(btn.innerHTML == "+"){
                row.style.transform = "scale(1)";
                btn.innerHTML ="-";
            }else{
                row.style.transform = "scale(0)";
                btn.innerHTML ="+";
            }
        },
        addNewSubject: function(){

            let sub = document.getElementById("subject_selector").value.split("|");
            
            console.log(sub[0]);

            console.log(this.actual_subjects.includes(sub[0]));

            if(!this.actual_subjects.includes(sub[0])){
                this.actual_subjects.push(sub[0]);
                this.refreshSubjects();
            }
        },
        refreshSubjects: function(){
            let subject_holder = document.getElementById('subjects_holder');
            subject_holder.innerHTML = "";
            let data_string = "";
            for(let i = 0; i < this.actual_subjects.length; i++){
                subject_holder.innerHTML += "<b>" + this.subjectIdConverter(this.actual_subjects[i])+ "</b><br>";
                data_string += this.actual_subjects[i] + "|";
            }

            data_string = data_string.slice(0,data_string.length-1);
            console.log(data_string);

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.post(url_refreshSubject, data_string ).then(response => this.articleId = response.data.id);

            location.reload();
        },
        remove: function(removeable){
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.post(url_remove, removeable ).then(response => this.articleId = response.data.id);
            location.reload();
        }
    }
});