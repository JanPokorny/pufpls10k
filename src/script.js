(function(){
	if(window.operamini)
	{
		document.body.className = "operamini";
	}
	
	var $ = function(x) {return document.getElementById(x)},
		r = Math.random,
		o = Math.floor,
		lastBg = curBg(),
		timeout,
		canvas = $('c'),
		ctx = c.getContext('2d'),
		w = canvas.width = window.innerWidth,
		h = canvas.height = window.innerHeight;

	// BINARY
	ctx.font = '50px "Courier New"';
	var text = ctx.measureText("0"), tw = text.width, th = 50;

	// BUBBLES
	var bubbles = [];
	function newBubble(s)
	{
		return {
			x: (r()*(w-200))+100,
			y: (r()*(h-200))+100,
			m: r() * 200 + 100,
			c: 'rgba('+o(r()*200)+', '+o(r()*200)+', '+o(r()*200)+', !)',
			s: s
		};
	}
	for(var i = 20; i > 0; i--) bubbles.push(newBubble(i*30));

	// WAVE
	var t = 0;

	// STRIPES
	var stripes = [];
	for(var i = 0; i < 20; i++)
	{
		stripes.push({
			x: r() * w,
			w: r() * 200,
			v: (1 + r()*2) * (r() > .5 ? 1 : -1),
			c: 'hsl(141, 75%, ' + (5 + r() * 25) + '%)'
		});
	}

	draw();

	function draw()
	{
		w = canvas.width = document.documentElement.clientWidth;
		h = canvas.height = document.documentElement.clientHeight + 100;
		ctx.fillStyle = '{{canvascolor}}';
		ctx.fillRect(0, 0, w, h);
		switch(lastBg = curBg())
		{
			case 0:
				// BINARY
				for(var i = 0; i <= Math.ceil(w / tw); i++)
				{
					for(var j = 0; j <= Math.ceil(h / th); j++) 
					{
						ctx.fillStyle = '#AFA';
						ctx.font = '50px "Courier New"';
						ctx.fillText(Math.round(r()),i*tw, j*th);
					}
				}
				timeout = setTimeout(draw, 500);
				break;

			case 1:
				// BUBBLES
				for (var i = bubbles.length - 1; i >= 0; i--)
				{
					var bubble = bubbles[i];
					ctx.fillStyle = bubble.c.replace("!", bubble.s/600);
					ctx.beginPath();
					ctx.arc(bubble.x, bubble.y, 600-bubble.s, 0, 2 * Math.PI);
					ctx.fill();
					
					if(--bubble.s == 0)
						bubbles.splice(i, 1);
				}
				while(bubbles.length < 20)
					bubbles.splice(o(r()*20), 0, newBubble(600));

				timeout = setTimeout(draw, 32);
				break;
				
			case 2:
				// WAVE
				ctx.fillStyle = 'hsl(0, 0%, 10%)';
				ctx.fillRect(0, 0, w, h);
				for(var i = 0; i <= Math.ceil(w / 35); i++)
				{
					for(var j = 0; j <= Math.ceil(h / 35); j++) 
					{
						ctx.fillStyle = 'hsl(0, 0%, 30%)';
						ctx.beginPath();
						var radius = 10+5*Math.sin((0.5 + 0.05*(Math.PI*i+j)) * t * Math.PI / 100);
						ctx.arc(i*35, j*35, radius, 0, 2 * Math.PI);
						ctx.fill();
					}
				}
				t++;
				timeout = setTimeout(draw, 32);
				break;

			case 3:
				// STRIPES
				ctx.fillStyle = 'hsl(141, 75%, 5%)';
				ctx.fillRect(0, 0, w, h);
				for(var i in stripes)
				{
					var stripe = stripes[i];
					ctx.fillStyle = stripe.c;
					ctx.fillRect(stripe.x, 0, stripe.w, h);
					stripe.x = (stripe.x + stripe.v + stripe.w*2 + w)%(w+stripe.w) - stripe.w;
				}
				timeout = setTimeout(draw, 20);
			break;
		}
	}

	function curBg()
	{
		return $('s3').getBoundingClientRect().top < 0 ? 3 : 
			   $('s2').getBoundingClientRect().top < 0 ? 2 : 
			   $('s1').getBoundingClientRect().top < 0 ? 1 :
			   0;
	}

	window.onscroll = function() {
		if(curBg() != lastBg)
		{
			clearTimeout(timeout);
			draw();
		}
	};

	window.onresize = function() {
		clearTimeout(timeout);
		draw();
	}
})();