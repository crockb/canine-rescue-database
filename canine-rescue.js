/******************************************************************************
* NAME:  
*     canine-rescue.js
* DESCRIPTION:
*     This is the primary file for the Canine Rescue node.js application that specifies
*     functions and routes within the application.
* AUTHOR / DATE
*     Bryant Crock / 5-18-19
* REFERENCES
*     CS 340 Final Project
*******************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();



/***************************************************************************************************
** FUNCTIONS
****************************************************************************************************/

    function getShelters(res, mysql, context, complete){
        mysql.pool.query("SELECT shelter_id, name, address, policy, max_capacity, total_dogs FROM shelter INNER JOIN (SELECT shelter_id as s_id, COUNT(dog_id) as total_dogs FROM dog_locations WHERE discharge_date IS NULL GROUP BY shelter_id) dl ON shelter_id = dl.s_id ORDER BY name ASC", function (error, results, fields) {
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.shelters = results;
            complete();
        });
    }

    function getRescueGroups(res, mysql, context, complete){
        mysql.pool.query("SELECT rescue_group_id, name, address, phone_number, total_dogs FROM rescue_group INNER JOIN (SELECT rescue_group_id as rg_id, COUNT(dog_id) as total_dogs FROM dog_locations WHERE discharge_date IS NULL GROUP BY rescue_group_id) dl ON rescue_group_id = dl.rg_id ORDER BY name ASC", function (error, results, fields) {
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rescue_groups = results;
            complete();
        });
    }

    function getEvents(res, mysql, context, complete){
        mysql.pool.query("SELECT event_id, name, address, date_time, description, total_dogs FROM event INNER JOIN (SELECT event_id as e_id, COUNT(dog_id) as total_dogs FROM dogs_at_events GROUP BY event_id) dae ON event_id = dae.e_id ORDER BY date_time ASC", function (error, results, fields) {
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.events = results;
            complete();
        });
    }


    function getDogsByShelterId(res, mysql, context, id, complete) {
    var sql = "SELECT tbl3.name as shelter_name, tbl1.dog_id as dog_id, tbl2.name, birthday, sex, breed, weight, status FROM (SELECT dog_id, shelter_id FROM dog_locations WHERE shelter_id = ? AND discharge_date IS NULL) tbl1 INNER JOIN (SELECT dog_id, name, birthday, sex, breed, weight, status FROM dog) tbl2 ON tbl1.dog_id = tbl2.dog_id INNER JOIN (SELECT shelter_id, name FROM shelter) tbl3 ON tbl1.shelter_id = tbl3.shelter_id";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
            }
                context.dogs = results;
                complete();
        });
    }


    function getDogsByRescueGroupId(res, mysql, context, id, complete) {
    var sql = "SELECT tbl3.name as rescue_group_name, tbl1.dog_id as dog_id, tbl2.name, birthday, sex, breed, weight, status FROM (SELECT dog_id, rescue_group_id FROM dog_locations WHERE rescue_group_id = ? AND discharge_date IS NULL) tbl1 INNER JOIN (SELECT dog_id, name, birthday, sex, breed, weight, status FROM dog) tbl2 ON tbl1.dog_id = tbl2.dog_id INNER JOIN (SELECT rescue_group_id, name FROM rescue_group) tbl3 ON tbl1.rescue_group_id = tbl3.rescue_group_id";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
            }
                context.dogs = results;
                complete();
        });
    }

    function getDogsByEventId(res, mysql, context, id, complete) {
    var sql = "SELECT tbl3.name as event_name, tbl1.dog_id as dog_id, tbl2.name, birthday, sex, breed, weight, status FROM (SELECT dog_id, event_id FROM dogs_at_events WHERE event_id = ?) tbl1 INNER JOIN (SELECT dog_id, name, birthday, sex, breed, weight, status FROM dog) tbl2 ON tbl1.dog_id = tbl2.dog_id INNER JOIN (SELECT event_id, name FROM event) tbl3 ON tbl1.event_id = tbl3.event_id";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
            }
                context.dogs = results;
                complete();
        });
    }
	
	function getDogById(res, mysql, context, id, complete) {
		var sql = "SELECT dog.dog_id as dog_id, dog.name as name, birthday, sex, breed, weight, status, shelter_id, shelter_name, rg_id, rg_name, admission_date, discharge_date FROM dog INNER JOIN (SELECT dog_id, shelter_id, shelter_name, rg_id, rescue_group.name as rg_name, admission_date, discharge_date FROM (SELECT dog_locations.dog_id, dog_locations.shelter_id as shelter_id, dog_locations.rescue_group_id as rg_id, shelter.name as shelter_name, dog_locations.admission_date, dog_locations.discharge_date FROM dog_locations LEFT JOIN shelter ON dog_locations.shelter_id = shelter.shelter_id) tbl1 LEFT JOIN rescue_group ON rg_id = rescue_group.rescue_group_id) locations ON dog.dog_id = locations.dog_id WHERE dog.dog_id = ?";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
				}
					context.dogs = results;
					complete();
			});
	}

    function getTransport(res, mysql, context, id, complete) {
        var sql = "SELECT t.transport_id, t.shelter_id, s.name AS shelter_name, t.rescue_group_id, rg.name AS rescue_group_name, t.foster_home_id, fh.address AS foster_home_address, t.dog_id, d.name AS dog_name, DATE_FORMAT(t.date_time, '%Y-%m-%d') AS t_date, DATE_FORMAT(t.date_time, '%T') AS t_time, t.capacity, t.instructions, DATE_FORMAT(t.request_sent_date, '%m/%d/%Y') AS request_sent_date, DATE_FORMAT(t.acceptance_date, '%m/%d/%Y') AS acceptance_date, t.status, t.vehicle, t.license_plate \
                    FROM transport t \
                    INNER JOIN shelter s ON s.shelter_id = t.shelter_id \
                    INNER JOIN rescue_group rg ON rg.rescue_group_id = t.rescue_group_id \
                    INNER JOIN foster_home fh ON fh.foster_home_id = t.foster_home_id \
                    INNER JOIN dog d ON d.dog_id = t.dog_id \
                    WHERE t.transport_id = ?"
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.transport = results;
            complete();
        });
    }

	function getFavorites(res, mysql, context, id, complete) {
    var sql = "SELECT tbl1.dog_id as dog_id, tbl2.name, birthday, sex, breed, weight, status FROM (SELECT dog_id FROM favorites WHERE 1) tbl1 INNER JOIN (SELECT dog_id, name, birthday, sex, breed, weight, status FROM dog) tbl2 ON tbl1.dog_id = tbl2.dog_id";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
            }
                context.dogs = results;
                complete();
        });
    }


