<?php
require($_SERVER['DOCUMENT_ROOT']."/includes/config.inc.php");
require(MYSQL);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

//need to convert all phone numbers from (999)999-9999 to 9999999999
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	
	if (isset($_POST['TokenTime']) && !empty($_POST['TokenTime'])) {
		
		$current_time = microtime(true);
		$execution_time = $current_time - $_POST['TokenTime'];//in seconds
		if($execution_time < 30) {//less than 100 seconds
			
			echo "Your complete form submission took ".$execution_time." seconds.";
			//die("");
			
		} else if (isset($_POST['Token']) && !empty($_POST['Token']) && hash_equals($_SESSION['token'], $_POST['Token']) ) {//token validation			
			try {
				$sql = "INSERT INTO all_leads (domain, type_of_loan, province, credit_rating, expand_search, property_value, property_type, mortgage_balance_1, mortgage_balance_2, borrow_amount, loan_type, loan_term, first_name, last_name, email, home_phone, office_phone, postal_code, down_payment, total_income, session_token, post_token, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
				$stmt = $conn->prepare($sql);
				
				if ($stmt !== FALSE) {
					//get domain
					$domain = substr($_SERVER['SERVER_NAME'], 4,-4);
					$branch_type = escape_data(filter_input(INPUT_POST, "BranchType"), $conn);
					$province = escape_data(filter_input(INPUT_POST, "Province"), $conn);
					$credit_rating = escape_data(filter_input(INPUT_POST, "CustomerCredit"), $conn);
					$expand_search = escape_data(filter_input(INPUT_POST, "SearchExpand"), $conn);
					if($expand_search == "") $expand_search = "No";
					$property_value = escape_data(filter_input(INPUT_POST, "PropertyValue"), $conn);
					$property_type = escape_data(filter_input(INPUT_POST, "PropertyType"), $conn);
					$FirstMortgageBalance = escape_data(filter_input(INPUT_POST, "FirstMortgageBal"), $conn);
					$SecondMortgageBalance = escape_data(filter_input(INPUT_POST, "SecondMortgageBal"), $conn);
					$borrow_amount = escape_data(filter_input(INPUT_POST, "AmountToBorrow"), $conn);
					$loan_type = escape_data(filter_input(INPUT_POST, "LoanType"), $conn);
					$loan_term = escape_data(filter_input(INPUT_POST, "LoanTerm"), $conn);
					$first_name = escape_data(filter_input(INPUT_POST, "FirstName"), $conn);
					$last_name = escape_data(filter_input(INPUT_POST, "LastName"), $conn);
					$email = escape_data(filter_input(INPUT_POST, "Email"), $conn);
					$home_phone = escape_data(filter_input(INPUT_POST, "HomePhone"), $conn);
					$office_phone = escape_data(filter_input(INPUT_POST, "OfficePhone"), $conn);
					$postal_code = escape_data(filter_input(INPUT_POST, "PostalCode"), $conn);
					$down_payment = escape_data(filter_input(INPUT_POST, "DownPayment"), $conn);
					$total_income = escape_data(filter_input(INPUT_POST, "TotalIncome"), $conn);
					
					$session_token = $_SESSION['token'];
					$post_token = $_POST['Token'];
					//$execution_time already calculated
					
					// sql injection covered.
					$stmt->bind_param("sssssssssssssssssssssss", $domain, $branch_type, $province, $credit_rating, $expand_search, $property_value, $property_type, $FirstMortgageBalance, $SecondMortgageBalance, $borrow_amount, $loan_type, $loan_term, $first_name, $last_name, $email, $home_phone, $office_phone, $postal_code, $down_payment, $total_income, $session_token, $post_token, $execution_time);
				} else {
					echo $conn->error; // optional - returns a string description of the last error
				}
				
				$stmt->execute();
				if ($stmt->affected_rows > 0) {
					echo "success"; // anythihg other then this is considered an error
				} else {
					echo $conn->error;
				}
				
				$stmt->close();
				$conn->close();
				
				// send email
				// Need these files for Universal Email to work
				//require_once($_SERVER['DOCUMENT_ROOT'] . "/webassist/email/mail_php.php");
				//require_once($_SERVER['DOCUMENT_ROOT'] . "/webassist/email/mailformatting_php.php");
				//$email = 'mmichals@gmail.com';
				//require_once($_SERVER['DOCUMENT_ROOT'] . "/webassist/email/send_mail.php");
				// Send Notification Email
				$send_to = 'mmichals@gmail.com';
				
				$admin_subject = 'New Mortgage Application from Best Mortgage Ottawa';
				$admin_headers = 'MIME-Version: 1.0' . "\r\n";
				$admin_headers .= 'Content-type: text/html; charset=utf8' . "\r\n";
				$admin_headers .= 'From: michal@bestmortgageottawa.com' . "\r\n";
				$admin_headers .= 'Reply-To: info@bestmortgageottawa.com' . "\r\n";
				
				ob_start();
				include('template.php');
				$admin_message = ob_get_clean();
				
				$sentOk = mail($send_to, $admin_subject, $admin_message, $admin_headers);
			} catch (Exception $e) {
				echo $e->getMessage();
			} 
		} elseif (!empty($_POST['Token']) || !hash_equals($_SESSION['token'], $_POST['Token'])) {
			echo "CSRF token may be expired. Please refresh the page and try again.";
			//die("");
		}
	} else {
		//die("");
	}
} else {
    //echo "Get method is not allowed.";
    //die("");
}
