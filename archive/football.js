module.exports = function(){
    var express = require('express');
    var router = express.Router();

/***************************************************************************************************
** FUNCTIONS
****************************************************************************************************/

    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT t.team_id, t.name as team_name, t.code_name, t.total_wins, t.total_losses, p.total_salary FROM team t LEFT JOIN (SELECT SUM(salary) as total_salary, team_id FROM personnel GROUP BY team_id) p ON t.team_id = p.team_id ORDER BY team_name ASC", function (error, results, fields) {
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teams = results;
            complete();
        });
    }

    function getPersonnel(res, mysql, context, complete) {
        mysql.pool.query("SELECT p.personnel_id, p.first_name, p.last_name, t.name as team_name, p.weight, p.salary, p.height, positions_tble.total_positions FROM personnel p LEFT JOIN team t on p.team_id = t.team_id LEFT JOIN (SELECT COUNT(pp.position_id) as total_positions, pp.personnel_id FROM personnel_position pp GROUP BY pp.personnel_id) positions_tble ON p.personnel_id = positions_tble.personnel_id ORDER BY p.last_name ASC", function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.personnel = results;
                complete();
            });
    }

        function getPerson(res, mysql, context, id, complete) {
            var sql = "SELECT p.personnel_id, p.first_name, p.last_name, p.team_id, t.name as team_name, p.salary, p.height, p.weight, tbl_supervisor.supervisor_first_name, tbl_supervisor.supervisor_last_name FROM personnel p LEFT JOIN team t ON p.team_id = t.team_id LEFT JOIN (SELECT p2.personnel_id, p2.first_name as supervisor_first_name, p2.last_name as supervisor_last_name, s.supervisor_id FROM personnel p2 INNER JOIN supervisor s ON s.personnel_id = p2.personnel_id) tbl_supervisor ON p.supervisor_id = tbl_supervisor.supervisor_id WHERE p.personnel_id = ?";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.person = results[0];
                complete();
            });
        }

        function getSupervisor(res, mysql, context, id, complete) {
            var sql = "SELECT s.supervisor_id, s.personnel_id, p.first_name, p.last_name, t.code_name FROM supervisor s INNER JOIN personnel p ON p.personnel_id = s.personnel_id LEFT JOIN team t on p.team_id = t.team_id WHERE s.supervisor_id = ?";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.supervisor = results[0];
                complete();
            });
        }

        function getSupervisorPersonnel(res, mysql, context, id, complete) {
            var sql = "SELECT p.personnel_id, p.first_name, p.last_name, t.code_name, p.salary, p.supervisor_id FROM personnel p INNER JOIN team t ON t.team_id = p.team_id INNER JOIN supervisor s on p.supervisor_id = s.supervisor_id WHERE s.supervisor_id = ? ORDER BY p.last_name ASC";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.team_personnel = results;
                complete();
            });
        }


        function getTeam(res, mysql, context, id, complete) {
            var sql = "SELECT t.team_id, t.name as team_name, t.code_name, t.total_wins, t.total_losses FROM team t WHERE t.team_id = ?";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.teams = results[0];
                complete();
            });
        }


        function getSupervisors(res, mysql, context, complete) {
            mysql.pool.query("SELECT s.supervisor_id, s.personnel_id, p.first_name, p.last_name, t.name as team_name, p.salary, subordinateTble.subordinates FROM supervisor s INNER JOIN personnel p ON s.personnel_id = p.personnel_id LEFT JOIN team t ON p.team_id = t.team_id LEFT JOIN (SELECT COUNT(p2.personnel_id) as subordinates, p2.supervisor_id FROM personnel p2 GROUP BY p2.supervisor_id) subordinateTble ON s.supervisor_id = subordinateTble.supervisor_id ORDER BY team_name ASC, p.last_name ASC", function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.supervisors = results;
                complete();
            });
        }

        function getNonSupervisors(res, mysql, context, complete) {
            mysql.pool.query("SELECT p.personnel_id, p.first_name, p.last_name, t.code_name FROM personnel p INNER JOIN team t ON t.team_id = p.team_id AND p.personnel_id NOT IN (SELECT s.personnel_id FROM supervisor s) ORDER BY t.code_name ASC, p.last_name ASC", function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.nonsupervisors = results;
                complete();
            });
        }

        function getPersonnelByTeam(res, mysql, context, id, complete) {
            var sql = "SELECT p.personnel_id, p.first_name, p.last_name, t.code_name FROM personnel p INNER JOIN team t ON p.team_id = t.team_id WHERE t.team_id = (SELECT p2.team_id FROM personnel p2 INNER JOIN supervisor s on p2.personnel_id = s.personnel_id WHERE s.supervisor_id = ?) ORDER BY p.last_name ASC";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.available_personnel = results;
                complete();
            });
        }

        function getPositions(res, mysql, context, complete) {
            mysql.pool.query("SELECT pos.position_id, pos.name, pos.code_name, tbl2.total_personnel FROM position_table pos LEFT JOIN (SELECT COUNT(pp.personnel_id) as total_personnel, pp.position_id FROM personnel_position pp GROUP BY pp.position_id) tbl2 ON pos.position_id = tbl2.position_id ORDER BY pos.name ASC", function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.positions = results;
                complete();
            });
        }

        function getPosition(res, mysql, context, id, complete) {
            var sql = "SELECT p.position_id, p.name, p.code_name from position_table p WHERE position_id =?";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.position = results[0];
                complete();
            });
        }

        function getAvailablePositions(res, mysql, context, id, complete) {
            var sql = "SELECT p.position_id, p.name as position_name, p.code_name from position_table p WHERE p.position_id NOT IN (SELECT pp.position_id FROM personnel_position pp WHERE pp.personnel_id = ?) ORDER BY position_name ASC";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.available_positions = results;
                complete();
            });
        }

        function getPositionsByPersonnel(res, mysql, context, id, complete) {
            var sql = "SELECT pt.position_id, pt.name as position_name, pt.code_name, pp.personnel_id from position_table pt INNER JOIN personnel_position pp ON pp.position_id = pt.position_id INNER JOIN personnel p on pp.personnel_id = p.personnel_id WHERE p.personnel_id = ?";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.positions = results;
                complete();
            });
        }


