var arrayCategory = ['category_id','category_name'];
var arrayUnitname = ['unitname_id','unitname_name'];
var arrayProduct  = ['product_id','product_name','product_category','product_barcodeunit','product_barcodepack',
					'product_barcodebox','product_pricecost','product_priceunit','product_pricepack','product_pricebox',
					'product_unitname','product_valumeunit','product_valumepack','product_value',
					'product_profitpack','product_profitunit','product_profitbox'];
var arrayRecipt   = ['recipt_id','recipt_sumprice','recipt_sumprofit','recipt_cashpay'];
var arrayReciptDetail = ['reciptdetail_idrecipt','reciptdetail_idproduct','reciptdetail_amount','reciptdetail_price']; 
					
function jsonProductUpdate(){
	$.ajax({
			url:"model/createJSONModel.php",type:"POST",
			data:{
				sql:"SELECT * FROM product",
				format:arrayProduct,
				fileset:"Product.json"
			},success:function(data){
				console.log("Update JSON File Complete!");
			}
		})
}

function dynamicQuerySqlModel(handleData,inputSQL){
	$.ajax({
		url:"model/importSqlModel.php",type:"POST",
		data:{
			sql:inputSQL
		},success:function(data){
			handleData(data);
		}
	})
}

function dynamicCallSqlModel(handleData,sqlInput,formatInput){
	$.ajax({
		url:"model/exportSqlModel.php",type:"POST",
		data:{
			sql:sqlInput,
			format:formatInput
		},success:function(data){
			handleData(data);
		}
	})
}

function Insert(handleData,valueInput,tableName,formatName){
	var formatNameNew = new Array();

	var sql = "INSERT INTO "+tableName;

	console.log(formatName.length);

	for(var i=1;i<formatName.length;i++){
		formatNameNew.push(formatName[i]);
	}

	sql += " ("+formatNameNew+") VALUES (";

	for(var i=0;i<valueInput.length;i++){
		sql += "'"+valueInput[i]+"'";
		if((i+1)!=valueInput.length){
			sql += ",";
		}else{
			sql += ")";
		}
	}
	tableName=="product"?jsonProductUpdate():"";

	console.log(formatNameNew.length+" - "+valueInput.length);
	
	dynamicQuerySqlModel(function(result){
		handleData(result);
	},sql)

}

function Update(handleData,valueInput,tableName,formatName,idedit){
	var sql = "UPDATE "+tableName+" SET ";

	for(var i=0;i<valueInput.length;i++){
		sql += formatName[i+1]+" = '"+valueInput[i]+"'";
		if((i+1)!=valueInput.length){
			sql += ",";
		}
	}

	sql += " WHERE "+tableName+"_id = '"+idedit+"'";

	tableName=="product"?jsonProductUpdate():"";

	dynamicQuerySqlModel(function(result){
		handleData(result)
	},sql);
}

function Delete(handleData,tableName,iddelete){
	var sql = "DELETE FROM "+tableName+" WHERE "+tableName+"_id = '"+iddelete+"'";

	dynamicQuerySqlModel(function(result){
		handleData(result)
	},sql)
}

function Logout(){
	$.post("model/logoutModel.php",function(){
		location.reload();
	})
}

function setNumberBarcode(handleData,valSet){
		var arrayConvertNumber = ['จ','ๅ','/','-','ภ','ถ','ุ','ึ','ค','ต'];
		console.log("Run setNumber....")
		var setVal = "";
		console.log(valSet.length)
		for(var i=0;i<valSet.length;i++){
			for(var j=0;j<arrayConvertNumber.length;j++){
				if(valSet[i]==arrayConvertNumber[j]){
					setVal += j;
				}
			}
			console.log(valSet[i]);
		}
		handleData(setVal);
}