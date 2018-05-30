function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("show-table");
  tr = table.getElementsByTagName("tr");

  console.log(input);

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
$(function(){
	setCategory();
	setTable("");
	var idToPrint = new Array();

	function setTable(dataFind){
		var sql = "SELECT * FROM product"
		dataFind!=""&&dataFind!=0?sql+=" WHERE product_category = '"+dataFind+"'":"";
		console.log(sql);
		dynamicCallSqlModel(function(data){
			if(data!="NoDATA"){
				$('#show-table tbody').html('');
				$.each($.parseJSON(data),function(key,val){
					$('#show-table').append('<tr class = "btntrSelect" idproduct = "'+val['product_id']+'">'+
						'<td><input type="checkbox" id = "'+val['product_id']+'"></td>'+
						'<td>'+(key+1)+'</td>'+
						'<td>'+val['product_name']+'</td>'+
						'<td>'+val['product_priceunit']+'</td>'+
						'<td>'+val['product_pricepack']+'</td>'+
						'</tr>');
				})
			}
		},sql,arrayProduct);
	}

	$('#btn-selectAll').click(function(){
		$('input[type=checkbox]').prop('checked',true);
	})

	$('#slc-Category').change(function(){
		setTable($(this).val());
	})

	$(document).on('click','.btntrSelect',function(){
		var idClick = $(this).attr('idproduct');
		console.log($('#'+$(this).attr('idproduct')).is(':checked'));
		if($('#'+$(this).attr('idproduct')).is(':checked')){
			if(idToPrint.length!=0){
				$.each(idToPrint,function(key,val){
					console.log(idClick);
					if(val==idClick){
						console.log("Pop > "+key)
						idToPrint.splice(key,1)
					}
				})
			}
			
		}
		$('#'+$(this).attr('idproduct')).prop('checked',$('#'+$(this).attr('idproduct')).is(':checked')!=true);
	})

	$('#btn-addSelect').click(function(){
		checkSelect();
	})

	$('#printbtn').click(function(){
		checkSelect(),window.open('print-Pricetag.php?id='+(idToPrint.length!=0?idToPrint:'all')).print();
	})

	function checkSelect(){
		$('[type=checkbox]').each(function(){
			if($(this).is(':checked')){
				if($.inArray($(this).attr('id'),idToPrint)==-1){
					idToPrint.push($(this).attr('id'));
				}
				$('#count-Pricetag').html("Price Tag : "+idToPrint.length)
			}
		})
	}

	function setCategory(){
		var sql = "SELECT * FROM category";
		dynamicCallSqlModel(function(data){
			if(data!="NoDATA"){
				$.each($.parseJSON(data),function(key,val){
					$('#slc-Category').append('<option val="'+val['category_id']+'">'+val['category_name']+'</option>');
				})
			}
		},sql,arrayCategory)

		
	}
})