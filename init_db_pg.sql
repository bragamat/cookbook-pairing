DROP DATABASE IF EXISTS cookbook_js_dev;
DROP DATABASE IF EXISTS cookbook_js_test;

CREATE DATABASE cookbook_js_dev;
CREATE DATABASE cookbook_js_test;


CREATE TABLE users (
  id int  NOT NULL,
  name char(128) NOT NULL,
  CONSTRAINT users_pk PRIMARY KEY  (id)
);
