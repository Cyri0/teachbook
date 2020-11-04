var menu = new Vue({
    delimiters: ["[[", "]]"],
    el: "#my_navbar",
    data: {
      isVisible: false,
    },
    mounted(){
       document.getElementById("navbar_profile_pic").style.backgroundImage = 'url("'+"{{ request.user.profile.image.url }}"+'")';
      },
    methods: {
      useDropdown: function () {
        this.isVisible = !this.isVisible;
      },
    },
  });