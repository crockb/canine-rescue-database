*************************************************************************
How to Access PHP MyAdmin Database Web Interface:
	- https://tools.engr.oregonstate.edu/phpMyAdmin/index.php
	- username: cs361_crockb
	- password: 6754
	- server choice: classmysql

How to Install/Configure Node.Js
   - create a new directory within the osu engineering server
   - type the command: git clone https://github.com/wolfordj/CS290-Server-Side-Examples.git ./
   - go to /diagnostic directory
   - type the command: npm install
   - type the command: mv dbcon.js.template dbcon.js
   - open dbcon.js file
   - input DB credentials
        host            : 'classmysql.engr.oregonstate.edu',
  		user            : 'cs361_crockb',
  		password        : '6754',
  		database        : 'cs361_crockb'
   - 
-- type the command: make
-- type the command: chmod +x chatserve
-- type the command: ./chatserve <portnum>
   -- (try different port numbers until you find one that is available - 0 to 65535)
-- upon successful server startup, the following server information will appear:
   -- The server is running
   -- Hostname = <hostname>
   -- Port = <portnum>
-- type the server-provided values into a new command line window: ./chatclient <hostname> <portnum>
-- initiate a message from chatclient to begin the interraction with chatserve
-- type the command:  \quit
-- --- from chatclient this will shutdown chatclient, chatclient will wait for a new connection
-- --- from chatserve this will shutdown both chatserve and chatserve
Author:  Bryant Crock (2/3/2019)
**************************************************************************