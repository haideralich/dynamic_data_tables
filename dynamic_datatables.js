"use strict";
var KTDatatablesSearchOptionsAdvancedSearch = function () {

    $.fn.dataTable.Api.register('column().title()', function () {
        return $(this.header()).text().trim();
    });

    var initTable1 = function () {
        _columns.push({ "data": null, "defaultContent": "<button>View</button>" });
        //debugger;
        // begin first table
        //debugger;
        var table = $('#kt_table_1').DataTable({
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html

            lengthMenu: [5, 10, 25, 50, 100, 200, 500, 1000, 5000, 10000],
            pageLength: $("#RecordsPerPage").val(),
            order: [0, "desc"],
            //page: page.info().page,
            searchDelay: 500,
            processing: true,
            serverSide: true,
            language: {
                'lengthMenu': 'Display _MENU_',
                "processing": "processing... please wait"
            },
            fixedHeader: true,
            ajax: {
                url: '/Dynamic/DataTableListing',
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    FieldNames: $("#GridColumns").val(), TableName: $("#SearchTableName").val(), Condition: $("#Condition").val()
                    //columnsDef: [
                    //    'Firstname', 'Lastname', 'Position', 'Office', 'Startdate', 'Salary'],
                },
                //success: function (data) { console.log(data); },
                beforeSend: function (jqXHR, settings) {
                    //beforeSearch();
                    console.log("settings: " + settings);
                }
                //dataFilter: function (data) {
                //    debugger;
                //    var json = jQuery.parseJSON(data);
                //    console.log(json.draw);
                //    //json.recordsTotal = json.total;
                //    //json.recordsFiltered = json.total;
                //    //json.data = json.list;

                //    return JSON.stringify(json); // return JSON string
                //}
            },
            columns: _columns,

            initComplete: function () {
            },

            "createdRow": function (row, data, index) {
                $.each(data, function (key, val) {
                    console.log("key : " + key + " ; value : " + val);
                    if (val != null && val.toLowerCase() == 'true') {
                        debugger;
                        val = "yes";
                    }
                    else if (val != null && val.toLowerCase() == 'false') {
                        debugger;
                        val = "no";
                    }
                    $(row).attr("data_" + key, val);
                });
                console.log("row: " + row + ".... data: " + data);
            },
            columnDefs: [
                {
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var _html = "";
                        if ($("#AllowEdit").val().toLowerCase() == "true") {
                            _html = '<a href="javascript:;" class="btn btn-sm btn-clean btn-icon" title="view or edit details"><i class="__edit flaticon-eye"></i></a>';
                        }
                        if ($("#AllowDelete").val().toLowerCase() == "true") {
                            _html += '<a href="javascript:;" class="btn btn-sm btn-clean btn-icon remove-data-row" title="Delete" data-toggle="modal" data-target="#RemoveRecordModal"><i class="la la-trash"></i></a>';
                        }
                        return _html;
                        //                 <div class="dropdown dropdown-inline">\
                        //	<a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
                        //                          <i class="la la-cog"></i>\
                        //                      </a>\
                        //  	<div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                        //		<ul class="nav nav-hoverable flex-column">\
                        //    		<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-edit"></i><span class="nav-text">Edit Details</span></a></li>\
                        //    		<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-leaf"></i><span class="nav-text">Update Status</span></a></li>\
                        //    		<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-print"></i><span class="nav-text">Print</span></a></li>\
                        //		</ul>\
                        //  	</div>\
                        //</div>\

                    },
                }
            ],
            "fnDrawCallback": function (oSettings) {
                //Make your callback here.
                //debugger;
                EditTableRecords();
                DeleteRowData();
                pageLoaded();
            }
        });

        var filter = function () {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };

        var asdasd = function (value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };

        $('#kt_search').on('click', function (e) {
            e.preventDefault();
            var condition = [];
            $('.datatable-input').each(function () {
                if ($(this).val() != "") {
                    if ($(this).attr("name") == "SearchTerm") {
                        table.column(0).search($(this).val(), false, false);
                    }
                    else if ($(this).attr("sdate") != undefined && $(this).attr("edate") != undefined && $(this).attr("sdate").length > 0 && $(this).attr("edate").length > 0) {
                        beforeSearch();
                        condition.push($("#Condition").val())
                    }
                    else {
                        // t. is the table allias.
                        condition.push("t." + $(this).attr("name") + "=" + $(this).val())
                        console.log(condition);
                    }
                }
            });
            var str_condition = condition.join(" AND ");
            console.log(str_condition);
            table.column(1).search(str_condition, false, false);
            table.table().draw();
        });

        $('#kt_reset').on('click', function (e) {
            e.preventDefault();
            $('.datatable-input').each(function () {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });

        $('#kt_datepicker').datepicker({
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        });
    };

    return {

        //main function to initiate the module
        init: function () {
            initTable1();
        },

    };

}();

