; (function (window, document, undefined) {
    var tests = [];

    /**
     *
     * RepEditorPrototype is the constructor for RepEditor
     *
     * @class
     * @access public
     */

    var RepEditorPrototype = {
        _version: '1.0',
        _config: {
            'classPrefix': '',
            'enableClasses': true,
            'enableJSClass': true,
            'usePrefixes': true
        },

        _q: [],
        _delay: 40,
        _mirrorCheck: 0,

		addNewRow: function(id, w1, w2, w3, w4, w5){					   	  
			$('#repeditor').append('<div class="input-group">'+
								   '    <div class="row"> '+
								   '        <div class="input-group-prepend"> '+
								   '            <span class="input-group-text-col-1" id="'+id+'">'+id+'</span> '+
								   '            <span class="input-group-text-col-2">'+w1+'</span> '+
								   '            <span class="input-group-text-col-3">'+w2+'</span> '+	                          
								   '            <textarea id="v'+id+'" name="v'+id+'" class="form-control-col-7" rows="2" placeholder="" required>'+w3+'</textarea> '+
								   '   		<textarea class="form-control-col-3" rows="2" placeholder="" readonly>'+w4+'</textarea> '+
								   '  	    </div>'+
								   '	</div> '+
								   '</div>');	    	    	 
		},

		load: function(){
		
		},

		clear: function(){	
			$( "#repeditor" ).empty();
			RepEditor.setTitle("");
		},
				
		save: function(id)
		{   
			return $('#v'+id+'').text();		
		},
		
		getTitle: function()
		{   
			return $('#repTitle').val();		
		},
		
		setTitle: function(value)
		{   
			$('#repTitle').val(value);
		},
				
        isNull: function (o) {
            if (o == null || o == "undefined") {
                return true;
            }
            return false;
        },

		populate: function(data)
		{   
			 
		},


		saveRep: function()
		{   
			
			// return $('#v'+id+'').text();		
		},

        // get queryParams from url
        // var searchText = getParameterByName('search');
        getParameterByName: function(name, url) {
            if (!url)
                url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results)
                return null;
            if (!results[2])
                return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        },
        
        // translate(1, "00:00:03,420 --> 00:00:05,169", "Text here", "eng-bg")
        // token = 78b8f6dd-3e99-47c0-ba7a-6d87b7e87500
        translateRep: function (id, offset, rep1, lang, token) {
           
            var repEncodeData = encodeURIComponent(rep1);            
            var jsonData = JSON.stringify({ "id": id, "offset" : offset, "lang": lang, "rep": rep1 });
            
            $.ajax({
                async: true,
                crossDomain: true,
                method: "POST",
                type: "POST",
                dataType: 'json',                
                contentType: "application/json; charset=utf-8", // 'application/x-www-form-urlencoded', // "text/plain",
                url: "api/DbController/Translate?id=" + id,
                data: jsonData,              
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", // "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache",
                    "Token": token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type, soapaction, Origin, X-Requested-With, Content-Type, Accept"
                },

                success: function (data, textStatus, jQxhr) {
                    //RepEditor.populate(data);
                    //RepEditor.populateOffLine();    
                    //RepEditor.busyIndicator(false);
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log("error message: " + textStatus);
                    // cache
                    //RepEditor.populateOffLine();
                    //RepEditor.busyIndicator(false);
                },
                statusCode: {
                    404: function () {
                        console.log("page not found");
                    },
                    0: function () {
                        console.log("page cross-site scripting, DNS issues, ad blocker. request was interrupted. failed due to issue on the client side");
                    }
                }

			});
		},
		
		     
		loadReps: function (token) {
           
            //var repEncodeData = encodeURIComponent(rep1);            
            //var jsonData: JSON.stringify({ "id": id, "offset" : offset, "lang": lang, "rep": rep1 });
            
            /* dummy data */
            getTranslate("");
            RepEditor.setTitle("Emergency S231 2019");
              /* dummy data end */

            $.ajax({
                async: true,
                crossDomain: true,
                method: "POST",
                type: "POST",
                dataType: 'json',                
                contentType: "application/json; charset=utf-8", // 'application/x-www-form-urlencoded', // "text/plain",
                url: "api/DbController/LoadContent?token=" + token,
                // data: jsonData,              
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", // "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache",
                    "Token": token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type, soapaction, Origin, X-Requested-With, Content-Type, Accept"
                },

                success: function (data, textStatus, jQxhr) {
                    //RepEditor.populate(data);
                    //RepEditor.populateOffLine();    
                    //RepEditor.busyIndicator(false);
                    
                    getTranslate(data);
                    RepEditor.setTitle(data.Title);
                    
                    
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log("error message: " + textStatus);                  
                    // cache
                    //RepEditor.populateOffLine();
                    //RepEditor.busyIndicator(false);
                },
                statusCode: {
                    404: function () {
                        console.log("page not found");                       
                    },
                    0: function () {
                        console.log("page cross-site scripting, DNS issues, ad blocker. request was interrupted. failed due to issue on the client side");                        
                    }
                }

			});
		},
				
		uploadReps: function (title, lang, content) {
           
            //var repEncodeData = encodeURIComponent(rep1);            
            var jsonData = JSON.stringify({ "title": title, "lang": lang, "content": content });
            
            $.ajax({
                async: true,
                crossDomain: true,
                method: "POST",
                type: "POST",
                dataType: 'json',                
                contentType: "application/json; charset=utf-8", // 'application/x-www-form-urlencoded', // "text/plain",
                url: "api/DbController/UploadContent",
                data: jsonData,                                     
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", // "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache",
                    "Token": token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type, soapaction, Origin, X-Requested-With, Content-Type, Accept"
                },

                success: function (data, textStatus, jQxhr) {
                    //RepEditor.populate(data);
                    //RepEditor.populateOffLine();    
                    //RepEditor.busyIndicator(false);
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log("error message: " + textStatus);
                    // cache
                    //RepEditor.populateOffLine();
                    //RepEditor.busyIndicator(false);
                },
                statusCode: {
                    404: function () {
                        console.log("page not found");
                    },
                    0: function () {
                        console.log("page cross-site scripting, DNS issues, ad blocker. request was interrupted. failed due to issue on the client side");
                    }
                }

			});
        },
        
        uploadReps2: function (title, lang, formData) {
           
            //var repEncodeData = encodeURIComponent(rep1);            
            //var jsonData = JSON.stringify({ "title": title, "lang": lang, "content": content });
            
            $.ajax({
                async: true,
                crossDomain: true,
                method: "POST",
                type: "POST",
                // dataType: 'json',                
                // contentType: "application/json; charset=utf-8", // 'application/x-www-form-urlencoded', // "text/plain",
                enctype: 'multipart/form-data',
                url: "api/DbController/UploadContent",
                // data: jsonData,       
                cache: false,
                data : formData,
                processData: false,  // tell jQuery not to process the data
                contentType: false,  // tell jQuery not to set contentType


                headers: {
                    //"Accept": "application/json",
                    //"Content-Type": "application/json", // "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache",
                    "Token": token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type, soapaction, Origin, X-Requested-With, Content-Type, Accept"
                },

                success: function (data, textStatus, jQxhr) {
                    //RepEditor.populate(data);
                    //RepEditor.populateOffLine();    
                    //RepEditor.busyIndicator(false);
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log("error message: " + textStatus);
                    // cache
                    //RepEditor.populateOffLine();
                    //RepEditor.busyIndicator(false);
                },
                statusCode: {
                    404: function () {
                        console.log("page not found");
                    },
                    0: function () {
                        console.log("page cross-site scripting, DNS issues, ad blocker. request was interrupted. failed due to issue on the client side");
                    }
                }

			});
		}
		
		
	};



    // Fake some of Object.create so we can force non test results to be non "own" properties.
    var RepEditor = function () { };
    RepEditor.prototype = RepEditorPrototype;

    // Leak RepEditor globally when you `require` it rather than force it here.
    // Overwrite name so constructor name is nicer :D
    RepEditor = new RepEditor();



    /**
     * is returns a boolean if the typeof an obj is exactly type.
     *
     * @access private
     * @function is
     * @param {*} obj - A thing we want to check the type of
     * @param {string} type - A string to compare the typeof against
     * @returns {boolean}
     */

    function is(obj, type) {
        return typeof obj === type;
    }
    ;

    var classes = [];

    /**
     * Run through all tests and detect their support in the current UA.
     *
     * @access private
     */

    function testRunner() {
        var featureNames;
     
    };
    
    
    function getTranslate(data){
		
		RepEditor.clear();		
		
	    var id = 1;
	    var w1 = '00:00:03,420 --> 00:00:05,169';
	    var w2 = 'Priviusly in Emergency. There was dark night and all people are sleeping.';
	    var w3 = 'В предишния епизод. Тя има човешко тяло със синтетичен ИИ(изкуствен интелект)?';
	    var w4 = 'В предишния епизод. Тя има човешко тяло със синтетичен ИИ?';
	    var w5 = '';	
        RepEditor.addNewRow(id, w1, w2, w3, w4, w5);
        
        RepEditor.addNewRow(2, w1, w2, w3, w4, w5);
        RepEditor.addNewRow(3, w1, w2, w3, w4, w5);
        RepEditor.addNewRow(4, w1, w2, w3, w4, w5);
        RepEditor.addNewRow(5, w1, w2, w3, w4, w5);
    }
 
    // Leak RepEditor namespace
    window.RepEditor = RepEditor;

    ;

})(window, document);


