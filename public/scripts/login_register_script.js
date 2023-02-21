window.onload=function(){
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');



signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
  }

// window.onresize=function(){
// const overall = document.getElementById('overall');

//   if (window.screen.width <= 480)
//   {
// 	  overall.classList.remove("container");
//   }
// }