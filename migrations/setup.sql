CREATE DATABASE restful_db;

CREATE USER 'merchandiser' WITH PASSWORD 'resty123';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO merchandiser
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO merchandiser;

CREATE SEQUENCE global_id_seq;

CREATE TABLE customer (
    id INTEGER NOT NULL UNIQUE DEFAULT nextval('global_id_seq'::regclass) CONSTRAINT customer_id_pk PRIMARY KEY,
    first_name CHARACTER VARYING(256) NOT NULL,
    last_name CHARACTER VARYING(256) NOT NULL,
    email CHARACTER VARYING(50) NOT NULL UNIQUE,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activebool BOOLEAN DEFAULT FALSE NOT NULL,
    phone_number CHARACTER VARYING(13) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INTEGER NOT NULL DEFAULT nextval('global_id_seq'::regclass) CONSTRAINT product_id_pk PRIMARY KEY,
    name CHARACTER VARYING(256) NOT NULL,
    description TEXT,
    price INTEGER,
);

CREATE TABLE baskets  (
    id INTEGER NOT NULL DEFAULT nextval('global_id_seq'::regclass) CONSTRAINT product_id_pk PRIMARY KEY,
    customer_id INTEGER REFERENCES customer(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    final BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE basket_items (
  basket_id INTEGER REFERENCES baskets(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL
);
