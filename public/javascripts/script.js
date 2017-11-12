// $('body').on('click', function(){
//   if( parseInt( $('#menuNav').css('width') ) > 0 ){
//     closeNav();
//   }
// });

var smNav = document.querySelector('.smScreen');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 350) {
        smNav.classList += ' sm';
    } else {
        smNav.classList = 'smScreen';
    }

});

var nav = document.querySelector('.bgScreen');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 350) {
        nav.classList += ' bgc';
    } else {
        nav.classList = 'bgScreen';
    }

});

var menuButton = document.querySelector('.button');

menuButton.addEventListener('touchend',
    function myFunction() {
        // assigns smMenu class to smMenu variable
        var smMenu = document.querySelector('.smMenu');
        var overlay = document.querySelector('.overlay');
        // toggles the smMenu class display
        smMenu.classList.toggle("smMenu1");
        overlay.classList.toggle("overlay1");
        // toggles the menu icon
        this.classList.toggle("change");
        //  this.preventDefault();
        // return false;
    }, false);


// var menuButton = document.querySelector('.button');

// 	menuButton.addEventListener('click', 
// 		function myFunction() {
// 			// assigns smMenu class to smMenu variable
// 		var smMenu = document.querySelector('.smMenu');
// 		var overlay = document.querySelector('.overlay');
// 			// toggles the smMenu class display
// 		smMenu.classList.toggle("smMenu1");
// 		overlay.classList.toggle("overlay1");
// 			// toggles the menu icon
// 	    this.classList.toggle("change");
// 	},false);


// An overlay listener, 
// var overlayClick = document.querySelector('.overlay');
// 	overlayClick.addEventListener('click', 
// 		function () {
// 			overlayClick.style.display = 'none';
// 		})