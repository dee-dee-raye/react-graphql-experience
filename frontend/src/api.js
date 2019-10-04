const fetchGeneral = async (requestBody) => {
    return fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        return resData
      })
      .catch(err => {
        console.log(err);
      });
  };

const fetchGeneralAuthorized = async (requestBody, token) => {
    return fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        return resData
      })
      .catch(err => {
        console.log(err);
      });
  };

const fetchImageUpload = async (fd) => {
    return fetch('temp', {
        method: 'POST',
        body: fd,
        headers: {
        }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            return resData
        })
        .catch(err => {
            console.log(err);
        });
};

exports.fetchGeneral = fetchGeneral;
exports.fetchGeneralAuthorized = fetchGeneralAuthorized;
exports.fetchImageUpload = fetchImageUpload;