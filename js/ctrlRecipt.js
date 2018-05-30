$(function(){
	var product_id=null,product_name,product_pricepack,product_priceunit,product_pricebox,product_profitunit,product_profitpack,product_profitbox;
	var jsonList = {"billSumprice":0,"billSumprofit":0,"billList":[]};
	var options = {
		url: "JSON/Product.json",
		getValue: "product_name",
			list: {
				maxNumberOfElements:6,
				match: {
					enabled: true
				},
				onSelectItemEvent:function(){
					product_id = $('#i-BillProduct').getSelectedItemData().product_id;
					product_name = $('#i-BillProduct').getSelectedItemData().product_name;
					product_pricepack = $('#i-BillProduct').getSelectedItemData().product_pricepack;
					product_priceunit = $('#i-BillProduct').getSelectedItemData().product_priceunit;
					product_pricebox = $('#i-BillProduct').getSelectedItemData().product_pricebox;
					product_unitname = $('#i-BillProduct').getSelectedItemData().product_unitname;
					product_profitunit = $('#i-BillProduct').getSelectedItemData().product_profitunit;
					product_profitpack = $('#i-BillProduct').getSelectedItemData().product_profitpack;
					product_profitbox = $('#i-BillProduct').getSelectedItemData().product_profitbox;
				}
			}
	};

	function setTableList(){
		console.log("Run setTableList....");
		$('#table-List tbody').html('');
		$.each(jsonList.billList,function(key,val){
			$('#table-List tbody').append('<tr>'+
				'<td>'+(key+1)+'</td>'+
				'<td>'+val.list_name+'</td>'+
				'<td>'+val.list_amount+' '+val.list_nameunit+'</td>'+
				'<td>'+val.list_price+'</td>'+
				'</tr>');
		})

		$("#i-BillProduct").val('');
		$('#i-amount').val(1);
		$('#sumprice').html(jsonList.billSumprice);
		product_id = null;
	}

	function setJSONListProduct(){
		console.log("Run setJSONListProduct....");
		var amount = $('#i-amount').val();
		var price = $('#slc-Unit').val()!=3?$('#slc-Unit').val()!=2?amount*product_priceunit:amount*product_pricepack:amount*product_pricebox;
		var profit = $('#slc-Unit').val()!=3?$('#slc-Unit').val()!=2?amount*product_profitunit:amount*product_profitpack:amount*product_profitbox;
		var unitname = product_unitname;

		if(product_id!=null){
			jsonList.billSumprice += price;
			jsonList.billSumprofit += profit;

			if(findIDJSON(product_id)){
				jsonList.billList.push({
					"list_id":product_id,
					"list_name":product_name,
					"list_price":price,
					"list_amount":amount,
					"list_nameunit":unitname
				});
			}else{
				$.each(jsonList.billList,function(key,val){
					if(product_id==val.list_id){
						val.list_amount = parseInt(val.list_amount)+parseInt(amount);
						val.list_price += price;
					}
				})
			}
		}

		setTableList();
	}

	function findIDJSON(idFind){
		var valReturn = true;
		console.log("Run findIdJson...");
		if(jsonList.billList.length>0){
			$.each(jsonList.billList,function(key,val){
				if(idFind==val.list_id){
					console.log("Correct");
					valReturn = false;
				}
			})
		}else{
			valReturn = true;
		}

		return valReturn;
	}

	function payBill(){
		console.log("Pay function");
		var sql  = "INSERT INTO recipt (recipt_sumprice,recipt_sumprofit,recipt_cashpay) VALUES ('"+jsonList.billSumprice+"','"+jsonList.billSumprofit+"','"+$("#cashBill").val()+"')";

		dynamicQuerySqlModel(function(data){
			console.log(data);
			if(data=="Yes"){
				var sqlCall = "SELECT recipt_id FROM recipt ORDER BY recipt_id DESC LIMIT 1";
				dynamicCallSqlModel(function(data){
					console.log(data);
					if(data!="NoDATA"){
						var id_last = $.parseJSON(data);
						var sqlInsert = "INSERT INTO reciptdetail (reciptdetail_idrecipt,reciptdetail_idproduct,reciptdetail_amount,reciptdetail_price) VALUES ";

						$.each(jsonList.billList,function(key,val){
							sqlInsert += "('"+id_last[0]['recipt_id']+"','"+val.list_id+"','"+val.list_amount+"','"+val.list_price+"')";
							sqlInsert += (key+1)==jsonList.billList.length?"":",";
						})

						dynamicQuerySqlModel(function(data){
							console.log(data);
							if(data=="Yes"){
								if(confirm("ออกใบเสร็จ Y/N")){
									window.open("print-Recipt.php?id="+id_last[0]['recipt_id'],'_blank').print();
								}
								location.reload();
							}

						},sqlInsert);
					}
				},sqlCall,['recipt_id']);
			}
		},sql);
	}

	function searchProduct(valSearch){
		console.log('Product Id = '+product_id);
		if(product_id==null){
			console.log('Run searchBarcode....')
			var valFind = valSearch;
			if(!Number.isInteger(parseInt(valSearch))){
				setNumberBarcode(function(data){
					console.log(data);
					valFind = data;
				},valSearch)
			}
				var sql = "SELECT * FROM product WHERE ";
				var arraySelect = ['product_barcodeunit','product_barcodepack','product_barcodebox'];
				$.each(arraySelect,function(key,val){
						sql = "SELECT * FROM product WHERE "+val+" = "+valFind+"";
						console.log(sql);
						dynamicCallSqlModel(function(data){
							if(data!="NoDATA"){
							$.each($.parseJSON(data),function(key,val){
								product_id = val.product_id;
								product_name = val.product_name;
								product_pricepack = val.product_pricepack;
								product_priceunit = val.product_priceunit;
								product_profitunit = val.product_profitunit;
								product_profitpack = val.product_profitpack;
								product_profitbox = val.product_profitbox;
								product_unitname = val.product_unitname;
							})
								$('#slc-Unit').val(key+1);
								setJSONListProduct();
							}else{
								console.log("No data in key >"+key);
							}
						},sql,arrayProduct);
				})
		}else{
			console.log("productId != Null")
			setJSONListProduct();
		}
		
	}

	$("#i-BillProduct").easyAutocomplete(options);

	$('#btn-addListProduct').click(function(){
			searchProduct($('#i-BillProduct').val());
	})

	$('#btn-payBill').click(function(){
		jsonList.billList.length!=0?payBill():"";
	})

	$('#i-BillProduct').keypress(function(e){
		var valThis = null;
		if(e.which==13){
			searchProduct($(this).val());
		}
	})
})