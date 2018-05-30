<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
</head>
<?php 
	include("model/connectModel.php");
	include("mpdf/mpdf.php");
	ob_start();
	$id = $_GET['id'];
	$sql = "SELECT * FROM product";
	if($id!='all'){
		$sql .= " WHERE";
		$arrid = explode(',', $id);
		for($i=0;$i<count($arrid);$i++){
			$sql .= " product_id = '".$arrid[$i]."'";
			$sql .= ($i+1)!=count($arrid)?" OR":"";
		}
	}
	$query = mysqli_query(connect_db(),$sql);
	$counttr = 0;
	$countprice = 0;
	 ?>
<body>
	<table cellpadding="0" style="border-collapse: collapse;">
		<?php 
			while($row = mysqli_fetch_assoc($query)){
				$counttr>4?$counttr=0:'';
				if($counttr==0){ 
					echo '<tr>'; 
				}
				$counttr ++;
				$countprice ++;
				?>	
					<td style="border: 1px solid black;border-collapse: collapse;">
						<table cellpadding="0">
							<tr>
								<td colspan="2" style="height: 15mm;width: 40mm;font-size: 10px;padding-top: 2mm;"><?=$row['product_name']?></td>
							</tr>
							<tr>
								<td style="height: 8mm;font-size: 10px;width: 15mm;padding-left: 4mm"><?=$row['product_value']?></td>
								<td align="right" style="height: 7mm;font-size: 32px;padding-bottom: 4mm;padding-right:3mm;font-weight: bold;width: 25mm;"><?=$row['product_priceunit']?>.-</td>
							</tr>
						</table>
					</td>
				<?php
				if($counttr==5){ 
					echo '</tr>';}
			}
		 ?>
	</table>
	
</body>
</html>
<?php 
$html = ob_get_contents();
ob_end_clean();
$pdf = new mPDF('UTF-8','A4','0','4','4','4','4');
$pdf->SetAutoFont();
$pdf->SetDisplayMode('fullpage');
$pdf->WriteHTML($html,2);
$pdf->Output();
 ?>