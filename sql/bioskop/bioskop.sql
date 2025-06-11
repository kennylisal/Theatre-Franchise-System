
CREATE TABLE theatres(
    theatre_id VARCHAR(50),
    theatre_name VARCHAR(65) NOT NULL,
    theatre_location VARCHAR(70) NOT NULL,
    active_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (theatre_id)
);
INSERT INTO theatres (theatre_id, theatre_name, theatre_location) VALUES ('THTR001', 'TSM Xxi', 'metro tanjung bunga. ST');

CREATE TABLE employee_role(
    role_id VARCHAR(50) NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    PRIMARY KEY(role_id)
);
INSERT INTO employee_role (role_id,role_name) VALUES ('ER001','ADMIN FRANCHISEE'),('ER002', 'PEGAWAI FRANCHISEE');

CREATE TYPE employee_status as ENUM ('active','banned','inactive');

CREATE TABLE employees(
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    account_password VARCHAR(100) NOT NULL,
    employee_role VARCHAR(50) NOT NULL,
    account_status employee_status NOT NULL,
    theatre_location VARCHAR(50),
    PRIMARY KEY (employee_id),
    CONSTRAINT fk_employee_role FOREIGN KEY(employee_role) REFERENCES employee_role(role_id),
    CONSTRAINT fk_theatre_loc FOREIGN KEY (theatre_location) REFERENCES theatres(theatre_id)
);
alter table employees add column account_username VARCHAR(50) NOT NULL;
INSERT INTO employees (employee_id,employee_name,account_username,account_password,employee_role,account_status,theatre_location) VALUES ('lisal_admin','kenny','ADMIN TSM','password','ER001','active','xxaxx');


CREATE TABLE employee_refresh_token(
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    token VARCHAR(155) NOT NULL,
    expire_at TIMESTAMP NOT NULL,
    revoked boolean DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_refresh FOREIGN KEY(employee_id) REFERENCES employees(employee_id)
);


CREATE TABLE admin_log(
    admin_log_id VARCHAR(50),
    admin_action VARCHAR(200) NOT NULL,
    admin_id VARCHAR(50) NOT NULL,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (admin_log_id),
    CONSTRAINT fk_admin_id FOREIGN KEY (admin_id) REFERENCES employees(employee_id)
);

CREATE TABLE employee_log(
    employee_log_id VARCHAR(50),
    employee_action VARCHAR(200) NOT NULL,
    employee_id VARCHAR(50) NOT NULL,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (employee_log_id),
    CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE ticket_locket(
    locket_name VARCHAR(100),
    locket_id VARCHAR(50) NOT NULL,
    theatre_location VARCHAR(50),
    PRIMARY KEY (locket_id),
    CONSTRAINT fk_theatre_locket FOREIGN KEY (theatre_location) REFERENCES theatres(theatre_id)
);

CREATE TABLE movie_cinemas(
    cinema_id VARCHAR(50),
    cinema_name VARCHAR(50),
    theatre_location VARCHAR(50),
    seating_schema JSONB NOT NULL,
    cinema_is_active boolean,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_theatre_parent FOREIGN KEY (theatre_location) REFERENCES theatres(theatre_id),
    PRIMARY KEY(cinema_id)
);

CREATE TABLE buyed_seating(
    buyed_seating_id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(50) NOT NULL,
    movie_schedule_id VARCHAR(50) NOT NULL,
    keterangan VARCHAR(50) NOT NULL,
    CONSTRAINT FK_seat_schedule FOREIGN KEY (movie_schedule_id) REFERENCES movie_schedules(movie_schedule_id),
    CONSTRAINT FK_seat_transaction FOREIGN KEY (transaction_id) REFERENCES h_schedule_trans(transaction_id)
);
ALTER table buyed_seating add column seating_id VARCHAR(50) not null;

CREATE TABLE movies(
    movie_name VARCHAR(50) NOT NULL,
    movie_id VARCHAR(50),
    external_link VARCHAR(100),
    external_info JSONB,
    movie_is_active boolean NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    movie_image VARCHAR(100),
    movie_duration INT,
    PRIMARY KEY(movie_id)
);
ALTER TABLE movies ALTER COLUMN movie_id SET DATA TYPE VARCHAR(50);

CREATE TABLE locket_schedule(
    schedule_id VARCHAR(50) NOT NULL,
    theatre_location VARCHAR(50),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(schedule_id),
    CONSTRAINT fk_theatre_locket_schedule FOREIGN KEY (theatre_location) REFERENCES theatres(theatre_id)
);
ALTER TABLE locket_schedule ADD locket_name VARCHAR(100) NOT NULL;
ALTER TABLE locket_schedule ADD employee VARCHAR(50) NOT NULL;
ALTER TABLE locket_schedule ADD CONSTRAINT fk_employee_schedule FOREIGN KEY(employee) REFERENCES employees(employee_id);


CREATE TABLE movie_schedules(
    movie VARCHAR(50) NOT NULL,
    started_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    price INT,
    movie_schedule_id VARCHAR(50) NOT NULL,
    cinema_location VARCHAR(50),
    available_seating_schema JSONB NOT NULL,
    buyed_seating_schema JSONB,
    PRIMARY KEY(movie_schedule_id),
    CONSTRAINT fk_cinema FOREIGN KEY (cinema_location) REFERENCES movie_cinemas(cinema_id),
    CONSTRAINT fk_movie_id FOREIGN KEY (movie) REFERENCES movies(movie_id) 
);
ALTER TABLE movie_schedules ADD schedule_status BOOLEAN DEFAULT TRUE;



CREATE TYPE transaction_type as ENUM ('offline','online');

CREATE TABLE h_schedule_trans(
    transaction_id VARCHAR(50) NOT NULL,
    customer_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_payment INT,
    schedule_header_display JSONB,
    seating_buyed VARCHAR(55),
    PRIMARY KEY(transaction_id)
);

CREATE TABLE d_schedule_trans(
    transaction_id VARCHAR(50) NOT NULL,
    schedule_id  VARCHAR(50) NOT NULL,
    locket_id VARCHAR(50) NOT NULL,
    transaction_method transaction_type NOT NULL,
    PRIMARY KEY(transaction_id),
    CONSTRAINT fk_schedule_trans FOREIGN KEY (schedule_id) REFERENCES movie_schedules(movie_schedule_id),
    CONSTRAINT fk_locket_trans FOREIGN KEY (locket_id) REFERENCES ticket_locket(locket_id)
);
ALTER TABLE d_schedule_trans ADD employee INT NOT NULL;

-- bagian user
CREATE TABLE user_credentials(
    user_id VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    user_password VARCHAR(100) NOT NULL, 
    is_banned boolean DEFAULT false,
    PRIMARY KEY(user_id)
);

CREATE TABLE user_details(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    date_of_birth TIMESTAMP,
    user_image VARCHAR(100) NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES user_credentials(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_refresh_token(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    token VARCHAR(155) NOT NULL,
    expire_at TIMESTAMP NOT NULL,
    revoked boolean DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_refresh FOREIGN KEY(user_id) REFERENCES user_credentials(user_id)
);