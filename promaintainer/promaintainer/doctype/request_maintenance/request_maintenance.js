// Copyright (c) 2024, Noble and contributors
// For license information, please see license.txt

frappe.ui.form.on("Request Maintenance", {
    refresh: function(frm) {
        if (!frm.doc.__islocal) {
            // If the document is not new, don't make any changes
            return;
        }
        if (frm.doc.__islocal) {
            // Set the current date and time in the date_requested field
            let now_date = frappe.datetime.now_date();
            let now_time = frappe.datetime.now_time();
            frm.set_value('date', now_date + ' ' + now_time);
        }

        // Set the issue_raised_by field with the username of the logged-in user
        frm.set_value('request_raised_by', frappe.session.user);
    },
});


frappe.listview_settings['Request Maintenance'] = {
    get_indicator: function (doc) {
        // Define colors based on urgency field values
        var colors = {
            Low: "blue",
            Medium: "orange",
            High: "red",
        };
        
        // Default color if urgency is not defined or doesn't match the predefined values
        var color = colors[doc.urgency] || "grey";
        
        // Return the indicator with the status label, color, and filter query
        return [__(doc.status), color, "urgency,=," + doc.urgency];
    }
 }

