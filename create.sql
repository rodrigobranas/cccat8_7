drop table if exists ccca.stock_entry;
drop table if exists ccca.order_item;
drop table if exists ccca.order;
drop table if exists ccca.coupon;
drop table if exists ccca.item;
drop table if exists ccca.zipcode;

create table ccca.item (
	id_item serial primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into ccca.item (description, price, width, height, length, weight) values ('Guitarra', 1000, 100, 30, 10, 3);
insert into ccca.item (description, price, width, height, length, weight) values ('Amplificador', 5000, 50, 50, 50, 20);
insert into ccca.item (description, price, width, height, length, weight) values ('Cabo', 30, 10, 10, 10, 1);

create table ccca.zipcode (
	code text primary key,
	street text,
	neighborhood text,
	lat numeric,
	long numeric
);

insert into ccca.zipcode (code, street, neighborhood, lat, long) values ('88015600', 'Rua Almirante Lamego', 'Centro', -27.5945, -48.5477);
insert into ccca.zipcode (code, street, neighborhood, lat, long) values ('22060030', 'Rua Aires Saldanha', 'Copacabana', -22.9129, -43.2003);

create table ccca.order (
	id_order serial primary key,
	coupon_code text,
	coupon_percentage integer,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric
);

create table ccca.order_item (
	id_order integer references ccca.order (id_order),
	id_item integer references ccca.item (id_item),
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);

create table ccca.coupon (
	code text primary key,
	percentage integer,
	expire_date timestamp
);

insert into ccca.coupon (code, percentage, expire_date) values ('VALE20', 20, '2022-12-10T10:00:00');

create table ccca.stock_entry (
	id_item integer references ccca.item (id_item),
	operation text,
	quantity integer
);

create table ccca.order_projection (
	cpf text,
	code text,
	data jsonb
);