/***************************************************************************************************
** PERSONNEL - ROUTES
****************************************************************************************************/

/*RENDER THE PAGE - DISPLAY ALL PEOPLE*/

    router.get('/personnel', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletepersonnel.js"];
        var mysql = req.app.get('mysql');
        getPersonnel(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('personnel', context);
            }
        }
    });

/*UPDATE PERSONNEL -- LOAD THE PAGE */

    router.get('/personnel/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedteam.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getTeams(res, mysql, context, complete);
        getAvailablePositions(res, mysql, context, req.params.id, complete);
        getPositionsByPersonnel(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 4) {
                res.render('update-personnel', context);
            }
        }
    });

/* UPDATE PERSONNEL -- UPDATE THE PLAYER DATA */

    router.put('/personnel/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE personnel SET first_name=?, last_name=?, team_id=?, salary=?, height=?, weight=? WHERE personnel_id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.team_id, req.body.salary, req.body.height, req.body.weight, req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.end();
            }
        });
    });

    /* UPDATE PERSONNEL - ADD POSITION */
    router.post('/personnel/add-position/:personnel_id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO personnel_position (personnel_id, position_id) VALUES (?,?)";
        var inserts = [req.params.personnel_id, req.body.position_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/football/personnel/' + [req.params.personnel_id]);
            }
        });
    });

    /* UPDATE PERSONNEL - REMOVE POSITION, REDIRECT */
    router.get('/personnel/remove-position/:personnel_id/:position_id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM personnel_position WHERE personnel_id = ? AND position_id =?"
        var inserts = [req.params.personnel_id, req.params.position_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/football/personnel/' + [req.params.personnel_id]);
            };
        });
    });