jQuery(document).ready(function () {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});

function EditTableRecords() {
    $(".__edit").parent("a").each(function () {
        //debugger;
        var id = $(this).parents("tr[id*=row]").attr("id").replace("row_", "");
        if ($("#HrefUrl").val() != "" && $("#PrimaryKey").val() != "") {
            $(this).attr("href", $("#HrefUrl").val() + "?" + $("#PrimaryKey").val() + "=" + id);
            if ($("#TargetBlank").val() != "" && $("#TargetBlank").val() != undefined && $("#TargetBlank").val().toLowerCase() == "true") {
                $(this).attr("target", "_blank");
            }
        }
        else {
            $(this).click(function () {
                addEditForm($("#_TableName").val(), id);
                $("#IsNew").val("false");
                return false;
            });
        }
    });
    var table = $("#kt_table_1").DataTable();
    $('table tbody').on('click', 'tr', function () {
        if ($(this).parent("tbody").find(".child").length > 0) {
            var $child_a = $(this).closest('tr').next('tr.child').find("a");
            var id = $(this).attr("id").replace("row_", "");
            if ($("#HrefUrl").val() != "" && $("#PrimaryKey").val() != "") {
                $child_a.attr("href", $("#HrefUrl").val() + "?" + $("#PrimaryKey").val() + "=" + id);
                if ($("#TargetBlank").val() != "" && $("#TargetBlank").val() != undefined && $("#TargetBlank").val().toLowerCase() == "true") {
                    $child_a.attr("target", "_blank");
                }
            }
            else {
                $child_a.click(function () {
                    addEditForm($("#_TableName").val(), id);
                    $("#IsNew").val("false");
                    return false;
                });
            }
            
        }
    }); 
    //table.draw();
    //$('table tbody').on('click', 'tr', function (e) {
    //    if ($(this).parent("tbody").find(".child").length > 0) {
    //        $(".la-edit").parent("a").each(function () {
    //            debugger;
    //            var $a = $(this);
    //            var id = $a.parents("tr[id*=row]").attr("id").replace("row_", "");
    //            if ($("#HrefUrl").val() != "" && $("#PrimaryKey").val() != "") {
    //                $a.attr("href", $("#HrefUrl").val() + "?" + $("#PrimaryKey").val() + "=" + id);
    //                if ($("#TargetBlank").val() != "" && $("#TargetBlank").val() != undefined && $("#TargetBlank").val().toLowerCase() == "true") {
    //                    $a.attr("target", "_blank");
    //                }
    //            }
    //            else {
    //                $a.click(function () {
    //                    addEditForm($("#_TableName").val(), id);
    //                    $("#IsNew").val("false");
    //                    return false;
    //                });
    //            }
    //        });
    //        e.stopPropagation();
    //    }
    //});
};
function DeleteRowData() {
    console.log("table row :: delete click function called..");
    if ($("#kt_table_1 tbody [role='row']").length > 0) {
        $("#kt_table_1 tbody [role='row']").each(function () {
            var $row = $(this);
            $row.children().find(".remove-data-row").click(function () {
                //debugger;
                $("#btnDelete").click(function (event) {
                    //debugger;
                    var table_name = $("#kt_table_1").attr("rel-table-name");
                    var field_name = $("#kt_table_1").attr("rel-field-name");
                    var id = $row.attr("id").replace("row_", "");
                    if (table_name != "" && field_name != "" && $row.attr("id").length > 0 && id != "") {
                        RemoveRecord(table_name, field_name, id, true);    // if removeRecordFromGrid then true else false(Add/Edit Form Delete popup)            
                    }
                    else {
                        console.log("table_name: " + table_name + ", field_name: " + field_name + ", id: " + id);
                        ShowSwalMessage("Sorry, looks like table_name, field_name or id is missing, please check the console or contact your administrator.", "error");
                    }
                });
            });
        });
    }
}
function RemoveRecord(table_name, field_name, primary_id, removeRecordFromGrid) {
    console.log(table_name + ", " + field_name + ", " + primary_id);
    $("#btnDelete").text("Removing");
    $("#btnDelete").addClass("spinner spinner-white spinner-right");
    var jqxhr = $.ajax({
        type: "Get",
        url: "/Dynamic/DeleteRecord?tableName=" + table_name + "&fieldName=" + field_name + "&id=" + primary_id,
        async: false
    })
        .done(function (data) {
            //debugger;
            console.log(data);
            if (data.Success == true) {
                if (!removeRecordFromGrid) {
                    if ($("#ShowAddNewButton").val() == 'true') {
                        $(".add_edit_container").slideUp(400);
                        $("#btnNew").slideDown(500);
                    } else {
                        $(".add_edit_container").slideUp(400);
                    }
                    //debugger;
                    if ($("#IsNew").val() == "true") {
                        mannualAfterSave();
                    } else {
                        mannualafterUpdate();
                    }
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow");
                }
                var table = $("#kt_table_1").dataTable();
                table.api().ajax.reload();
                $('#RemoveRecordModal').modal('toggle');
                $("#btnDelete").text("Remove");
                $("#btnDelete").removeClass("spinner spinner-white spinner-right");
                $("#btnDelete").unbind();
                //ShowAlert("success", "Success: " + data.Message);
                ShowToastr("success", "Success", data.Message);
                return false;
            }
            else {
                $('#RemoveRecordModal').modal('toggle');
                $("#btnDelete").text("Remove");
                $("#btnDelete").removeClass("spinner spinner-white spinner-right");
                ShowSwalMessage(data.Message, "error");
                //ShowAlert("danger", "Error: " + data.Message);
                ShowToastr("error", "Error", data.Message);
            }
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            ShowSwalMessage(errorThrown, "error");
            //ShowAlert("danger", "Error: " + errorThrown);
            ShowToastr("error", "Error", errorThrown);
        })
        .always(function () {
            return false;
        });
}
function pageLoaded() { };

