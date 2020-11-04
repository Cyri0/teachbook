
var isUsernameUsed = JSON.parse(document.getElementById('isUsernameUsed').textContent)
var lastUsername = JSON.parse(document.getElementById('lastUsername').textContent)
var lastEmail = JSON.parse(document.getElementById('lastEmail').textContent)

var app = new Vue({
    delimiters: ["[[", "]]"],
    el: '#registration_form',
    data: {
        errors: 0,
        name: null,
        email: null,
        password: null,
        message: 'Hello',
        name_error: null,
        email_error: null,
        pwd_error: null
    },
    mounted() {
        this.email = lastEmail;
        this.name = lastUsername;
        if(isUsernameUsed)
            this.name_error = 'Foglalt név!';
            isUsernameUsed = false;
    },
    methods: {
        registration: function(){
            this.checkForm();
        },
        checkForm: function(e){
            this.errors = 0;

            if (!this.name) {
                this.name_error = 'A név megadása kötelező!';
                this.errors++;
            }else{
                this.name_error = null;
            }

            if (!this.password) {
                this.pwd_error = 'A jelszó megadása kötelező!';
                this.errors++;
            }else{
                this.pwd_error = null;
            }

            if (!this.email) {
                this.email_error = 'Email cím megadása kötelező!';
                this.errors++;
            } else if (!this.validEmail(this.email)){
                this.email_error = 'Kérem adjon meg érvényes email címet!';
                this.errors++;
            }else{
                this.email_error = null;
            }

            if (this.errors === 0) {
                console.log(`
                name: `+this.name+`
                email: `+this.email+`
                password: `+this.password);
                return true;
            }
            e.preventDefault();
        },
        validEmail: function (email) {
            return true;
        }
    },
});


