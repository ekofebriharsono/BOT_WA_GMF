axios
            .get('http://localhost/rest_api_testing/json_object.php')
            .then(res => {
                console.log(res.data.nama);
            })
            .catch(error => {
                console.error(error);
            });