/* ADD PERSONNEL */
    router.post('/personnel', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO personnel (first_name, last_name, salary, height, weight, team_id) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.salary, req.body.height, req.body.weight, req.body.team_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/football/personnel');
            }
        });
    });

/* FILTER PERSONNEL */
    router.post('/personnel/filter', function (req, res) {
        var context = {}
        context.jsscripts = ["deletepersonnel.js"];
        var mysql = req.app.get('mysql');
        var sql = "SELECT p.personnel_id, p.first_name, p.last_name, t.name as team_name, p.weight, p.salary, p.height, positions_tble.total_positions FROM personnel p LEFT JOIN team t on p.team_id = t.team_id LEFT JOIN (SELECT COUNT(pp.position_id) as total_positions, pp.personnel_id FROM personnel_position pp GROUP BY pp.personnel_id) positions_tble ON p.personnel_id = positions_tble.personnel_id WHERE p.first_name REGEXP ? AND p.last_name REGEXP ? AND p.team_id REGEXP ? AND p.salary >= ? AND p.height >= ? AND p.weight >= ? AND positions_tble.total_positions >= ? ORDER BY last_name ASC";
        if (req.body.team_id == 0) { req.body.team_id = '.*'; } else { req.body.team_id = '^' + req.body.team_id + '$'; }
        var filters = [req.body.first_name || '.*', req.body.last_name || '.*', req.body.team_id || '.*', req.body.salary || 0, req.body.height || 0, req.body.weight || 0, req.body.total_positions || 0];
        sql = mysql.pool.query(sql, filters, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                context.personnel = results;
                getTeams(res, mysql, context, complete);
                function complete() {
                    res.render('personnel', context);
                }
            }
        });
    });


/* DELETE PERSONNEL */
    router.delete('/personnel/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM personnel WHERE personnel_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    })


/***************************************************************************************************
** POSITION - ROUTES
****************************************************************************************************/
    /*RENDER THE PAGE - DISPLAY ALL POSITIONS*/

        router.get('/position', function (req, res) {
            var callbackCount = 0;
            var context = {};
            context.jsscripts = ["deleteposition.js"];
            var mysql = req.app.get('mysql');
            getPositions(res, mysql, context, complete);
            function complete() {
                callbackCount++;
                if (callbackCount >= 1) {
                    res.render('position', context);
                }
            }
        });

    /* ADD POSITION */
        router.post('/position', function (req, res) {
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO position_table (name, code_name) VALUES (?,?)";
            var inserts = [req.body.position_name, req.body.position_code_name];
            sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    res.redirect('/football/position');
                }
            });
        });

    /* DELETE POSITION */
        router.delete('/position/:id', function (req, res) {
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM position_table WHERE position_id = ?";
            var inserts = [req.params.id];
            sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.status(400);
                    res.end();
                } else {
                    res.status(202).end();
                }
            })
        })

    /* FILTER POSITION */
        router.post('/position/filter', function (req, res) {
            var context = {}
            context.jsscripts = ["deleteposition.js"];
            var mysql = req.app.get('mysql');
            var sql = "SELECT pos.position_id, pos.name, pos.code_name, tbl2.total_personnel FROM position_table pos LEFT JOIN (SELECT COUNT(pp.personnel_id) as total_personnel, pp.position_id FROM personnel_position pp GROUP BY pp.position_id) tbl2 ON pos.position_id = tbl2.position_id WHERE pos.name REGEXP ? AND pos.code_name REGEXP ? AND tbl2.total_personnel >= ? ORDER BY pos.name ASC";
            var filters = [req.body.name || '.*', req.body.code_name || '.*', req.body.total_personnel || 0];
            sql = mysql.pool.query(sql, filters, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    context.positions = results;
                    res.render('position', context);
                }
            });
        });

    /*UPDATE POSITION -- LOAD THE PAGE */
        router.get('/position/:id', function (req, res) {
            callbackCount = 0;
            var context = {};
            context.jsscripts = ["updateposition.js"];
            var mysql = req.app.get('mysql');
            getPosition(res, mysql, context, req.params.id, complete);
            function complete() {
                callbackCount++;
                if (callbackCount >= 1) {
                    res.render('update-position', context);
                }
            }
        });

    /* UPDATE POSITION -- UPDATE THE DATA */

        router.put('/position/:id', function (req, res) {
            var mysql = req.app.get('mysql');
            var sql = "UPDATE position_table SET name=?, code_name=? WHERE position_id=?";
            var inserts = [req.body.name, req.body.code_name, req.params.id];
            sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    res.status(200);
                    res.end();
                }
            });
        });



