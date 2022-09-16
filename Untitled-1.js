/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
/**
 * Author: Harsha Bhakare
 * Suitelet task - Vishal Naphade
 * Show the custom records created in point 1 in a sublist and provide a checkbox field on the
 * sublist for selection of records also  provide DELETE,COPY,OPEN (READ) buttons 
 * along with the SUBMIT button.
 * 
 */
define(['N/ui/serverWidget','N/record','N/error','N/search','N/currentRecord'],

function(serverWidget,record,error,search,currentRecord) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	try{
    	if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'Display Sublist Form'
            });
            form.clientScriptFileId = 116894;
           // form.clientScriptModulePath ="SuiteScripts/ClientScript_forsuitelet_task2 ";
               
            //Adding a sublist to the form
            var sublist = form.addSublist({
                id : 'sublist',
                type : serverWidget.SublistType.INLINEEDITOR,
                label : 'Display Sublist Form'
            });
          //  log.debug('sublist added');
            //Adding fields to the sublist
            var chk= sublist.addField({
                id: 'custpage_cntm_check',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Select'
            });
            var fname= sublist.addField({
                id: 'custpage_cntm_fname',
                type: serverWidget.FieldType.TEXT,
                label: 'First name'
            });
            var lname= sublist.addField({
                id: 'custpage_cntm_lname',
                type: serverWidget.FieldType.TEXT,
                label: 'Last name'
            });
            var addr= sublist.addField({
                id: 'custpage_cntm_addr',
                type: serverWidget.FieldType.TEXT,
                label: 'Address'
            });
            //log.debug('fields added to sublist');
            //Loading the save search to display in the sublist
            var mySearch = search.load({
				id: 'customsearch_cntm_csut_rec_assignment'
			});
			//log.debug('mySearch',JSON.stringify(mySearch));
			
			var searchResult = mySearch.run().getRange({
	            start: 0,
	            end: 100
	        });
			var counter=0;
			mySearch.run().each(function(result) {
				
				var fname = result.getValue({
					name: 'custrecord_cntm_fname'
				});
				var lname = result.getValue({
					name: 'custrecord_cntm_lastname'
				});
				var addr = result.getValue({
				      name: "custrecord_cntm_address",
				});
				sublist.setSublistValue({
                    id: 'custpage_cntm_fname',
                    line: counter,
                    value: fname
				});
				sublist.setSublistValue({
                    id: 'custpage_cntm_lname',
                    line: counter,
                    value: lname
				});
				sublist.setSublistValue({
                    id: 'custpage_cntm_addr',
                    line: counter,
                    value: addr
				});
				counter++;
				return true;
				
			});
			
			  form.addSubmitButton({
		            label: 'Submit'
		        });
		        form.addButton({
		            id : 'Updatebutton',
		            label : 'Update',
		            
		        });
		        form.addButton({
		            id : 'Openbutton',
		            label : 'Open'
		        });
		        //Code to pass the sublist records as a parameter to function in the clientscript.
		        var currentRec = currentRecord.get();
		        var numLines = currentRec.getLineCount({
		            sublistId: 'sublist'
		        });
		        var sublistFieldValue = currentRec.getSublistValue({
		            sublistId: 'sublist',
		            fieldId: 'custrecord_cntm_fname',
		            line: 2
		        });
		        form.addButton({
		            id : 'Deletebutton',
		            label : 'Delete',
		            functionName: 'validateDelete(sublistFieldValue)'
		        });
		
            context.response.writePage(form);
	}
//          else
//    		{
//    		var  sublistid= context.request.parameters.sublistid;
//    		var  fname= context.request.parameters.custpage_cntm_check;
//    		var  lname= context.request.parameters.custpage_cntm_lname;
//    		var  addr= context.request.parameters.custpage_cntm_addr;
//    		
//    		
//    		
//    		
//    		}
    }catch(error)
    {
    	log.error('Error occured',error);
    }
    
    }

    return {
        onRequest: onRequest
    };
    
});