function ShowSwalMessage(message, icon_type) {
    Swal.fire({
        text: message,
        icon: icon_type,
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
            confirmButton: "btn font-weight-bold btn-light"
        }
    }).then(function () {
        KTUtil.scrollTop();
    });
}

function ShowAlert(alert_type, text) {
    //debugger;
    var css = "";
    if (alert_type == "success") {
        css = "alert alert-success";
    }
    else if (alert_type == "primary") {
        css = "alert alert-primary";
    }
    else if (alert_type == "secondary") {
        css = "alert alert-secondary";
    }
    else if (alert_type == "danger") {
        css = "alert alert-danger";
    }
    else if (alert_type == "warning") {
        css = "alert alert-warning";
    }
    else if (alert_type == "info") {
        css = "alert alert-info";
    }
    else {
        css = "alert alert-dark";
    }
    $("#dvAlert").html("<div class='" + css + "' role='alert'>" + text + "</div>");
    setTimeout(function () { $("#dvAlert").html(""); }, 10000);
}

function ShowToastr(alert_type, title, message) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "5000",
        "timeOut": "8000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    if (alert_type == "success") {
        toastr.success(message, title);
    }
    else if (alert_type == "info") {
        toastr.info(message, title);
    }
    else if (alert_type == "warning") {
        toastr.warning(message, title);
    }
    else {
        toastr.error(message, title);
    }
}
