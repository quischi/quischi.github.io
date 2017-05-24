
	var video = document.getElementById('video'),
		canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		photo = document.getElementById('photo'),
		vendorUrl = window.URL || window.webkitURL,
		counterToProceed = 0,
		cach,
		
		name;
/**
 * jTinder initialization
 */
$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
        $('#status').html('Dislike ' + name);
    },
	// like callback
    onLike: function (item) {
	    // set the status text
        $('#status').html('Like ' + name);
		setTimeout(function(){
			$('#schwarz').show();
			$('#like').hide();
			$('#status').hide();
			$('#swipe-area').hide();}, 1000);
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#tinderslide").jTinder($(this).attr('class'));
});

function onL() {
	$('#swipe-area').hide();
	$('#like').hide();
	
	navigator.getMedia = navigator.getUserMedia ||
		navigator.webkitGetUserMEdia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMEdia;
	
	navigator.getMedia({
		video: true,
		audio: false
	}, function(stream) {
		video.src = vendorUrl.createObjectURL(stream);
		video.play();
	}, function(error) {
		//an error occured
		//an error code
	});
	
	document.getElementById('capture').addEventListener('click', function(){
		context.drawImage(video, 0, 0, 640, 420);
		counterToProceed += 1;
		console.log(counterToProceed);
		//cach = canvas.toDataURL('image/png');
		document.getElementById('phot').style.background = "url(" + canvas.toDataURL('image/png') + ")";
		document.getElementById('bss').src = canvas.toDataURL('image/png');
		document.getElementById('bss').style.width = '235px';
		document.getElementById('bss').style.height = '235px';
		console.log(cach);
		$('#canvas').show();
		$('#video').hide();
	});
};


function accept() {
	name = document.getElementById('name').value;
	if (counterToProceed != 0 && name.length > 0){
		$('#swipe-area').show();
		$('#like').show();
		$('#booth').hide();
	} else {
		alert("mache ein Photo und gib einen Namen ein");
	}
	console.log(name);
	document.getElementById('deinname').innerHTML= name;
};

function no(){
	$('#full-screen').hide();
	$('#booth').show();	
};
