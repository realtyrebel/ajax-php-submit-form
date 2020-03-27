(function ($) {

    "use strict";

    $(window).on('load', function () {
        $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350);
        $(window).scroll();
    });

    // bind popover.
    $('[data-toggle="popover"]').each(function () {
        var $elem = $(this);
        var contentid = $elem.data("contentid");
        $elem.popover({
            html: true,
            content: function () {
                return $(contentid).html();
            }
        });
    });
    // close pop-over when clicked on page
    $('body').on('click', function (e) {
        if ($(e.target).data('toggle') !== 'popover'
                && $(e.target).parents('[data-toggle="popover"]').length === 0
                && $(e.target).parents('.popover.in').length === 0) {
            $('[data-toggle="popover"]').popover('hide');
        }
    });

    $.validator.addMethod(
            "regex",
            function (value, element, regexp) {
                var check = false;
                return this.optional(element) || regexp.test(value);
            },
            "Please check your input."
            );

    $('input.Phone_Num_Type').on('ifChecked', function (event) {
        $("#Second_Phone_Num_Text").text($(this).data("other"));

        if ($(this).is(":checked")) {
            $("#Second_Phone_Number").fadeIn();
        }
    });

    //minlength: 6,
    //maxlength: 15,

    $('#wrapped').validate({
        rules: {
            PostalCode: {
                required: true,
                regex: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/i
            },
            First_Name: {
                required: true,
                minlength: 2,
								regex: /^[A-Za-z\s]+$/
            },
            Last_Name: {
                required: true,
                minlength: 2,
								regex: /^[A-Za-z\s]+$/
            },
            Phone1: {
                required: true,
                regex: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
            },
            Phone2: {
                regex: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
            }

            // 
        },
        messages: {
            PostalCode: {
                regex: 'Invalid Postal Code'
            },
            First_Name: {
                minlength: 'First Name must be a minimum of 2 characters',
								regex: 'Only letters and spaces permitted'
            },
            Last_Name: {
                minlength: 'Last Name must be a minimum of 2 characters',
								regex: 'Only letters and spaces permitted'
            },
            Email: {
                email: "Invalid email address"
            },
            Phone1: {
                regex: 'Invalid phone number - must be 10 digits'
            },
            Phone2: {
                regex: 'Invalid phone number - must be 10 digits'
            }
        }
    });


    /* Round Input Slider */

    // Mortgage Refinance & Home Equity Loan
    $("#Branch1_Property_Value").roundSlider({
        radius: 100,
        min: 30000,
        max: 2000000,
        step: 5000,
        editableTooltip: false,
        width: 20,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 50000
    });

    // Home Loan & Construction Loan
    $("#Branch2_Property_Value").roundSlider({
        radius: 100,
        min: 30000,
        max: 2000000,
        step: 5000,
        editableTooltip: false,
        width: 20,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 50000
    });

    $("#First_Mort_Bal").roundSlider({
        radius: 100,
        min: 0,
        max: 1500000,
        step: 5000,
        editableTooltip: false,
        width: 20,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 50000
    });

    $("#Second_Mort_Bal").roundSlider({
        radius: 100,
        min: 0,
        max: 1000000,
        step: 5000,
        editableTooltip: false,
        width: 20,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 0
    });

    // Mortgage Refinance & Home Equity Loan Borrow Amount
    $("#Branch1_Borrow_Amount").roundSlider({
        radius: 100,
        min: 25000,
        max: 2000000,
        step: 2500,
        editableTooltip: false,
        width: 20,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 50000

    });

    // Home Loan & Construction Loan Borrow Amount
    $("#Branch2_Borrow_Amount").roundSlider({
        radius: 100,
        min: 25000,
        max: 2000000,
        step: 2500,
        editableTooltip: false,
        width: 20,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 50000

    });

    $("#Down_Payment").roundSlider({
        radius: 100,
        min: 10000,
        max: 750000,
        step: 5000,
        editableTooltip: false,
        width: 20,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 20000
    });

    $("#Net_Income").roundSlider({
        radius: 100,
        min: 30000,
        max: 1500000,
        step: 5000,
        editableTooltip: false,
        width: 20,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 30000
    });


    /* Check and radio input styles */
    $('input.icheck').iCheck({
        checkboxClass: 'icheckbox_square-grey',
        radioClass: 'iradio_square-grey'
    });


    $('.phone_us').mask('(000) 000-0000', {placeholder: "(___) ___-____"});

    $('input[name=PostalCode]').mask('SNA NAN', {
        placeholder: "___ ___",
        'translation': {
            S: {pattern: /(?!.*[DFIOQUdfioqu])[A-VXYa-vxy]/},
            A: {pattern: /[A-Za-z]/},
            N: {pattern: /[0-9]/}
        }
    });

    /* Scroll to top small screens: change the top position offset based on your content*/
    var $Scrolbt = $('button.backward,button.forward');
    var $Element = $('html, body');

    if (window.innerWidth < 800) {
        $Scrolbt.on("click", function () {
            $Element.animate({
                scrollTop: 100
            }, "slow");
            return false;
        });
    }

    function showError(msg) {
        $("#loader_form").fadeOut();

        var errorHtml = '<div  class="alert alert-danger fade in alert-dismissible show">'
                + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                + '<span aria-hidden="true" style="font-size:20px">×</span>'
                + '</button>    <strong>Error!</strong> ' + msg
                + '</div>';

        $("#ErrorMsgContainer").html(errorHtml);
        $("#ErrorMsgContainer").show();
    }

    function  showSuccess() {
        //$("#Thankyou_Msg").show();
        $("#bottom-wizard").hide();
        $("#ErrorMsgContainer").hide();
        $(".step.submit").hide();
				
				var name = $('input[name=First_Name]').val();
				if(name){
					window.location = 'https://www.bestmortgageottawa.com/thank-you.php?n='+name;
				}
    }
	
	var Province = "";
	
	$("select.Province_Branch1").change(function(){
		Province = $(".Province_Branch1 option:selected").val();
		//alert("You selected " + Province + " from Province_Branch1");
	});
	
	$("select.Province_Branch2").change(function(){
		Province = $(".Province_Branch2 option:selected").val();
		//alert("You selected " + Province + " from Province_Branch2");
	});
	
    /* Form submit loader */
    $('form').on('submit', function (e) {
        e.preventDefault();
		
        var form = $("form#wrapped");
        form.validate();
        if (form.valid()) {

            try {
				var Token = $('input[name=Token]').val();
				var TokenStart = $('input[name=TokenTime]').val();              
				
				var LoanRequiredFor = $('input[name=Loan_Required_For]:checked').data("val");
                var LoanRequiredForVal = $('input[name=Loan_Required_For]:checked').val();
				
				Province = Province;
				//alert("Selected Proince: " + Province);
				
                var CustomerCredit = $("input[name=Customer_Credit]:checked", "#" + LoanRequiredForVal).data("val");
                var SearchExpand = $("input[name=Search_Expand_Qs]:checked", "#" + LoanRequiredForVal).data("val");
                var PropertyValue = $("input[name=" + LoanRequiredForVal + "_Property_Value]").val();
                var PropertyType = $('input[name=Property_Type_Answers]:checked', "#" + LoanRequiredForVal).val();

                var FirstMortBal = $("input[name=First_Mort_Bal]").val();
                var SecondMortBal = $("input[name=Second_Mort_Bal]").val();

                var LoanType = $("input[name=Loan_Type_Ans]:checked").data("val");
                var LoanTypeVal = $("input[name=Loan_Type_Ans]:checked").val();
                var BorrowAmount = $("input[name=" + LoanRequiredForVal + "_Borrow_Amount]").val();
                var DownPayment = $("input[name=Down_Payment]").val();

                var LoanTerm = $("input[name=Preferred_Loan_Type_Answers]:checked", "#" + LoanTypeVal).val();

                var PostalCode = $('input[name=PostalCode]').val();
                var FirstName = $('input[name=First_Name]').val();
                var LastName = $('input[name=Last_Name]').val();
                var Email = $('input[name=Email]').val();

                var numType = $('input[name=Phone_Num_Type]:checked').val();
                var OfficePhone = "";
                var HomePhone = "";
                if (numType == "work") {
                    OfficePhone = $('input[name=Phone1]').val();
                    HomePhone = $('input[name=Phone2]').val()
                } else {
                    HomePhone = $('input[name=Phone1]').val()
                    OfficePhone = $('input[name=Phone2]').val();
                }
                var TotalIncome = $("input[name=Net_Income]").val();

                if (LoanRequiredForVal == "Branch2") {
                    FirstMortBal = "N/A";
                    SecondMortBal = "N/A";

                } else {
                    DownPayment = "N/A";
                }

				//alert("#Province_Branch1, #" + LoanRequiredForVal+ " "+Province + "#Province_Branch2, #" + LoanRequiredForVal+ " "+Province); return;
				
                $("#loader_form").fadeIn();

                $.post("customer-new.php",
                        {
                            Token: Token,
														TokenTime: TokenStart,
														AmountToBorrow: BorrowAmount,
                            OfficePhone: OfficePhone,
                            CustomerCredit: CustomerCredit,
                            DownPayment: DownPayment,
                            Email: Email,
                            FirstMortgageBal: FirstMortBal,
                            FirstName: FirstName,
                            HomePhone: HomePhone,
                            LastName: LastName,
                            LoanTerm: LoanTerm,
                            LoanType: LoanType,
                            PostalCode: PostalCode,
                            PropertyType: PropertyType,
                            PropertyValue: PropertyValue,
                            Province: Province,
                            SearchExpand: SearchExpand, //may be undefined
                            SecondMortgageBal: SecondMortBal,
                            TotalIncome: TotalIncome,
                            BranchType: LoanRequiredFor,
                            
                        }, function (data) {
                    $("#loader_form").fadeOut();

                    if (data == "success") {
                        showSuccess();
                    } else {
                        showError("Oops! server encountered something unexpected. Here is the detail;<br/> " + data);
                    }

                            /*
							var msg = "Amount Borrowed: " + BorrowAmount +
							" || Credit Rating: " + CustomerCredit +
							" || Email: " + Email +
							" || Expand Search Results: " + SearchExpand +
							" || First Mortgage Balance: " + FirstMortBal +
							" || First Name: " + FirstName +
							" || Last Name: " + LastName +
							" || Loan Required For: " + LoanRequiredFor +
							" || Loan Required For Value: " + LoanRequiredForVal +
							" || Loan Term: " + LoanTerm +
							" || Loan Type: " + LoanType +
							" || Loan Type Value: " + LoanTypeVal +
							" || Postal Code: " + PostalCode +
							" || Property Value: " + PropertyValue +
							" || Property Type: " + PropertyType +
							" || Province: " + Province +
							" || Second Mortgage Balance: " + SecondMortBal +
							" || Phone Number Type: " + numType +
							" || Office Telephone: " + OfficePhone +
							" || Home Phone: " + HomePhone +
							" || Down Payment: " + DownPayment +
							" || Total Income: " + TotalIncome + 
							" || Token: " + Token + "";
                            $("#footer").html(msg);
							*/


                }).fail(function (data) {
                    showError("Oops!the server encountered something unexpected. Please try later.");
                });

            } catch (e) {
                showError("Oops!the server encountered something unexpected. Please try again.");
            }
            ;//end try & catch

        }//if(form.valid())
    });//form.on(submit)
	
	//shows when select option is changed
	//$('select').on('change', function(){ alert($(this).val()); });

})(window.jQuery);