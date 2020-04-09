function clearForm() {
  function clearForm() {
    $('#taskName').val('');
    $('#startDate').val('');
    $('#endDate').val('');
    $('#taskDescription').val('');
  }
}

function createNewTask() {
  var newTask = {
    __metadata: {
      'type': 'SP.Data.March2020TasksListItem' // it defines the ListItemEntityTypeFullName  
    },
    Title: $('#taskName').val(),
    StartDate: $('#startDate').val(),
    DueDate: $('#endDate').val(),
    Body: $('#taskDescription').val(),
  };

  createItem('March2020Tasks', newTask).then(function (response) {
    console.log('Successfully created item', response);

  }, errorFunction);

}

function editTask(taskID) {
  var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('March2020Tasks')/items(" + taskID + ")";
  getItems(url).then(function (response) {
    console.log('Task to edit ', response);
    var item = response.d;
    $('#taskName').val(d.Title);
    $('#startDate').val(d.StartDate);
    $('#endDate').val(d.DueDate);
    $('#taskDescription').val(d.Body);

  }, errorFunction);


  // var newTask = {
  //   __metadata: {
  //     'type': 'SP.Data.March2020TasksListItem' // it defines the ListItemEntityTypeFullName  
  //   },
  //   Title: $('#taskName').val(),
  //   StartDate: $('#startDate').val(),
  //   DueDate: $('#endDate').val(),
  //   Body: $('#taskDescription').val(),
  // };

}

function errorFunction(error) {
  console.log('Oops Error Occured', error);
}

$(document).ready(function () {
  $('#buttonSubmit').click(createNewTask);

  var itemID = getUrlParameter('itemID');
  if (itemID != '' || itemID != undefined) {
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('March2020Tasks')/items(" + taskID + ")";
    getItems(url).then(function (response) {
      console.log('Task to edit ', response);
      var item = response.d;
      $('#taskName').val(d.Title);
      $('#startDate').val(d.StartDate);
      $('#endDate').val(d.DueDate);
      $('#taskDescription').val(d.Body);

    }, errorFunction);
  }


});//end of document ready