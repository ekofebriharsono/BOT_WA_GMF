server.route({
    method: 'GET',
    path: '/teams/{id}',
    handler: function (request, reply) {
        const teamID = encodeURIComponent(request.params.id);

        Request.get(`http://api.football-data.org/v1/teams/${teamID}`, function (error, response, body) {
            if (error) {
                throw error;
            }

            const result = JSON.parse(body);

            Request.get(`http://api.football-data.org/v1/teams/${teamID}/fixtures`, function (error, response, body) {
                if (error) {
                    throw error;
                }

                const fixtures = LodashTake(LodashFilter(JSON.parse(body).fixtures, function (match) {
                    return match.status === 'SCHEDULED';
                }), 5);

                reply.view('team', { result: result, fixtures: fixtures });
            });
        });
    }
});