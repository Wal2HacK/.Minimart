<script src="EasyAutocomplete-1.3.5/jquery.easy-autocomplete.min.js"></script> 
<link rel="stylesheet" href="EasyAutocomplete-1.3.5/easy-autocomplete.min.css"> 
<link rel="stylesheet" href="EasyAutocomplete-1.3.5/easy-autocomplete.themes.min.css">
<script type="text/javascript" src="js/ctrlRecipt.js"></script>
<style>
	.eac-square input {
	  background-repeat: no-repeat;
	  background-position: right 10px center;
	}
</style>
<div>
	<h1>Receipt</h1>
	<div class="col-md-6">
		<input type="text" id="i-BillProduct" class="form-control" placeholder="Barcode / NameProduct (Autocomplete)">
	</div>
	<div class="col-md-2">
		<input id="i-amount" type="number" class="form-control" value="1">
	</div>
	<div class="col-md-2">
		<select id="slc-Unit" class="form-control">
			<option value="1">หน่วย</option>
			<option value="2">pack</option>
			<option value="3">ลัง</option>
		</select>
	</div>
	<div class="col-md-2">
		<button id="btn-addListProduct" class="btn btn-primary" style="width: 100%;">Add</button>
	</div>
	<div class="col-md-12">
		<table id="table-List" class="table table-striped table-hover">
			<thead>
				<th>#</th>
				<th>สินค้า</th>
				<th>จำนวนสินค้า</th>
				<th>ราคา</th>
				<th>ลบ</th>
			</thead>
			<tbody>
				
			</tbody>
		</table>
	</div>
	<div class="col-md-offset-7 col-md-5">
		<table class="table">
		<th width="50px;"></th>
			<th><h2>ราคารวม</h2></th>
			<th><h2 id="sumprice">0.00</h2></th>
		</table>
	</div>
	<div class="col-md-offset-10 col-md-2" style="margin-bottom: 20px;">
		<input type="text" id="cashBill" class="form-control" placeholder="Cash">
	</div>
	<div class="col-md-offset-8 col-md-4">
			<button id="btn-oweBill" style="width: 45%" class="btn btn-danger btn-lg">Owe</button>
			<button id="btn-payBill" style="width: 45%;float: right;" class="btn btn-success btn-lg">Pay</button>
	</div>
</div>