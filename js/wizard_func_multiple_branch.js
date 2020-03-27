/*  Wizard */
jQuery(function ($) {
    "use strict";
    $("#wizard_container").wizard({
        stepsWrapper: "#wrapped",
        submit: ".submit",
        beforeSelect: function (event, state) {
            if ($('input#website').val().length != 0) {
                return false;
            }
            if (!state.isMovingForward)
                return true;
            var inputs = $(this).wizard('state').step.find(':input');
            return !inputs.length || !!inputs.valid();
        },
        beforeForward: function (event, state) {

            var $stepName = $(this).wizard('state').step.find(':input[name=Next_Step_Name]');

            if ($stepName) {
                var stepname = $stepName.val();

                if (stepname && stepname == "Find_Lenders") {

                    var lendersCount = Math.floor((Math.random() * 5) + 6);
                    $("#loader_form").fadeIn();
                    $("#Search_Progress").show()
                    $("#Search_Result").hide()
                    $("#Search_Title").text("Searching for Lenders");
                    setTimeout(function () {

                        $("#Result_Count").text(lendersCount);
                        $("#Search_Title").text("Search Complete");
                        $("#Search_Progress").hide()
                        $("#loader_form").fadeOut();
                        $("#Search_Result").fadeIn()

                    },
                            2000);
                } else {

                    var type = $('input[name=Loan_Required_For]:checked').val();
                    var loanrequiredfor = $('input[name=Loan_Required_For]:checked').data("val")

                    // 2nd Mortgage step, let's calculate the maximum also. max = property value - 1st mortgage.
                    if (stepname && stepname == "Second_Mortgage_Bal") {

                        var propertyVal = $("input[name=" + type + "_Property_Value]").val();
                        var firstMort = $("input[name=First_Mort_Bal]").val();

                        var secondMortMax = parseInt(propertyVal) - parseInt(firstMort)

                        // some smartness
                        var curValue = $("#Second_Mort_Bal").roundSlider("option", "value");
                        if (curValue > secondMortMax) {
                            curValue = parseInt(secondMortMax / 2);
                        }

                        $("#Second_Mort_Bal").roundSlider("option", {"max": secondMortMax, "value": 0});
                        //AdjustSliderTooltip($("#Second_Mort_Bal"));
                        
                    }
                    // Down Payment will always be less than the Property Value
                    else if (stepname && (stepname == "Branch2_Property_Type")) {

                        var propertyVal = parseInt($("input[name=" + type + "_Property_Value]").val());
                        $("#Down_Payment").roundSlider("option", {"max": parseInt(propertyVal) - 1000});

                        SetMaxBorrow(type, propertyVal);
                    }
                    //max borrow = property value - 1st mortgage - 2nd mortgage
                    //not the same for construction loan
                    else if (stepname && stepname == "Branch1_Borrow_Amount_Step") {

                        var propertyVal = $("input[name=" + type + "_Property_Value]").val();

                        var maxBorrow = parseInt(propertyVal);

                        if (loanrequiredfor == "Mortgage Refinance") {
                            maxBorrow =  Math.floor((maxBorrow * 95 / 100)); // 95% of the prop value.
                        } else if (loanrequiredfor == "Home Equity Loan") {
                            
                            var firstMort = $("input[name=First_Mort_Bal]").val();
                            var secondMort = $("input[name=Second_Mort_Bal]").val();
                            maxBorrow = maxBorrow - parseInt(firstMort) - parseInt(secondMort);
                        }
					
                        SetMaxBorrow(type, maxBorrow);
                    }

                }
            }
        }
    }).validate({
        errorPlacement: function (error, element) {
            if (element.is(':radio') || element.is(':checkbox')) {
                error.insertBefore(element.next());
            } else {
                error.insertAfter(element);
            }
        }
    });
});

$("#wizard_container").wizard({
    transitions: {
        branchtype: function ($step, action) {
            var branch = $step.find(":checked").val();
            if (!branch) {
                $("form").valid();
            }
            return branch;
        }
    },
});

function SetMaxBorrow(type, maxBorrow) {

    // some smartness
    var $borrowAmount = $("#" + type + "_Borrow_Amount");
    var curValue = $borrowAmount.roundSlider("option", "value");
    var minValue = $borrowAmount.roundSlider("option", "min");

    // some smartness.
    if (minValue >= maxBorrow) {
        minValue = Math.floor(parseInt(maxBorrow / 6));
    }

    // some smartness.
    if (curValue >= maxBorrow) {
        curValue = minValue + Math.floor(parseInt((maxBorrow - minValue) / 2));
    }

    $borrowAmount.roundSlider("option", {"max": maxBorrow, "min": minValue, "value": curValue});

    AdjustSliderTooltip($borrowAmount);
}

function AdjustSliderTooltip($elem) {
	var curValue = $elem.roundSlider("option", "value");
	$(".rs-tooltip.rs-tooltip-text", $elem).css("margin-top", "-21px").css("margin-left",curValue==0? "-16px": "-43.5px");
}
