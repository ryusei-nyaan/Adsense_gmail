function myFunction() {
	var SS = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = SS.getSheets()[0];
	
	var endday = new Date();
	endday.setDate(endday.getDate());
	endday = Utilities.formatDate(endday,"JST","yyyy-MM-dd");
	
	//クリック数，広告表示回数，収益
	var metrics = ["CLICKS","IMPRESSIONS","ESTIMATED_EARNINGS"]
	var args = {
		dimensions : ["DATE"],
		metrics : metrics,
		dateRange : "TODAY",
		reportingTimeZone : "ACCOUNT_TIME_ZONE"
	};
	//pub-XXXXXXX....はあなたのadsenseID
	var repo = AdSense.Accounts.Reports.generate("accounts/pub-XXXXXXXXXXXX",args).getRows();

  
	var SUBJECT_ = endday + "　本日の成果報告";
	//送信先（データの受信者）
	var RECIPIENT_ = "~@gmail.com";
	if (repo == null){
		var CONTENT_ = "クリック数 : " + " 0 回\n" + "表示回数 : " + " 0 回\n" + "収益　:　" + " 0 円\n";
	  }
	else{
		for (i = 0;i<repo[0]["cells"].length;i++){
			sheet.getRange(2,i+1).setValue(repo[0]["cells"][i]["value"]);
	　　　　}


	var CONTENT_ = "クリック数 : " + sheet.getRange(2,2).getValue() + "回\n" + "表示回数 : " + sheet.getRange(2,3).getValue() + "回\n" + "収益　:　" + sheet.getRange(2,4).getValue() + "円\n";
	}
	GmailApp.sendEmail(RECIPIENT_,SUBJECT_,CONTENT_);
}