var checkCount;

function findData() {
	
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableProduct");
  tr = table.getElementsByTagName("tr");
  checkCount = 0;

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        checkCount++;
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

$(function(){
	setTableCategory();
	setTableUnitname();
	setNumpage("");

	var page = 1;

	$('[barcode=yes]').keypress(function(e){
		if(e.which==13){
			var valSearch = $(this).val();
			if(!Number.isInteger(parseInt(valSearch))){
				setNumberBarcode(function(data){
					console.log(data);
					valSearch = data;
				},valSearch)
				$(this).val(valSearch)
			}
		}
	})

	$('#myInput').keyup(function(){
		setNumpage($(this).val());
	})

	$('#btn-saveProduct').click(function(){
		var valueProduct = new Array();
		var idedit = $(this).attr('idedit');
		var profitunit,profitpack,profitbox;

		$('[name=i-Product]').each(function(){
			valueProduct.push($(this).val());
		})

		profitpack = parseFloat(valueProduct[7]-(valueProduct[5]/valueProduct[11])).toFixed(2);
		profitunit = parseFloat(valueProduct[6]-(valueProduct[5]/valueProduct[10])).toFixed(2);
		profitbox  = valueProduct[8]-valueProduct[5];

		valueProduct.push(profitpack);
		valueProduct.push(profitunit);
		valueProduct.push(profitbox);

		if($(this).attr('process')=="save"){
			console.log(checkCount);
			if(checkCount==0){
				Insert(function(data){
					if(data=="Yes"){
						$('input[name=i-Product]').val('');
						$('select').val('0');
						$('#alt-Status').addClass('alert alert-success').html("Complete! เพิ่มข้อมูลสำเร็จ > "+valueProduct[0]);
						setNumpage("");
					}else{
						$('#alt-Status').addClass('alert alert-danger').html("Error! เพิ่มข้อมูลไม่สำเร็จ > "+valueProduct[0]);
					}
				},valueProduct,'product',arrayProduct);
			}else{
				console.log("Error");
			}
		}else{
			Update(function(data){
				console.log(data);
				if(data=="Yes"){
					$('input[name=i-Product]').val('');
					$('select').val('0');
					$('#alt-Status').addClass('alert alert-success').html("Complete! แก้ไขข้อมูลสำเร็จ");
						$('#alt-Status strong').html('Success');
					setNumpage("");
					$("#btn-saveProduct").attr('process','save');
				}
			},valueProduct,'product',arrayProduct,idedit);
		}
		
	})

	$('#btnSaveCategory').click(function(){
		if($('#inputCategory').val()!=""){
			var valueInput = new Array();
			valueInput.push($('#inputCategory').val());

			Insert(function(data){
				data=="Yes"?setTableCategory():"";
			},valueInput,'category',arrayCategory);

		}
	})

	$('#btnSaveUnitname').click(function(){
		if($('#inputUnitname').val()!=""){
			var valueInput = new Array();
			valueInput.push($('#inputUnitname').val());

			Insert(function(data){
				console.log(data);
				data=="Yes"?setTableUnitname():"";
			},valueInput,'unitname',arrayUnitname);
		}
	})

	$(document).on('click','.btn-delete',function(){
		var iddelete = $(this).attr('iddelete');
		var tableName = $(this).attr('table');

		Delete(function(data){
			data=="Yes"?(tableName=="category"?setTableCategory():tableName=="product"?setTableProduct():setTableUnitname()):"";
		},tableName,iddelete);
	})

	$(document).on('click','.btn-edit',function(){
		var idedit = $(this).attr('idedit');
		var tableName = $(this).attr('table');
		var sql = "SELECT * From "+tableName+" WHERE "+tableName+"_id = '"+idedit+"'";

		dynamicCallSqlModel(function(data){
			var name = arrayProduct[1];
			if(data!="NoDATA"){
				var converseJSON = JSON.parse(data);

					$('[name=i-Product]').each(function(key){
						$(this).val(converseJSON[0][arrayProduct[key+1]]);
					})
				}
		},sql,arrayProduct)

		$('#btn-saveProduct').attr('process','edit').attr('idedit',idedit).html('บันทึกแก้ไข');
	})

	$(document).on('click','.changePage',function(){
		page = $(this).attr('page');
		setNumpage("");
	})

	function setTableCategory(){

		$('#inputCategory').val('');

		var sql = "SELECT * FROM category";

		dynamicCallSqlModel(function(data){
			$("#tableCategory tbody").html('')
			$('#selectCategory').html('<option value="0">เลื่อกหมวดหมู่สินค้า</option>');
			$.each($.parseJSON(data),function(key,val){
				$("#tableCategory tbody").append('<tr>'+
					'<td align="left">'+(key+1)+'</td>'+
					'<td align="left">'+val['category_name']+'</td>'+
					'<td align="left"><a href="#" table="category" class="btn-delete" iddelete="'+val['category_id']+'"><span class="glyphicon glyphicon-remove"></span></a></td'+
					'</tr>')
				$('#selectCategory').append('<option value="'+val['category_name']+'">'+val['category_name']+'</option>');
			})
		},sql,arrayCategory)
	}

	function setTableUnitname(){
		$('#inputUnitname').val('');

		var sql = "SELECT * FROM unitname";

		dynamicCallSqlModel(function(data){
			$('#tableUnitname tbody').html('')
			$('#selectUnitname').html('<option value="0">เลื่อกหน่วยเรียก</option>')
			$.each($.parseJSON(data),function(key,val){
				$('#tableUnitname tbody').append('<tr>'+
					'<td align="left">'+(key+1)+'</td>'+
					'<td align="left">'+val['unitname_name']+'</td>'+
					'<td align="left"><a href="#" table="unitname" class="btn-delete" iddelete="'+val['unitname_id']+'"><span class="glyphicon glyphicon-remove"></span></a></td>'+
					'</tr>')
				$('#selectUnitname').append('<option value="'+val['unitname_name']+'">'+val['unitname_name']+'</option>')
			})
		},sql,arrayUnitname);
	}

	function setNumpage(dataFind){
		var sql = "SELECT * FROM product";
		dataFind!=""?sql+=" WHERE product_name LIKE '%"+dataFind+"%'":"";
		var dataperpage = 30;

		console.log(sql)

		dynamicCallSqlModel(function(data){
			var numberRow = $.parseJSON(data).length
			var numPage = Math.ceil(numberRow/dataperpage);
			$('#numPage').html('');
			
			for(i=1;i<=numPage;i++){
				$('#numPage').append('<li page="'+i+'" class="changePage"><a href="#">'+i+'</a></li>')
			}
			$('[page='+page+']').addClass('active')
			setTableProduct(dataFind);
		},sql,arrayProduct)
	}

	

	function setTableProduct(dataFind){
		var start = 0;
		var stop = 30;

		if(page>1){
			start = (page-1)*stop;
		}
		console.log(dataFind!=null)
		var sql = "SELECT * FROM product";
		dataFind!=""?sql+=" WHERE product_name LIKE '%"+dataFind+"%'":sql+=" LIMIT "+start+","+stop;

		console.log(sql);
		$('#tableProduct tbody').html('');
		dynamicCallSqlModel(function(data){
			
			$.each($.parseJSON(data),function(key,val){
				$('#tableProduct tbody').append('<tr>'+
					'<td>'+(key+1+(page>1?(page-1)*stop:0))+'</td>'+
					'<td>'+val['product_name']+'</td>'+
					'<td>'+val['product_category']+'</td>'+
					'<td>'+val['product_priceunit']+'</td>'+
					'<td>/</td>'+
					'<td>'+val['product_pricepack']+'</td>'+
					'<td align="center">'+
					'<a href="#" class="btn-edit" table="product" idedit="'+val['product_id']+'"><span class="glyphicon glyphicon-edit"></span></a>'+
					' | <a href="#" class="btn-delete" table="product" iddelete="'+val['product_id']+'"><span class="glyphicon glyphicon-remove"></span></a>'+
					'</td>'+
					'</tr>');
			})
		},sql,arrayProduct)
	}
})