/***************************************************************************************************
** TEAM - ROUTES
****************************************************************************************************/

/* RENDER THE PAGE - DISPLAY ALL TEAMS */

router.get('/team', function(req, res){
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["deleteteam.js"];
    var mysql = req.app.get('mysql');
    getTeams(res, mysql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('team', context);
        }
    }
});


/*UPDATE TEAM -- LOAD THE PAGE */

router.get('/team/:id', function(req, res){
    callbackCount = 0;
    var context = {};
    context.jsscripts = ["updateteam.js"];
    var mysql = req.app.get('mysql');
    getTeam(res, mysql, context, req.params.id, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('update-team', context);
        }
    }
});


/* UPDATE TEAM -- UPDATE THE DATA */

router.put('/team/:id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "UPDATE team SET name=?, code_name=?, total_wins=?, total_losses=? WHERE team_id=?";
    var inserts = [req.body.team_name, req.body.code_name, req.body.total_wins, req.body.total_losses, req.params.id];
    sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.status(200);
            res.end();
        }
    });
});

/* ADD TEAM */
router.post('/team', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO team (name, code_name, total_wins, total_losses) VALUES (?,?,?,?)";
    var inserts = [req.body.name, req.body.code_name, req.body.total_wins, req.body.total_losses];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/football/team');
        }
    });
});


/* FILTER TEAM */
router.post('/team/filter', function (req, res) {
    var context = {}
    context.jsscripts = ["deleteteam.js"];
    var mysql = req.app.get('mysql');
    var sql = "SELECT t.team_id, t.name as team_name, t.code_name, t.total_wins, t.total_losses, p.total_salary FROM team t LEFT JOIN (SELECT SUM(salary) as total_salary, team_id FROM personnel GROUP BY team_id) p ON t.team_id = p.team_id WHERE t.name REGEXP ? AND code_name REGEXP ? AND total_wins >= ? AND total_losses >= ? AND total_salary >= ? ORDER BY team_name ASC";
    var filters = [req.body.team_name || '.*', req.body.code_name || '.*', req.body.total_wins || 0, req.body.total_losses || 0, req.body.total_salary || 0];
    sql = mysql.pool.query(sql, filters, function (error, results, fields) {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        } else {
            context.teams = results;
            res.render('team', context);
            }
    });
});


/* DELETE TEAM */
router.delete('/team/:id', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM team WHERE team_id = ?";
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }else{
            res.status(202).end();
        }
    })
})


/***************************************************************************************************
** SUPERVISOR - ROUTES
****************************************************************************************************/

    /*RENDER THE PAGE - DISPLAY ALL PEOPLE */

