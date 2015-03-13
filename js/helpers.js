// Helpers

function matrix(m, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < m; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
}

function extend(oldObj, newObj) {
	var obj = {};
  var prop;

	// wholesale copy from existing object
	for (prop in oldObj) {
		if (oldObj.hasOwnProperty(prop)) {
			obj[prop] = oldObj[prop];
		}
	}

	// overlap props from new object
	for (prop in newObj) {
		if (newObj.hasOwnProperty(prop)) {
			obj[prop] = newObj[prop];
		}
	}

	return obj;
}
