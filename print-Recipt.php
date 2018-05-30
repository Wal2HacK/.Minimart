<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
</head>
<style>
	$page{
		size:70mm;
		margin-top:0mm;
		margin-bottom:5mm;
		marks:none;
	}
</style>
<?php 
		include "model/connectModel.php";
		include "mpdf/mpdf.php";
		ob_start();
		$idbill = $_GET['id'];
		$sumprice = 0;
		$pageheight = 80;
		$sqlselectbilldetail = "SELECT * FROM reciptdetail WHERE reciptdetail_idrecipt = ".$idbill;
		$querybilldetail = mysqli_query(connect_db(),$sqlselectbilldetail);
		$sqlselectbill = "SELECT * FROM recipt WHERE recipt_id = ".$idbill;
		$querybill = mysqli_query(connect_db(),$sqlselectbill);
		$rowbill = mysqli_fetch_assoc($querybill);
	 ?>
<body>
		<p style="text-align: center;font-size: 14px;">.Minimart</p>
		<p>- รับโอนเงินทุกธนาคาร ค่าบริการเริ่มต้น 25 บาท</p>
		<p>Date : <?=$rowbill['recipt_datetime']?></p>
		<p>Bill Detail No. : <?=$rowbill['recipt_id']?></p>
		<p>Bill Customer ID : <?=$rowbill['recipt_idcustomer']?></p>
		<hr style="width: 80%;margin-top: 5px;">
		<table>
		<?php 
			
			while($rowbilldetail = mysqli_fetch_assoc($querybilldetail)){
				$pageheight += 6;
				$sqlselectnameproduct = "SELECT * FROM product WHERE product_id = ".$rowbilldetail['reciptdetail_idproduct'];
				$querynameproduct = mysqli_query(connect_db(),$sqlselectnameproduct);
				$rownameproduct = mysqli_fetch_assoc($querynameproduct);
				$sumprice += $rowbilldetail['reciptdetail_price'];
				echo '<tr>
				<td width="10mm">'.$rowbilldetail['reciptdetail_amount'].'</td>
				<td width="50mm">'.$rownameproduct['product_name'].'</td>
				<td align="right" width="20mm">'.$rowbilldetail['reciptdetail_price'].'</td>
				</tr>';
				
			}
		?>
		<tr>
			<td style="height: 25px;"></td>
		</tr>
		<tr>
			<td></td>
			<td align="right">Total</td>
			<td align="right"><?=$sumprice?></td>
		</tr>
		<tr>
			<td></td>
			<td align="right">Cash/Change</td>
			<td align="right"><?=$rowbill['recipt_cashpay']?> / <?=($rowbill['recipt_cashpay']-$sumprice)?></td>
		</tr>
		</table>
		<p style="text-align: center;margin-top: 30px;margin-bottom: 0;font-weight: bold;font-size: 14px;">Thanks.. ^^</p>
</body>
</html>
<?php 
$html = ob_get_contents();
ob_end_clean();
$pdf = new mPDF('',array(80,$pageheight),8,'', 3, 3, 5, 5,'P');
$pdf->SetAutoFont();
$pdf->SetDisplayMode('fullpage');
$pdf->WriteHTML($html,2);
$pdf->Output();
 ?>