/*
 * GET list of folders.
 */

exports.list = function(req, res){
  var type = req.params.type || 'campaign',
      msg  = req.query.msg || '';
  mc.folders.list({type:type}, function(data) {
    res.render('folders/index', {
      title: 'Your MailChimp ' + type + ' folders',
      type: type,
      folders: data,
      msg: decodeURIComponent(msg)
    });
  }, function(err) {
    res.render('error', { title: 'Unable to retrieve ' + type + ' folders', error: err });
  });
};

exports.add = function(req, res){
  var type = req.query.type,
      name = req.query.name;
  mc.folders.add({type:type, name:name}, function(data) {
    console.log(data);
    // update succeeded - re-generate the list of folders of the specified type
    res.redirect('/folders/'+type+'?msg='+encodeURIComponent("Folder "+name+" has been added."));
  }, function(err) {
    res.render('error', { title: 'Unable to add folder ' + name, error: err });
  });
};

exports.rename = function(req, res){
  var id   = req.params.id,
      type = req.query.type || 'campaign',
      name = req.query.name;
  mc.folders.update({fid:id, type:type, name:name}, function(data) {
    // update succeeded - re-generate the list of folders of the specified type
    res.redirect('/folders/'+type+'?msg='+encodeURIComponent("Folder has been renamed."));
  }, function(err) {
    res.render('error', { title: 'Unable to update folder ' + id, error: err });
  });
};

exports.delete = function(req, res){
  var id   = req.params.id,
      type = req.query.type;
  mc.folders.del({fid:id, type:type}, function(data) {
    console.log(data);
    // update succeeded - re-generate the list of folders of the specified type
    res.redirect('/folders/'+type+'?msg='+encodeURIComponent("Folder has been deleted."));
  }, function(err) {
    res.render('error', { title: 'Unable to update folder ' + id, error: err });
  });
};
