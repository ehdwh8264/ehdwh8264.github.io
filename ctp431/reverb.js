var Reverb = function(context, parameters) {

	this.context = context;
	this.input = context.createGain();

	this.reverb = context.createConvolver();
 	this.ir = new XMLHttpRequest();
 	this.ir.open("Get","slinky_ir.wav",true);
 	this.ir.responseType = "arraybuffer";
 	//console.log("asd")
 	this.ir.onload = function() {
 	context.decodeAudioData(this.ir.response, function(buffer) {
 		this.reverb.buffer = buffer;
   	 	});
    };
 	this.ir.send();
    //console.log("asd")

	this.wetGain = context.createGain(); 
	this.dryGain = context.createGain();
	// connect 
	this.input.connect(this.reverb);
	this.reverb.connect(this.wetGain);
	
	this.input.connect(this.dryGain);
	this.dryGain.connect(this.context.destination);
	this.wetGain.connect(this.context.destination);

	this.wetGain.gain.value = parameters.reverbWetDry;
	this.dryGain.gain.value = (1-parameters.reverbWetDry);

	this.parameters = parameters;
}


Reverb.prototype.updateParams = function (params, value) {

	switch (params) {
		case 'reverb_time':
			this.parameters.reverbWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;			
	}
}