/***************************************************************************************************
** ROUTES
****************************************************************************************************/

// HOME PAGE

    router.get('/home', function (req, res) {
        res.render('home');
    });


// LISTS PAGE (SHELTERS, RESCUE GROUPS, EVENTS)

    router.get('/lists', function (req, res) {
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deletepersonnel.js"];
        var mysql = req.app.get('mysql');
        getShelters(res, mysql, context, complete);
        getRescueGroups(res, mysql, context, complete);
        getEvents(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('lists', context);
            }
        }
    });


// DOGS BY SHELTER

    router.get('/shelter/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        //context.jsscripts = ["selectedteam.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getDogsByShelterId(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('dogs-by-shelter', context);
            }
        }
    });

// DOGS BY RESCUE GROUP

    router.get('/rescue-group/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        //context.jsscripts = ["selectedteam.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getDogsByRescueGroupId(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('dogs-by-rescue-group', context);
            }
        }
    });


// DOGS BY EVENT

    router.get('/event/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        //context.jsscripts = ["selectedteam.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getDogsByEventId(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('dogs-by-event', context);
            }
        }
    });


// DOGS DETAIL
    router.get('/dog/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
		context.owner = false;
        var mysql = req.app.get('mysql');
        getDogById(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('dog-by-id', context);
            }
        }
    });
	
	router.get('/dog/owner/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
		context.owner = true;
        var mysql = req.app.get('mysql');
        getDogById(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('dog-by-id', context);
            }
        }
    });

// TRANSPORTATION CONFIRMATION
    router.get('/confirm/:id', function(req, res) {
        callBackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getTransport(res, mysql, context, req.params.id, complete);
        function complete() {
            callBackCount++;
            if (callBackCount >= 1) {
                res.render('confirm', context);
            }
        }
    });

    router.put('/confirm/:id', function(req, res) {
        var mysql = req.app.get('mysql')
        var sql = "UPDATE transport SET date_time=?, capacity=?, acceptance_date=?, status=? WHERE transport_id=?";
        var inserts = [req.body.date_time, req.body.capacity, req.body.acceptance_date, req.body.status, req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            else {
                res.status(200);
                res.end();
            }
        });
    });


// FAVORITES
	router.get('/favorites', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFavorite.js"];
        var mysql = req.app.get('mysql');
        getFavorites(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('favorites', context);
            }
        }
    });

router.post('/favorites/:dog_id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = 'INSERT INTO favorites (dog_id) VALUES (?)';
        var inserts = [req.params.dog_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/canine-rescue/favorites');
            }
        });
    });

    router.delete('/favorites/:dog_id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = 'DELETE FROM favorites WHERE dog_id = ?';
        var inserts = [req.params.dog_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(202).end();
            }
        });
    });

return router;
}();