(function ($) {
    // $(window).load(function (){  });
    // $(document).load(function (){  });

    $(document).ready(function () {

		$('#buttonSave').submit(function(e){
            
            e.preventDefault();

            /*
			$.ajax({
			url: $(this).attr('action'),
			data : $(this).serialize(),
			success : function (data){

				}
			});
			*/
			
			saveRep();
			
			
		});   
								
        $("#formUpload").submit(function (e) {
                 
            e.preventDefault();

            var formData = new FormData($(this)[0]);
            // or serialize current one -> $('#yourForm').serialize())
            // formData.serialize();

            var f = $('#uploadFile')[0].files[0];            
            formData.append("fileU", f);
            // var value = $('[name=search]').val().toLowerCase();            
            var title = RepEditor.getTitle(); 

            // RepEditor.uploadReps(title, "eng-bg", f);
            RepEditor.uploadReps2(title, "eng-bg", formData);                          
        });

        $("#formSave").submit(function (e) {
            e.preventDefault();
            var formData = new FormData($(this)[0]);
     
            //var value = $('[name=search]').val().toLowerCase();
            
            RepEditor.saveRep();
          
    });
        
        
        $("#submit").on("keyup", function () {
                //var value = $(this).val().toLowerCase();
                
                saveRep();
                
        });
      

    });

    $(window).bind("load", function () {
		
		RepEditor.clear();	
	 
		var token = RepEditor.getParameterByName('token');
		if (!RepEditor.isNull(token)){							
			RepEditor.loadReps(token)
		}
                 
					
                 
	
       
        
        // RepEditor.translate()
        
		// RepEditor.clear();		
		
	    // var id = 1;
	    // var w1 = '00:00:03,420 --> 00:00:05,169';
	    // var w2 = 'Priviusly in Emergency. There was dark night and all people are sleeping.';
	    // var w3 = 'В предишния епизод. Тя има човешко тяло със синтетичен ИИ(изкуствен интелект)?';
	    // var w4 = 'В предишния епизод. Тя има човешко тяло със синтетичен ИИ?';
	    // var w5 = '';	
		// RepEditor.addNewRow(id, w1, w2, w3, w4, w5);
		
		// var rr = RepEditor.save(id);
                 
    });

})($);
