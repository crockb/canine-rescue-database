*************************************************************************
How to Initially Get Set-Up With Node.Js
   - sign in to osu engineering server, navigate to class folder
   - command: mkdir canine-rescue
   - command: cd canine-rescue
   - command: git clone https://github.com/crockb/canine-rescue-database ./
   - enter username, password
   - command: mkdir node_modules
   - command: mv node_modules.zip node_modules
   - command: cd node_modules
   - command: unzip node_modules.zip
   - command: rm node_modules.zip

How to Run the Canine Database Application
   - VPN into sds.oregonstate.edu with Cisco
   - sign into osu server and navigate to cs361/canine-rescue directory
   - commmand: node main.js [port]
   - in browser type:  [hostname]:[port]/canine-database/home


How to Access PHP MyAdmin Database Web Interface:
  - VPN into sds.oregonstate.edu with Cisco
  - https://tools.engr.oregonstate.edu/phpMyAdmin/index.php
  - username: cs361_crockb
  - password: (sent via slack channel)
  - server choice: classmysql

Additional Information About Folders and Files:
  - main.js - primary server program
  - canine-rescue.js - primary source for functions and routes
  - /public - styles.css, also will include jQuery for update/delete functions needed (see archive)
  - /views - templates
  - /node_modules - contains the 6000+ files for Node.Js (DON'T MODIFY OR UPLOAD TO GITHUB)
  - /archive - not-in-use, past examples from CS 340 for reference

Author:  Bryant Crock (5/18/2019)
**************************************************************************
