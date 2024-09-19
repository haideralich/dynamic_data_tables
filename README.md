# dynamic_data_tables

# Overview

This code initializes and manages a DataTable on a webpage using jQuery and DataTables library. It provides features for searching, filtering, editing, and deleting rows in the table. The script is structured to handle dynamic content, manage user interactions, and communicate with the backend server.

## Key Components

### DataTable Initialization
- **Table Setup**: The DataTable (`#kt_table_1`) is initialized with settings like responsive design, pagination, search delay, server-side processing, and custom language options.
- **AJAX Configuration**: Fetches data from `/Dynamic/DataTableListing` using a POST request, with dynamic parameters based on user input.

### Column Definitions
- **Columns**: Columns are defined, including a custom column with "View" buttons and action buttons for editing and deleting rows.

### Search and Filter Functions
- **Filter**: Adds search and filter capabilities to the table based on user input.
- **Search Button**: Searches the table based on form inputs and custom conditions.

### Row Handling
- **Row Creation**: Modifies rows by adding attributes based on cell values.
- **Edit and Delete Actions**: Manages edit and delete buttons, including setting URLs or event handlers for these actions.

### Events and Handlers
- **Edit Records**: Adds edit functionality to rows, either by updating a form or linking to an external URL.
- **Delete Records**: Handles row deletions with a confirmation modal and AJAX requests to remove records from the server.

### Utility Functions
- **ShowSwalMessage**: Displays messages using SweetAlert.
- **ShowAlert**: Displays alerts in a designated alert area.
- **ShowToastr**: Shows toast notifications with different styles based on the alert type.

### Datepicker
- **Datepicker Initialization**: Adds a datepicker for date inputs, enhancing user experience.

## Usage
- **Initialization**: The `init` function is called when the document is ready to set up the DataTable.
- **Dynamic Actions**: Edit and delete actions are dynamically attached to rows and buttons.

## Notes
- **Error Handling**: Includes logging and error handling for AJAX requests.
- **Custom Functions**: Defines custom functions like `EditTableRecords` and `DeleteRowData` to manage table interactions and data updates.

This script is a comprehensive solution for handling dynamic data in tables, integrating user interactions with server-side operations, and providing a rich UI experience with functionalities like searching, editing, and deleting records.
