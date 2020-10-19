let profile = new Vue({
    delimiters: ["[[", "]]"],
    el: '#profile',
    data: {
        
    },
    methods: {
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
        }
    }
});