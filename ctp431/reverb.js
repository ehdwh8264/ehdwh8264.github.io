var Reverb = function(context, parameters){

	this.context = context;
	this.input = context.createGain();
	this.output = context.createGain();

	var reverb = context.createConvolver();
 	var ir = new XMLHttpRequest();
 	ir.open("Get","slinky_ir.wav",true);
 	ir.responseType = "arraybuffer";
 	//console.log("asd")
 	ir.onload = function() {
 		context.decodeAudioData(ir.response, function(buffer){
 		reverb.buffer = buffer;
   	 	});
    };

 	ir.send();
    //console.log("asd")

	this.wetGain = context.createGain(); 
	this.dryGain = context.createGain();
	// connect 
	this.input.connect(reverb);
	reverb.connect(this.wetGain);
	
	this.input.connect(this.dryGain);
	this.dryGain.connect(this.output);
	this.wetGain.connect(this.output);

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


Reverb.prototype.connect = function(node) {
   this.output.connect(node.input);
}