function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getItems(url) {
  return $.ajax({
    url: url,
    method: "GET",
    headers: { "Accept": "application/json; odata=verbose" }
  });
}

function createItem(listName, data) {
  var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items";
  var jsonData = JSON.stringify(data);
  return $.ajax({
    url: url,
    method: "POST",
    headers: {
      'accept': 'application/json;odata=verbose',
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      'content-type': 'application/json;odata=verbose',
    },
    data: jsonData
  });
}

function updateItem(listName, itemId, data) {
  var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")";
  var jsonData = JSON.stringify(data);
  return $.ajax({
    url: url,
    method: "POST",
    headers: {
      'accept': 'application/json;odata=verbose',
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      'content-type': 'application/json;odata=verbose',
      "IF-MATCH": "*",
      "X-HTTP-Method": "MERGE"
    },
    data: jsonData
  });
}

function deleteItem(listName, itemId) {
  var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")";

  return $.ajax({
    url: url,
    method: "POST",
    headers: {
      'accept': 'application/json;odata=verbose',
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      'content-type': 'application/json;odata=verbose',
      "IF-MATCH": "*",
      "X-HTTP-Method": "DELETE"
    }
  });
}