var caption = document.querySelector('.caption'),
	registrationBlock = document.querySelector('.registration-block'),
	container = document.getElementById('sign-in-block'),
	buttonOK = document.getElementsByClassName('button-style')[0],
	buttonCancel = document.getElementsByClassName('button-style')[1],
	loginEntered,
	passwordEntered,
	correctLogin = "javascript@gmail.com", // Hardcode
	correctPassword = "112263";


function showCover() {
	var coverDiv = document.createElement('div');
	coverDiv.id = 'cover-div';
	document.body.appendChild(coverDiv);
}

function hideCover() {
	document.body.removeChild(document.getElementById('cover-div'));
}

function getValues(){
	loginEntered = document.getElementById('input-log').value;
	passwordEntered = document.getElementById('input-pass').value;
	return loginEntered, passwordEntered;
}

caption.addEventListener('click', function (event) {
	location.reload(true);
}, false);


registrationBlock.addEventListener('click', function (event) {
	showCover();
	container.style.display = 'flex';
}, false);


buttonOK.addEventListener('click', function (event) {
	getValues();
	if( (loginEntered === correctLogin) && (passwordEntered === correctPassword) ) {
		alert("You're welcome");
		location.reload(true);
	}
	else {
		alert("You shall not pass !");
	}
}, false);

buttonCancel.addEventListener('click', function (event) {
	hideCover();
	container.style.display = 'none';
}, false);
