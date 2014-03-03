/*
 * GET list of folders.
 */

exports.list = function(req, res){
  var type = req.params.type || 'campaign';
  mc.folders.list({type:type}, function(data) {
    res.render('folders/index', { title: 'Your MailChimp ' + type + ' folders', type: type, folders: data });
  }, function(err) {
    res.render('error', { title: 'Unable to retrieve ' + type + ' folders', error: err });
  });
};