router.get('/supervisor', function (req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["deletesupervisor.js"];
    var mysql = req.app.get('mysql');
    getSupervisors(res, mysql, context, complete);
    getTeams(res, mysql, context, complete);
    getNonSupervisors(res, mysql, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('supervisor', context);
        }
    }
});

    /*UPDATE SUPERVISOR -- LOAD THE PAGE */
    router.get('/supervisor/:id', function (req, res) {
    callbackCount = 0;
    var context = {};
    context.jsscripts = ["selectedteam.js", "updatesupervisor.js"];
    var mysql = req.app.get('mysql');
    getSupervisor(res, mysql, context, req.params.id, complete);
    getSupervisorPersonnel(res, mysql, context, req.params.id, complete);
    getPersonnelByTeam(res, mysql, context, req.params.id, complete)
    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('update-supervisor', context);
        }
    }
    });

/* UPDATE SUPERVISOR - REMOVE SUBORDINATE, REDIRECT */
    router.get('/supervisor/:personnel_id/:supervisor_p_id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE personnel SET supervisor_id = NULL WHERE personnel_id = ?";
        var inserts = [req.params.personnel_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/football/supervisor/' + [req.params.supervisor_p_id]);
            };
        });
    });

 /* UPDATE PERSONNEL -- ADD AN INDIVIDUAL TO SUPERVISE */
router.post('/supervisor/add/:supervisor_id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "UPDATE personnel SET supervisor_id = ? WHERE personnel_id=?";
    var inserts = [req.params.supervisor_id, req.body.personnel_id];
    sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.redirect('/football/supervisor/' + [req.params.supervisor_id]);
               }
    });
});

/* ADD SUPERVISOR */
    router.post('/supervisor', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO supervisor (personnel_id) VALUES (?)";
    var inserts = [req.body.personnel_id];
    sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.redirect('/football/supervisor');
               }
    });
});

    /* FILTER SUPERVISOR */
router.post('/supervisor/filter', function (req, res) {
    var context = {}
    context.jsscripts = ["deletesupervisor.js"];
    var mysql = req.app.get('mysql');
    var sql = "SELECT s.supervisor_id, s.personnel_id, p.first_name, p.last_name, t.name as team_name, p.salary, subordinateTble.subordinates FROM supervisor s INNER JOIN personnel p ON s.personnel_id = p.personnel_id LEFT JOIN team t ON p.team_id = t.team_id LEFT JOIN (SELECT COUNT(p2.personnel_id) as subordinates, p2.supervisor_id FROM personnel p2 GROUP BY p2.supervisor_id) subordinateTble ON s.supervisor_id = subordinateTble.supervisor_id WHERE p.first_name REGEXP ? AND p.last_name REGEXP ? AND t.team_id REGEXP ? AND p.salary >= ? AND subordinates >= ? ORDER BY team_name ASC, p.last_name ASC";
    if (req.body.team_id == 0) { req.body.team_id = '.*'; } else { req.body.team_id = '^' + req.body.team_id + '$'; }
    var filters = [req.body.first_name || '.*', req.body.last_name || '.*', req.body.team_id || '.*', req.body.salary || 0, req.body.subordinates || 0];
    sql = mysql.pool.query(sql, filters, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            context.supervisors = results;
            getTeams(res, mysql, context, complete);
            function complete() {
                res.render('supervisor', context);
            }
        }
    });
});



    /* DELETE SUPERVISOR  */
router.delete('/supervisor/:id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM supervisor WHERE supervisor_id = ?";
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        } else {
            res.status(202).end();
        }
    })
})



return router;
}();















/* SANDBOX 

            console.log(req.body.team_name);
            console.log(req.body.code_name);
            console.log(req.body.total_wins);
            console.log(req.body.total_losses);
            console.log(req.body.stadium_id);

SELECT pos.position_id, pos.name, pos.code_name FROM position pos
ORDER BY pos.name ASC

SELECT pos.position_id, pos.name, pos.code_name, tbl2.total_personnel FROM position pos
LEFT JOIN 
	(SELECT COUNT(pp.personnel_id) as total_personnel, pp.position_id FROM personnel_position pp GROUP BY pp.position_id) tbl2
ON pos.position_id = tbl2.position_id
ORDER BY pos.name ASC

*/