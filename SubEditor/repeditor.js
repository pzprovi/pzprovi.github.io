
	function addNewRow(id, w1, w2, w3, w4, w5)
	{					   	  
	    $('#repeditor').append('<div class="input-group-mb-3">'+
	                           '   <div class="row"> '+
	                           '     <div class="input-group-prepend col-3"> '+
	                           '        <span class="input-group-text" id="'+id+'">'+id+'</span> '+
	                           '        <span class="input-group-text">'+w1+'</span> '+
	                           '        <span class="input-group-text">'+w2+'</span> '+
	                           '     </div> '+
	                           '     <textarea id="v'+id+'" name="v'+id+'" class="form-control" rows="2" placeholder="" required>'+w3+'</textarea> '+
	                           '     <textarea class="form-control" rows="2" placeholder="" required>'+w4+'</textarea> '+
	                           '  </div>'+
	                           '</div>');	    	    	 
	}


	function load()
	{
	
	}
	
	function clear(){
	
		$( "#repeditor" ).empty();
	}
	
	function save(id)
	{   
		return $('#v'+id+'').text();		
	}

	jQuery(document).ready(function($) 
	{
				
		clear();
				
	    var id = 1;
	    var w1 = '00:00:03,420 --> 00:00:05,169';
	    var w2 = 'Priviusly in Emergency. There was dark night and all people are sleeping.';
	    var w3 = 'В предишния епизод. Тя има човешко тяло със синтетичен ИИ(изкуствен интелект)?';
	    var w4 = 'В предишния епизод. Тя има човешко тяло със синтетичен ИИ?';
	    var w5 = '';	
		addNewRow(id, w1, w2, w3, w4, w5);
		
		var rr = save(id);

    });
